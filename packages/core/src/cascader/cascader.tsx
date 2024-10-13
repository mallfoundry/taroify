import { useUncontrolled, useCascader } from "@taroify/hooks"
import { View, ScrollView } from "@tarojs/components"
import { nextTick } from "@tarojs/taro"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import {
  Children,
  isValidElement,
  ReactElement,
  ReactNode,
  useReducer,
  useMemo,
  useState,
} from "react"
import { prefixClassname } from "../styles"
import Tabs from "../tabs"
import { useMemoizedFn } from "../hooks"
import CascaderHeader from "./cascader-header"
import CascaderOption from "./cascader-option"
import CascaderOptionBase from "./cascader-option-base"
import CascaderTab from "./cascader-tab"
import {
  CascaderOptionObject,
  CascaderEventOption,
  CascaderTabObject,
  isActiveOption,
  CascaderDataOption,
  CascaderFieldNames,
} from "./cascader.shared"

function getCascaderOptions(children: ReactNode, tabIndex: number): CascaderOptionObject[] {
  const options: CascaderOptionObject[] = []
  Children.forEach(children, (child: ReactNode) => {
    if (isValidElement(child)) {
      const element = child as ReactElement
      const { key, props, type } = element
      const { value, ...restProps } = props
      if (type === CascaderOption) {
        const index = _.size(options)
        options.push({
          key: key ?? index,
          tabIndex,
          value: value ?? index,
          ...restProps,
        })
      }
    }
  })

  return options
}

interface CascaderChildren {
  header?: ReactNode
  tabs: CascaderTabObject[]
}

function useCascaderChildren(children?: ReactNode): CascaderChildren {
  return useMemo(() => {
    const __children__: CascaderChildren = {
      header: undefined,
      tabs: [],
    }

    Children.forEach(children, (child: ReactNode) => {
      if (isValidElement(child)) {
        const element = child as ReactElement
        const { props, type } = element
        if (type === CascaderHeader) {
          __children__.header = element
        } else if (type === CascaderTab) {
          const { children } = props
          __children__.tabs.push({
            options: getCascaderOptions(children, _.size(__children__.tabs)),
          })
        }
      }
    })

    return __children__
  }, [children])
}

export interface CascaderProps {
  className?: string
  defaultValue?: string[]
  value?: string[]
  title?: ReactNode
  swipeable?: boolean
  animated?: boolean
  placeholder?: ReactNode
  loadData?(values: string[], options: CascaderEventOption[]): Promise<any[]>
  fieldNames?: CascaderFieldNames
  children?: ReactNode
  options?: CascaderDataOption[]

  onChange?(values: string[], options: CascaderEventOption[]): void

  onSelect?(values: string[], options: CascaderEventOption[]): void

  onTabClick?(event: Tabs.TabEvent): void
}

const defaultFieldNames: CascaderFieldNames = {
  label: "label",
  value: "value",
  children: "children",
}

function Cascader(props: CascaderProps) {
  const {
    className,
    defaultValue,
    value: valueProp,
    placeholder = "请选择",
    title,
    loadData,
    fieldNames: _fieldNames,
    animated = true,
    swipeable = false,
    children: childrenProp,
    options,
    onChange,
    onSelect,
    onTabClick,
  } = props
  const [colRefreshKey, refreshKey] = useReducer((state) => state + 1, 0)
  const { value: values = [], setValue: setValues } = useUncontrolled({
    defaultValue,
    value: valueProp,
  })
  const fieldNames: CascaderFieldNames = useMemo(() => {
    if (!_.isEmpty(_fieldNames) && _.isObject(_fieldNames)) {
      return Object.assign({ ...defaultFieldNames }, _fieldNames)
    }
    return defaultFieldNames
  }, [_fieldNames])
  // @ts-ignore
  const { columns } = useCascader({
    options: options,
    value: values,
    fieldNames,
    refreshKey: colRefreshKey,
  })
  const { header: _header, tabs: _tab } = useCascaderChildren(childrenProp)
  const header = useMemo(
    () => (title ? <CascaderHeader>{title}</CascaderHeader> : _header),
    [title, _header],
  )
  const [tabs, tabsMap] = useMemo(() => {
    let ret: CascaderTabObject[]
    const cache = new Map<string, CascaderOptionObject>()
    if (columns.length > 0) {
      ret = columns.map((column, idx) => ({
        options: column.map(
          (item) =>
            ({
              children: item[fieldNames.label!],
              key: item[fieldNames.value!],
              value: item[fieldNames.value!],
              disabled: item.disabled,
              tabIndex: idx,
            } as CascaderOptionObject),
        ),
      }))
    } else {
      ret = _tab
    }
    ret.forEach((r) => r.options?.forEach((rr) => cache.set(rr.value, rr)))
    return [ret, cache] as const
  }, [columns, _tab, fieldNames])
  const [activeTab, setActiveTab] = useState(0)

  const renderedTabs = useMemo(() => _.slice(tabs, 0, _.size(values) + 1), [tabs, values])

  const renderedOptions = useMemo(() => values.map((item) => tabsMap.get(item)), [tabsMap, values])

  const emitChange = useMemoizedFn(async (newValues: any[]) => {
    const newActiveOptions = newValues.map((item) => tabsMap.get(item)!)
    onSelect?.(newValues, newActiveOptions)
    if (!_.isEqual(newValues, valueProp)) {
      if (columns.length > 0) {
        let children
        if (loadData) {
          // @ts-ignore
          children = await loadData(newValues.slice(), newActiveOptions.slice())
          const level = newValues.length - 1
          const selected = columns[level].find(
            (item) => item[fieldNames.value!] === newValues[level],
          )
          if (selected) {
            selected[fieldNames.children!] = children
          }
        } else {
          const last = columns[newValues.length - 1].find(
            (item) => item[fieldNames.value!] === newValues[newValues.length - 1],
          )
          children = last?.[fieldNames.children!]
        }
        if (!children || children.length === 0) {
          onChange?.(newValues, newActiveOptions)
        } else {
          nextTick(() => {
            refreshKey()
            setActiveTab((prev) => prev + 1)
          })
        }
      } else {
        if (_.size(tabs) === _.size(newValues)) {
          onChange?.(newValues, newActiveOptions)
        } else {
          nextTick(() => {
            setActiveTab((prev) => prev + 1)
          })
        }
      }
    }
  })

  const handleSelect = useMemoizedFn((option: CascaderOptionObject) => {
    const { disabled, tabIndex, value } = option
    if (disabled) {
      return
    }
    const newValues = _.slice(values, 0, tabIndex + 1)
    newValues[tabIndex] = value
    setValues(newValues)
    emitChange(newValues.slice())
  })

  const panes = useMemo(
    () =>
      _.map(renderedTabs, (tab, index) => (
        <Tabs.TabPane
          key={index}
          value={index}
          title={_.get(renderedOptions, index)?.children ?? placeholder}
          classNames={{
            title: classNames(prefixClassname("cascader__tab"), {
              [prefixClassname("cascader__tab--inactive")]: _.isEmpty(
                _.get(renderedOptions, index)?.children,
              ),
            }),
          }}
        >
          <ScrollView scrollY className={prefixClassname("cascader__options")}>
            {
              //
              _.map(tab.options, (option) => {
                const { onClick, value, children, ...restProps } = option
                return (
                  <CascaderOptionBase
                    {...restProps}
                    children={children ?? value}
                    onClick={(event) => {
                      onClick?.(event)
                      handleSelect(option)
                    }}
                    active={isActiveOption(option, values)}
                  />
                )
              })
            }
          </ScrollView>
        </Tabs.TabPane>
      )),
    [renderedOptions, renderedTabs, handleSelect, placeholder, values],
  )

  return (
    <View className={classNames(prefixClassname("cascader"), className)}>
      {header}
      <Tabs
        className={prefixClassname("cascader__tabs")}
        value={activeTab}
        animated={animated}
        swipeable={swipeable}
        onChange={(value) => setActiveTab(value)}
        onTabClick={onTabClick}
        children={panes}
      />
    </View>
  )
}

export default Cascader

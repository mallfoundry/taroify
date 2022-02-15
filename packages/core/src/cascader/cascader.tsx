import { useUncontrolled } from "@taroify/hooks"
import { View } from "@tarojs/components"
import { nextTick } from "@tarojs/taro"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import {
  Children,
  isValidElement,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import { prefixClassname } from "../styles"
import Tabs from "../tabs"
import CascaderHeader from "./cascader-header"
import CascaderOption from "./cascader-option"
import CascaderOptionBase from "./cascader-option-base"
import CascaderTab from "./cascader-tab"
import { CascaderOptionObject, CascaderTabObject, isActiveOption } from "./cascader.shared"

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
  defaultValue?: any[]
  value?: any[]
  swipeable?: boolean
  placeholder?: ReactNode
  children?: ReactNode

  onChange?(values: any[], options: CascaderOptionObject[]): void

  onSelect?(values: any[], options: CascaderOptionObject[]): void

  onTabClick?(event: Tabs.TabEvent): void
}

function Cascader(props: CascaderProps) {
  const {
    className,
    defaultValue,
    value: valueProp,
    placeholder = "请选择",
    swipeable = false,
    children: childrenProp,
    onChange,
    onSelect,
    onTabClick,
  } = props
  const { header, tabs } = useCascaderChildren(childrenProp)

  const { value: values = [], setValue: setValues } = useUncontrolled({
    defaultValue,
    value: valueProp,
  })

  const [activeTab, setActiveTab] = useState(0)

  const lastTab = useMemo(() => _.size(tabs) - 1, [tabs])

  const activeTabs = useMemo(() => _.slice(tabs, 0, _.size(values) + 1), [tabs, values])

  const findOptions = useCallback(
    (aValues: any[]) =>
      _.map(
        tabs,
        ({ options }) =>
          _.find(
            options,
            (option) => option.value === aValues[option.tabIndex],
          ) as CascaderOptionObject,
      ),
    [tabs],
  )

  const activeOptions = useMemo(() => findOptions(values), [findOptions, values])

  const emitChange = useCallback(
    (newValues: any[]) => {
      const newActiveOptions = findOptions(newValues)
      if (!_.isEqual(newValues, valueProp)) {
        onSelect?.(newValues, newActiveOptions)
        if (_.size(tabs) === _.size(newValues)) {
          onChange?.(newValues, newActiveOptions)
        }
      }
    },
    [findOptions, onChange, onSelect, tabs, valueProp],
  )

  const handleSelect = useCallback(
    (option: CascaderOptionObject) => {
      const { disabled, tabIndex, value } = option
      if (disabled) {
        return
      }

      const newValues = _.slice(values, 0, tabIndex + 1)

      newValues[tabIndex] = value
      setValues(newValues)
      emitChange(newValues)
    },
    [emitChange, setValues, values],
  )

  useEffect(() => {
    nextTick(() => {
      setActiveTab(_.clamp(_.size(values), lastTab))
    })
  }, [lastTab, values])

  const panes = useMemo(
    () =>
      _.map(activeTabs, (tab, index) => (
        <Tabs.TabPane
          key={index}
          value={index}
          title={_.get(activeOptions, index)?.children ?? placeholder}
          classNames={{
            title: classNames(prefixClassname("cascader__tab"), {
              [prefixClassname("cascader__tab--inactive")]: _.isEmpty(
                _.get(activeOptions, index)?.children,
              ),
            }),
          }}
        >
          <View className={prefixClassname("cascader__options")}>
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
          </View>
        </Tabs.TabPane>
      )),
    [activeOptions, activeTabs, handleSelect, placeholder, values],
  )

  return (
    <View className={classNames(prefixClassname("cascader"), className)}>
      {header}
      <Tabs
        className={prefixClassname("cascader__tabs")}
        value={activeTab}
        animated
        swipeable={swipeable}
        onChange={(value) => setActiveTab(value)}
        onTabClick={onTabClick}
        children={panes}
      />
    </View>
  )
}

export default Cascader

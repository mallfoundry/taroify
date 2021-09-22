import Success from "@taroify/icons/Success"
import { View } from "@tarojs/components"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import {
  Children,
  cloneElement,
  CSSProperties,
  isValidElement,
  ReactElement,
  ReactNode,
  useCallback,
} from "react"
import Sidebar from "../sidebar"
import { prefixClassname } from "../styles"
import TreeSelectOption from "./tree-select-option"
import TreeSelectTab from "./tree-select-tab"
import TreeSelectContext from "./tree-select.context"
import {
  TreeSelectOptionEvent,
  TreeSelectOptionValue,
  TreeSelectTabEvent,
  TreeSelectTabKey,
} from "./tree-select.shared"

interface TreeSelectChildren {
  tabs: ReactNode[]
  options: ReactNode[]
}

function getTreeSelectOptions(children: ReactNode) {
  const options: ReactNode[] = []
  Children.forEach(children, (child: ReactNode, index) => {
    // Skip is not Option of TreeSelect
    if (!isValidElement(child)) {
      return
    }

    const element = child as ReactElement

    const elementType = element.type
    if (elementType === TreeSelectOption) {
      const { key } = element
      options.push(
        cloneElement(element, {
          key: key ?? index,
          __dataKey__: key ?? index,
          __dataIndex__: index,
        }),
      )
    } else {
      options.push(element)
    }
  })
  return options
}

function useTreeSelectChildren(
  children: ReactNode,
  activeTab?: TreeSelectTabKey,
): TreeSelectChildren {
  const __children__: TreeSelectChildren = {
    tabs: [],
    options: [],
  }

  Children.forEach(children, (child: ReactNode, index) => {
    // Skip is not Tab of TreeSelect
    if (!isValidElement(child)) {
      return
    }

    const element = child as ReactElement

    const elementType = element.type
    if (elementType === TreeSelectTab) {
      const { key, props } = element
      const tabKey = key ?? index
      __children__.tabs.push(
        cloneElement(element, {
          key: tabKey,
          __dataKey__: tabKey,
          __dataIndex__: index,
        }),
      )

      if (activeTab === tabKey) {
        __children__.options.push(...getTreeSelectOptions(props.children))
      }
    }
  })
  return __children__
}

export interface TreeSelectProps {
  className?: string
  style?: CSSProperties
  activeTab?: TreeSelectTabKey
  value?: TreeSelectOptionValue | TreeSelectOptionValue[]
  activeIcon?: ReactNode
  children?: ReactNode

  onTabChange?(event: TreeSelectTabEvent): void

  onChange?(values: TreeSelectOptionValue | TreeSelectOptionValue[]): void
}

function TreeSelect(props: TreeSelectProps) {
  const { className, activeTab, value, activeIcon = <Success />, onTabChange, onChange } = props
  const { tabs, options } = useTreeSelectChildren(props.children, activeTab)

  const hasValuesActive = useCallback(
    (aValue: TreeSelectOptionValue) =>
      _.isArray(value) ? value.includes(aValue) : value === aValue,
    [value],
  )

  const changeValuesActive = useCallback(
    ({ value: evtValue, active }: TreeSelectOptionEvent) => {
      const multiselect = _.isArray(value)

      if (multiselect) {
        if (active) {
          onChange?.((value as any[]).concat(evtValue))
        } else {
          onChange?.((value as any[]).filter((aValue) => aValue !== evtValue))
        }
      } else {
        onChange?.(value === evtValue && !active ? undefined : evtValue)
      }
    },
    [value, onChange],
  )

  return (
    <TreeSelectContext.Provider
      value={{
        activeIcon,
        hasValuesActive,
        changeValuesActive,
      }}
    >
      <View className={classNames(prefixClassname("tree-select"), className)}>
        <Sidebar
          className={prefixClassname("tree-select__sidebar")}
          activeKey={activeTab}
          onChange={onTabChange}
          children={tabs}
        />
        <View className={prefixClassname("tree-select__content")} children={options} />
      </View>
    </TreeSelectContext.Provider>
  )
}

export default TreeSelect

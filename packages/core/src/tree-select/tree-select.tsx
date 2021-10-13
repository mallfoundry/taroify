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
import { TreeSelectOptionObject, TreeSelectTabObject } from "./tree-select.shared"

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

function useTreeSelectChildren(children: ReactNode, tabValue?: any): TreeSelectChildren {
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
      const { value: oldValue, ...restProps } = props
      const value = oldValue ?? index

      __children__.tabs.push(
        cloneElement(element, {
          key: key ?? value,
          value: value,
          ...restProps,
        }),
      )

      if (tabValue === value) {
        __children__.options.push(...getTreeSelectOptions(props.children))
      }
    }
  })
  return __children__
}

export interface TreeSelectProps {
  className?: string
  style?: CSSProperties
  tabValue?: any
  value?: any | any[]
  activeIcon?: ReactNode
  children?: ReactNode

  onTabChange?(value: any, tabObject: TreeSelectTabObject): void

  onChange?(values: any | any[]): void
}

function TreeSelect(props: TreeSelectProps) {
  const { className, tabValue, value, activeIcon = <Success />, onTabChange, onChange } = props
  const { tabs, options } = useTreeSelectChildren(props.children, tabValue)

  const onOptionClick = useCallback(
    ({ disabled, active, value: evtValue }: TreeSelectOptionObject) => {
      if (disabled) {
        return
      }
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
        value,
        onOptionClick,
      }}
    >
      <View className={classNames(prefixClassname("tree-select"), className)}>
        <Sidebar
          className={prefixClassname("tree-select__sidebar")}
          value={tabValue}
          onChange={onTabChange}
          children={tabs}
        />
        <View className={prefixClassname("tree-select__content")} children={options} />
      </View>
    </TreeSelectContext.Provider>
  )
}

export default TreeSelect

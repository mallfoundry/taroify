import { useUncontrolled } from "@taroify/hooks"
import { Success } from "@taroify/icons"
import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { Children, cloneElement, isValidElement, ReactElement, ReactNode, useCallback } from "react"
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
      const { value: oldValue, children: childrenProp, ...restProps } = props
      const value = oldValue ?? index

      __children__.tabs.push(
        cloneElement(element, {
          key: key ?? value,
          value: value,
          children: childrenProp,
          ...restProps,
        }),
      )

      if (tabValue === value) {
        __children__.options.push(...getTreeSelectOptions(childrenProp))
      }
    }
  })
  return __children__
}

export interface TreeSelectProps extends ViewProps {
  defaultTabValue?: any
  tabValue?: any
  defaultValue?: any | any[]
  value?: any | any[]
  activeIcon?: ReactNode
  children?: ReactNode

  onTabChange?(value: any, tabObject: TreeSelectTabObject): void

  onChange?(values: any | any[]): void
}

function TreeSelect(props: TreeSelectProps) {
  const {
    className,
    defaultTabValue,
    tabValue: tabValueProp,
    defaultValue,
    value: valueProp,
    activeIcon = <Success />,
    children: childrenProp,
    onTabChange: onTabChangeProp,
    onChange: onChangeProp,
    ...restProps
  } = props

  const { value: tabValue = 0, setValue: setTabValue } = useUncontrolled({
    value: tabValueProp,
    defaultValue: defaultTabValue,
    onChange: onTabChangeProp,
  })

  const { value = 0, setValue } = useUncontrolled({
    value: valueProp,
    defaultValue,
    onChange: onChangeProp,
  })

  const { tabs, options } = useTreeSelectChildren(childrenProp, tabValue)

  const onOptionClick = useCallback(
    ({ disabled, active, value: evtValue }: TreeSelectOptionObject) => {
      if (disabled) {
        return
      }
      const multiselect = _.isArray(value)

      if (multiselect) {
        if (active) {
          setValue((value as any[]).concat(evtValue))
        } else {
          setValue((value as any[]).filter((aValue) => aValue !== evtValue))
        }
      } else {
        setValue(value === evtValue && !active ? undefined : evtValue)
      }
    },
    [value, setValue],
  )

  return (
    <TreeSelectContext.Provider
      value={{
        activeIcon,
        value,
        onOptionClick,
      }}
    >
      <View className={classNames(prefixClassname("tree-select"), className)} {...restProps}>
        <Sidebar
          className={prefixClassname("tree-select__sidebar")}
          defaultValue={defaultTabValue}
          value={tabValue}
          onChange={(newTab) => setTabValue(newTab)}
          children={tabs}
        />
        <View className={prefixClassname("tree-select__content")} children={options} />
      </View>
    </TreeSelectContext.Provider>
  )
}

export default TreeSelect

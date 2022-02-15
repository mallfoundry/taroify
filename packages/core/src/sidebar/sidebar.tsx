import { useUncontrolled } from "@taroify/hooks"
import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import {
  Children,
  cloneElement,
  CSSProperties,
  isValidElement,
  ReactElement,
  ReactNode,
  useCallback,
  useMemo,
} from "react"
import { prefixClassname } from "../styles"
import SidebarTab from "./sidebar-tab"
import { SidebarTabObject } from "./sidebar-tab.shared"
import SidebarContext from "./sidebar.context"

function useSidebarChildren(children: ReactNode) {
  return useMemo(
    () =>
      Children.map(children, (node: ReactNode, index) => {
        if (!isValidElement(node)) {
          return node
        }
        const element = node as ReactElement
        if (element.type !== SidebarTab) {
          return element
        }
        const { key, props } = element
        const { value: oldValue, ...restProps } = props
        const value = oldValue ?? index
        return cloneElement(element, {
          key: key ?? value,
          value: value,
          ...restProps,
        })
      }),
    [children],
  )
}

export interface SidebarProps extends ViewProps {
  className?: string
  style?: CSSProperties
  defaultValue?: any
  value?: any
  children?: ReactNode

  onChange?(value: any, tab: SidebarTabObject): void
}

function Sidebar(props: SidebarProps) {
  const {
    className,
    defaultValue,
    value: valueProp,
    onChange,
    children: childrenProp,
    ...restProps
  } = props

  const { value = 0, setValue } = useUncontrolled({ value: valueProp, defaultValue })

  const children = useSidebarChildren(childrenProp)

  const onTabClick = useCallback(
    (tab: SidebarTabObject) => {
      const { disabled, value } = tab
      if (!disabled) {
        setValue(value)
        onChange?.(value, tab)
      }
    },
    [onChange, setValue],
  )

  return (
    <View className={classNames(prefixClassname("sidebar"), className)} {...restProps}>
      <SidebarContext.Provider value={{ value, onTabClick }} children={children} />
    </View>
  )
}

export default Sidebar

import { View } from "@tarojs/components"
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

export interface SidebarProps {
  className?: string
  style?: CSSProperties
  value?: any
  children?: ReactNode

  onChange?(value: any, tab: SidebarTabObject): void
}

function Sidebar(props: SidebarProps) {
  const { className, style, value, onChange } = props
  const children = useSidebarChildren(props.children)

  const onTabClick = useCallback(
    (tab: SidebarTabObject) => {
      const { disabled, value } = tab
      if (!disabled) {
        onChange?.(value, tab)
      }
    },
    [onChange],
  )

  return (
    <View className={classNames(prefixClassname("sidebar"), className)} style={style}>
      <SidebarContext.Provider value={{ value, onTabClick }} children={children} />
    </View>
  )
}

export default Sidebar

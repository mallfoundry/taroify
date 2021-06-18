import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { cloneElement, ReactElement, ReactNode, useMemo } from "react"
import SidebarTab, { SidebarTabEvent, SidebarTabKey } from "../sidebar-tab"
import { prefixClassname } from "../styles"
import SidebarContext from "./sidebar.context"

function arrayChildren(children?: ReactNode) {
  return React.Children.map(children, (node: ReactNode, index) => {
    if (!React.isValidElement(node)) {
      return node
    }
    const element = node as ReactElement
    if (element.type !== SidebarTab) {
      return element
    }
    const { props } = element
    return cloneElement(element, {
      ...props,
      __dataKey__: element.key ?? index,
      __dataIndex__: index,
    })
  })
}

interface SidebarProps {
  activeKey?: SidebarTabKey
  children?: ReactNode
  onChange?: (event: SidebarTabEvent) => void
}

function Sidebar(props: SidebarProps) {
  const { activeKey, onChange } = props

  const children = useMemo(() => arrayChildren(props.children), [props.children])

  function emitClick(event: SidebarTabEvent) {
    if (!event.active && !event.disabled) {
      onChange?.(event)
    }
  }

  return (
    <View className={classNames(prefixClassname("sidebar"))}>
      <SidebarContext.Provider value={{ activeKey, emitClick }} children={children} />
    </View>
  )
}

export default Sidebar

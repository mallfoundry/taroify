import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { cloneElement, ReactElement, ReactNode, useContext, useMemo } from "react"
import { prefixClassname } from "../styles"
import SidebarContext from "./sidebar.context"

function arrayChildren(children?: ReactNode) {
  return React.Children.map(children, (node, index) => {
    if (!React.isValidElement(node)) {
      return node
    }
    const element = node as ReactElement
    if (element.type !== Sidebar.Tab) {
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
  activeKey?: Sidebar.TabKey
  children?: ReactNode
  onChange?: (event: Sidebar.TabEvent) => void
}

function Sidebar(props: SidebarProps) {
  const { activeKey, onChange } = props

  const children = useMemo(() => arrayChildren(props.children), [props.children])

  function emitClick(event: Sidebar.TabEvent) {
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

namespace Sidebar {
  export type TabKey = string | number | undefined

  export interface TabEvent {
    key?: TabKey
    index?: number
    title?: ReactNode
    disabled?: boolean
    active?: boolean
  }

  interface TabProps {
    __dataKey__?: TabKey
    __dataIndex__?: number
    active?: boolean
    disabled?: boolean
    dot?: boolean
    badge?: ReactNode
    children?: ReactNode
    onClick?: (event: TabEvent) => void
  }

  export function Tab(props: TabProps) {
    const { __dataKey__, __dataIndex__, active, disabled, children, onClick } = props
    const { activeKey, emitClick } = useContext(SidebarContext)
    const __active__ = active || __dataKey__ === activeKey

    function handleClick() {
      const event = {
        key: __dataKey__,
        index: __dataIndex__,
        active: __active__,
        disabled,
        title: children,
      }
      onClick?.(event)
      emitClick?.(event)
    }

    return (
      <View
        className={classNames(prefixClassname("sidebar__item"), {
          [prefixClassname("sidebar__item--active")]: __active__,
          [prefixClassname("sidebar__item--disabled")]: disabled,
        })}
        onClick={handleClick}
      >
        {children && (
          <View className={prefixClassname("sidebar__item__content")} children={children} />
        )}
      </View>
    )
  }
}

export default Sidebar

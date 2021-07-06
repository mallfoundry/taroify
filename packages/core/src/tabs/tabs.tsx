import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { Children, cloneElement, ReactElement, ReactNode, useCallback, useRef } from "react"
import { prefixClassname } from "../styles"
import NavTabs from "./nav-tabs"
import { TabKey, TabKey as SharedTabKey, TabsTheme, TabsThemeString } from "./shared"
import { TabEvent as __TabEvent__ } from "./tab"

function obtainTabPanes(children?: ReactNode, activeKey?: TabKey) {
  return Children.map(children, (node: ReactNode, __dataIndex__: number) => {
    if (!React.isValidElement(node)) {
      return node
    }
    const element = node as ReactElement
    if (element.type !== Tabs.TabPane) {
      return element
    }
    const __dataKey__ = element.key ?? __dataIndex__
    return cloneElement(element, { active: activeKey === __dataKey__ })
  })
}

interface TabsContentProps {
  activeKey?: TabKey
  children?: ReactNode
}

function TabsContent(props: TabsContentProps) {
  const { activeKey, children } = props
  const panes = obtainTabPanes(children, activeKey)
  return <View className={prefixClassname("tabs__content")}>{panes}</View>
}

interface TabsProps {
  activeKey?: TabKey
  theme?: TabsTheme | TabsThemeString
  themeColor?: string
  background?: string
  duration?: number | string
  bordered?: boolean
  ellipsis?: boolean
  activeColor?: string
  inactiveColor?: string
  children?: ReactNode
  onClick?: (event: Tabs.TabEvent) => void
  onChange?: (event: Tabs.TabEvent) => void
}

function Tabs(props: TabsProps) {
  const {
    activeKey = -1,
    theme = TabsTheme.Line,
    ellipsis = true,
    activeColor,
    inactiveColor,
    bordered,
    children,
    onClick,
    onChange,
  } = props

  function handleClick(event: Tabs.TabEvent) {
    const { key: __activeKey__, disabled } = event
    if (__activeKey__ !== activeKey && !disabled) {
      onChange?.(event)
    }
    onClick?.(event)
  }

  return (
    <View
      className={classNames(
        prefixClassname("tabs"), //
        {
          [prefixClassname("tabs--line")]: theme === TabsTheme.Line,
          [prefixClassname("tabs--card")]: theme === TabsTheme.Card,
        },
      )}
    >
      <NavTabs
        activeKey={activeKey}
        theme={theme}
        ellipsis={ellipsis}
        activeColor={activeColor}
        inactiveColor={inactiveColor}
        bordered={bordered}
        onClick={handleClick}
        children={children}
      />
      <TabsContent activeKey={activeKey} children={children} />
    </View>
  )
}

namespace Tabs {
  export type TabEvent = __TabEvent__
  export type TabKey = SharedTabKey

  interface TabPaneProps {
    active?: boolean
    disabled?: boolean
    title?: ReactNode
    children?: ReactNode
  }

  export function TabPane(props: TabPaneProps) {
    const { active, children } = props
    const initializedRef = useRef(false)

    const shouldRender = useCallback(() => {
      if (active && !initializedRef.current) {
        initializedRef.current = true
      }
      return active && initializedRef.current
    }, [active])
    return (
      <View
        style={{ display: active ? "" : "none" }}
        className={prefixClassname("tabs__tab-pane")}
        children={shouldRender() ? children : undefined}
      />
    )
  }
}

export default Tabs

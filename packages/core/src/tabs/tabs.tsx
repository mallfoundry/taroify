import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { Children, isValidElement, ReactElement, ReactNode, useMemo, useRef } from "react"
import Sticky from "../sticky"
import { prefixClassname } from "../styles"
import TabPane from "./tab-pane"
import { TabsContent } from "./tabs-content"
import TabsHeader from "./tabs-header"
import TabsContext from "./tabs.context"
import { TabEvent, TabKey, TabObject, TabsTheme, TabsThemeString } from "./tabs.shared"

function useTabObjects(children: ReactNode) {
  return useMemo(() => {
    const tabObjects: TabObject[] = []

    let index = 0
    Children.forEach(children, (node: ReactNode, i: number) => {
      if (!isValidElement(node)) {
        return node
      }
      const element = node as ReactElement
      if (element.type !== TabPane) {
        return element
      }
      const { props } = element
      const { title, disabled } = props
      const key = element.key ?? i
      tabObjects.push({
        key,
        index: index++,
        disabled,
        title,
      })
    })

    return tabObjects
  }, [children])
}

export interface TabsProps {
  className?: string
  activeKey?: TabKey
  duration?: number
  animated?: boolean
  swipeable?: boolean
  sticky?: boolean
  theme?: TabsTheme | TabsThemeString
  bordered?: boolean
  ellipsis?: boolean
  children?: ReactNode

  onChange?(event: TabEvent): void

  onTabClick?(event: TabEvent): void
}

function Tabs(props: TabsProps) {
  const {
    className,
    activeKey = -1,
    duration = 300,
    animated = false,
    swipeable = false,
    sticky = false,
    theme = TabsTheme.Line,
    ellipsis = true,
    bordered,
    children,
    onTabClick,
    onChange,
  } = props
  const rootRef = useRef()
  const tabObjects = useTabObjects(props.children)

  function handleTabClick(event: TabEvent) {
    const { key: __activeKey__, disabled } = event
    if (__activeKey__ !== activeKey && !disabled) {
      onChange?.(event)
    }
    onTabClick?.(event)
  }

  return (
    <TabsContext.Provider
      value={{
        activeKey,
        duration,
        animated,
        swipeable,
        theme,
        ellipsis,
        bordered,
        tabObjects,
        onTabClick: handleTabClick,
      }}
    >
      <View
        ref={rootRef}
        className={classNames(
          prefixClassname("tabs"),
          {
            [prefixClassname("tabs--line")]: theme === TabsTheme.Line,
            [prefixClassname("tabs--card")]: theme === TabsTheme.Card,
          },
          className,
        )}
      >
        {sticky ? (
          <Sticky container={rootRef}>
            <TabsHeader />
          </Sticky>
        ) : (
          <TabsHeader />
        )}
        <TabsContent children={children} />
      </View>
    </TabsContext.Provider>
  )
}

export default Tabs

import { View } from "@tarojs/components"
import type { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { type CSSProperties, type ReactNode, useContext, useMemo, useRef } from "react"
import { prefixClassname } from "../styles"
import Swiper from "../swiper"
import TabsContext from "./tabs.context"

interface TabPaneBaseProps extends ViewProps {
  className?: string
  style?: CSSProperties
  index: number
  value?: any
  children?: ReactNode
  title?: ReactNode
}

export default function TabPaneBase(props: TabPaneBaseProps) {
  const { className, style, index, value, children, title, ...restProps } = props
  const { value: activeValue, lazyRender, animated, swipeable } = useContext(TabsContext)

  const active = activeValue === value

  const initializedRef = useRef(false)

  const shouldRender = useMemo(() => {
    if (!lazyRender) {
      return true
    }

    if (initializedRef.current) {
      return true
    }

    if (active && !initializedRef.current) {
      initializedRef.current = true
    }
    return active
  }, [active, lazyRender])

  const tabPane = (
    <View
      style={{
        ...style,
        display: !(animated || swipeable) && !active ? "none" : "",
      }}
      className={classNames(
        prefixClassname("tabs__tab-pane"),
        prefixClassname("tabs__tab-panel"),
        className,
      )}
      children={shouldRender ? children : undefined}
      {...restProps}
    />
  )

  if (animated || swipeable) {
    return (
      <Swiper.Item
        className={classNames(
          prefixClassname("tabs__tab-pane-wrapper"),
          prefixClassname("tabs__tab-panel-wrapper"),
          {
            [prefixClassname("tabs__tab-pane-wrapper--inactive")]: !active,
            [prefixClassname("tabs__tab-panel-wrapper--inactive")]: !active,
          },
        )}
        children={tabPane}
      />
    )
  }

  return tabPane
}

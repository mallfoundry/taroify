import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { CSSProperties, ReactNode, useContext, useMemo, useRef } from "react"
import { prefixClassname } from "../styles"
import Swiper from "../swiper"
import TabsContext from "./tabs.context"

interface TabPaneBaseProps extends ViewProps {
  className?: string
  style?: CSSProperties
  index: number
  value?: any
  children?: ReactNode
}

export default function TabPaneBase(props: TabPaneBaseProps) {
  const { className, style, index, value, children, ...restProps } = props
  const { index: activeIndex, value: activeValue, lazyRender, animated, swipeable } = useContext(
    TabsContext,
  )

  const active = activeValue === value

  const initializedRef = useRef(false)

  const shouldRender = useMemo(() => {
    if (!lazyRender) {
      return true
    }

    if (initializedRef.current) {
      return true
    }

    if ((index - 1 === activeIndex || index + 1 === activeIndex) && !initializedRef.current) {
      initializedRef.current = true
      return true
    }

    if (active && !initializedRef.current) {
      initializedRef.current = true
    }
    return active
  }, [active, activeIndex, index, lazyRender])

  const tabPane = (
    <View
      style={{
        ...style,
        display: !(animated || swipeable) && !active ? "none" : "",
      }}
      className={classNames(prefixClassname("tabs__tab-pane"), className)}
      children={shouldRender ? children : undefined}
      {...restProps}
    />
  )

  if (animated || swipeable) {
    return (
      <Swiper.Item
        className={classNames(prefixClassname("tabs__tab-pane-wrapper"), {
          [prefixClassname("tabs__tab-pane-wrapper--inactive")]: !active,
        })}
        children={tabPane}
      />
    )
  }

  return tabPane
}

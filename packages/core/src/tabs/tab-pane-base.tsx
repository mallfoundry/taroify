import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { ReactNode, useContext, useMemo, useRef } from "react"
import { prefixClassname } from "../styles"
import Swiper from "../swiper"
import TabsContext from "./tabs.context"
import { TabKey as SharedTabKey } from "./tabs.shared"

interface TabPaneBaseProps {
  __dataKey__?: SharedTabKey
  __dataIndex__?: number
  className?: string
  children?: ReactNode
}

export default function TabPaneBase(props: TabPaneBaseProps) {
  const { __dataKey__, __dataIndex__, className, children } = props
  const { activeKey, lazyRender, animated, swipeable } = useContext(TabsContext)
  const active = __dataKey__ === activeKey

  const initializedRef = useRef(false)

  const shouldRender = useMemo(() => {
    if (!lazyRender) {
      return true
    }
    if (active && !initializedRef.current) {
      initializedRef.current = true
    }
    return active && initializedRef.current
  }, [active, lazyRender])

  if (animated || swipeable) {
    return (
      <Swiper.Item
        __dataIndex__={__dataIndex__}
        className={classNames(prefixClassname("tabs__tab-pane-wrapper"), {
          [prefixClassname("tabs__tab-pane-wrapper--inactive")]: !active,
        })}
      >
        <View
          className={classNames(prefixClassname("tabs__tab-pane"), className)}
          children={children}
        />
      </Swiper.Item>
    )
  }

  return (
    <View
      style={{ display: active ? "" : "none" }}
      className={classNames(prefixClassname("tabs__tab-pane"), className)}
      children={shouldRender ? children : undefined}
    />
  )
}

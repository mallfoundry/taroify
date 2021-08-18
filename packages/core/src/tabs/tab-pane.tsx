import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { ReactNode, useCallback, useContext, useRef } from "react"
import { prefixClassname } from "../styles"
import Swiper from "../swiper"
import TabsContext from "./tabs.context"
import { TabKey as SharedTabKey } from "./tabs.shared"

interface TabPaneProps {
  __dataKey__?: SharedTabKey
  __dataIndex__?: number
  disabled?: boolean
  title?: ReactNode
  children?: ReactNode
}

export default function TabPane(props: TabPaneProps) {
  const { __dataKey__, __dataIndex__, children } = props
  const { activeKey, animated, swipeable } = useContext(TabsContext)
  const active = __dataKey__ === activeKey

  const initializedRef = useRef(false)

  const shouldRender = useCallback(() => {
    if (active && !initializedRef.current) {
      initializedRef.current = true
    }
    return active && initializedRef.current
  }, [active])

  if (animated || swipeable) {
    return (
      <Swiper.Item
        __dataIndex__={__dataIndex__}
        className={classNames(prefixClassname("tabs__tab-pane-wrapper"), {
          [prefixClassname("tabs__tab-pane-wrapper--inactive")]: !active,
        })}
      >
        <View className={prefixClassname("tabs__tab-pane")} children={children} />
      </Swiper.Item>
    )
  }

  return (
    <View
      style={{ display: active ? "" : "none" }}
      className={prefixClassname("tabs__tab-pane")}
      children={shouldRender() ? children : undefined}
    />
  )
}

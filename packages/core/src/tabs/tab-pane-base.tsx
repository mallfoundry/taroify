import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { ReactNode, useContext, useMemo, useRef } from "react"
import { prefixClassname } from "../styles"
import Swiper from "../swiper"
import TabsContext from "./tabs.context"

interface TabPaneBaseProps {
  className?: string
  value?: any
  children?: ReactNode
}

export default function TabPaneBase(props: TabPaneBaseProps) {
  const { className, value, children } = props
  const { value: activeValue, lazyRender, animated, swipeable } = useContext(TabsContext)
  const active = activeValue === value

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
        className={classNames(prefixClassname("tabs__tab-pane-wrapper"), {
          [prefixClassname("tabs__tab-pane-wrapper--inactive")]: !active,
        })}
      >
        <View
          className={classNames(
            prefixClassname("tabs__tab-pane"),
            prefixClassname(`tabs__tab-pane--${value}`),
            className,
          )}
          children={children}
        />
      </Swiper.Item>
    )
  }

  return (
    <View
      style={{ display: active ? "" : "none" }}
      className={classNames(
        prefixClassname("tabs__tab-pane"),
        prefixClassname(`tabs__tab-pane--${value}`),
        className,
      )}
      children={shouldRender ? children : undefined}
    />
  )
}

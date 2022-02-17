import { View, Text } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"
import { algin } from "./timeline.shared"
import "./timeline-item.scss"
export interface TimeLineItemProps extends ViewProps {
  algin?: algin
  bullet?: JSX.Element
  title?: string
  children?: ReactNode
  className?: string
  active?:boolean
}

function TimeLineItem(props: TimeLineItemProps) {
  const { children, bullet, title, algin = "left", className ,active} = props
  return (
    <View
      className={classNames(
        prefixClassname("timeline-item"),
        {
          [prefixClassname("timeline-item-algin")]: algin === "right",
        },
        className,
      )}
    >
      <View className={classNames(prefixClassname("timeline-item-line"),{
        [prefixClassname("timeline-item-line-active")]:active
      })}>
        <View className={classNames(prefixClassname("timeline-item-line-bullet"),{
        [prefixClassname("timeline-item-line-bullet-active")]:active
      })}>{bullet}</View>
      </View>
      <View className={classNames(prefixClassname("timeline-item-content"))}>
        <View className={classNames(prefixClassname("timeline-item-content-title"))}>
          <Text>{title}</Text>
        </View>
        {children}
      </View>
    </View>
  )
}

export default TimeLineItem

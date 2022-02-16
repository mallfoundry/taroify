import { View ,Text} from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"
import "./timeline-item.scss"
export interface TimeLineItemProps extends ViewProps {
  bullet?: JSX.Element
  title?: string
  children?: ReactNode
}

function TimeLineItem(props: TimeLineItemProps) {
  const { children, bullet, title } = props
  return (
    <View className={classNames(prefixClassname("timeline-item"))}>
      <View className={classNames(prefixClassname("timeline-item-bullet"))}>{bullet}</View>
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

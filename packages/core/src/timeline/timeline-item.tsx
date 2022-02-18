import { View } from "@tarojs/components"

import classNames from "classnames"
import * as React from "react"
import { ReactNode, CSSProperties } from "react"
import { prefixClassname } from "../styles"

import "./timeline-item.scss"

export interface TimeLineItemProps {
  children?: ReactNode
  className?: string
  style?: string | CSSProperties
}

function TimeLineItem(props: TimeLineItemProps) {
  const { children, className, style } = props

  return (
    <View className={classNames(prefixClassname("timeline-item"), className)} style={style}>
      {children}
    </View>
  )
}

export default TimeLineItem

import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"
import { algin } from "./timeline.shared"
import "./timeline-content.scss"
export interface TimeLineContentProps {
  algin?: algin
  bullet?: JSX.Element
  title?: string
  children?: ReactNode
  className?: string
}

function TimeLineItem(props: TimeLineContentProps) {
  const { children } = props
  return <View className={classNames(prefixClassname("timeline-content"))}>{children}</View>
}

export default TimeLineItem

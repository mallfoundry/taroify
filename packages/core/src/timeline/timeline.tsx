import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"
import { algin } from "./timeline.shared"
import "./timeline.scss"
export interface TimeLineProps extends ViewProps {
  active: number
  children: ReactNode
  algin?: algin

}
function TimeLine(props: TimeLineProps) {
  const { children} = props
  
  return <View className={classNames(prefixClassname("timeline"))}>{children}</View>
}

export default TimeLine

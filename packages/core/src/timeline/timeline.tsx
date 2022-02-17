import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { ReactNode, Children, cloneElement } from "react"
import { prefixClassname } from "../styles"
import { algin } from "./timeline.shared"
import "./timeline.scss"
export interface TimeLineProps extends ViewProps {
  active: number
  children: ReactNode
  algin?: algin
}
function useTimeLineItemComponents(children: ReactNode, algin: algin | undefined, active: number) {
  return Children.toArray(children).map((child: any, index: number) => {
    return cloneElement(child, {
      algin: algin,
      active:active>index
    })
  })
}
function TimeLine(props: TimeLineProps) {
  const { children, algin, active = 0 } = props
  
  const TimelineItem = useTimeLineItemComponents(children, algin, active)
  return <View className={classNames(prefixClassname("timeline"))}>{TimelineItem}</View>
}

export default TimeLine

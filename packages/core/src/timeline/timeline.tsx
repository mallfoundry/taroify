import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { ReactNode, Children, cloneElement } from "react"
import { prefixClassname } from "../styles"
import { algin } from "./timeline.shared"
import "./timeline.scss"
export interface TimeLineProps extends ViewProps {
  children: ReactNode
  algin?: algin
}
function useTimeLineItemComponents(children: ReactNode, algin: algin | undefined) {
  if (algin) {
    return Children.toArray(children).map((child: any) => {
      return cloneElement(child, {
        algin: algin ? algin : undefined,
        className: algin && classNames(prefixClassname("timeline-item-flex")),
      })
    })
  }else{
    return children
  }
}
function TimeLine(props: TimeLineProps) {
  const { children, algin } = props
  const TimelineItem = useTimeLineItemComponents(children, algin)
  return <View className={classNames(prefixClassname("timeline"))}>{TimelineItem}</View>
}

export default TimeLine

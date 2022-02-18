import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"
import { algin } from "./timeline.shared"
import "./timeline-line.scss"

export interface TimeLineLineProps {
  algin?: algin
  bullet?: JSX.Element
  title?: string
  children?: ReactNode
  className?: string
  active?: boolean
}

function TimeLineLine(props: TimeLineLineProps) {
  const { children, active,className } = props
  console.log(className);
  
  return (
    <View
      className={classNames(prefixClassname("timeline-line"), {
        [prefixClassname("timeline-line-active")]: active,
      },className)}
    >
      <View
        className={classNames(prefixClassname("timeline-line-bullet"), {
          [prefixClassname("timeline-line-bullet-active")]: active,
        })}
      >
        {children}
      </View>
    </View>
  )
}
TimeLineLine.displayName = "TimeLineLine"
export default TimeLineLine

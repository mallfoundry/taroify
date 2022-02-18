import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"
import { algin } from "./timeline.shared"
import "./timeline-line.scss"

export interface TimeLineLineProps {
  algin?: algin
  children?: ReactNode
  className?: string
  borderStyle?: string
  borderWidth?: number
  borderColor?: string
  lineWidth?: number
  BulletSize?: number
  lineColor?: string
  bulletBorder?: number
}

function TimeLineLine(props: TimeLineLineProps) {
  const {
    children,
    className,
    lineWidth = 1,
    borderStyle = "solid",
    BulletSize,
    lineColor,
    bulletBorder = 1,
  } = props

  return (
    <View className={classNames(prefixClassname("timeline-line"), className)}>
      <View
        className={classNames(prefixClassname("timeline-line-bullet"))}
        style={{
          borderWidth: bulletBorder + "px",
          borderColor: lineColor,
          height: BulletSize + "px",
          width: BulletSize + "px",
        }}
      >
        {children}
      </View>
      <View
        className={classNames(prefixClassname("timeline-line-border"), {
          [prefixClassname("timeline-line-border-dashed")]: borderStyle === "dashed",
          [prefixClassname("timeline-line-border-solid")]: borderStyle === "solid",
        })}
        style={{ borderWidth: lineWidth + "px", borderLeftColor: lineColor }}
      ></View>
    </View>
  )
}
TimeLineLine.displayName = "TimeLineLine"
export default TimeLineLine

import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"
import "./timeline-separator.scss"
import { borderStyle } from "./timeline.shared"

export interface TimeLineSeparatorProps {
  children?: ReactNode
  className?: string
  borderStyle?: borderStyle
  lineSize?: number
  BulletSize?: number
  color?: string
  bulletBorder?: number
  top?:number
}

function TimeLineSeparator(props: TimeLineSeparatorProps) {
  const {
    children,
    className,
    lineSize = 1,
    borderStyle = "solid",
    BulletSize,
    color,
    bulletBorder,
    top,
  } = props

  return (
    <View className={classNames(prefixClassname("timeline-separator"), className)}>
      <View
        className={classNames(prefixClassname("timeline-separator-bullet"))}
        style={{
          borderWidth: bulletBorder + "px",
          borderColor: color,
          height: BulletSize + "px",
          width: BulletSize + "px",
          top:top+"px"
        }}
      >
        {children}
      </View>
      <View
        className={classNames(prefixClassname("timeline-separator-border"), {
          [prefixClassname("timeline-separator-border-dashed")]: borderStyle === "dashed",
          [prefixClassname("timeline-separator-border-solid")]: borderStyle === "solid",
        })}
        style={{ borderLeftWidth: lineSize + "px", borderLeftColor: color }}
      ></View>
    </View>
  )
}
export default TimeLineSeparator

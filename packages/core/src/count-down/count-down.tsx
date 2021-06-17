import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { CSSProperties, ReactNode } from "react"
import { prefixClassname } from "../styles"
import { CurrentTime, parseFormat } from "./count-down.shared"

interface CountDownProps {
  className?: string
  style?: CSSProperties
  current?: CurrentTime
  format?: string
  autostart?: boolean
  millisecond?: boolean
  children?: ReactNode
}

function CountDown(props: CountDownProps) {
  const { className, style, current, format = "HH:mm:ss", children } = props

  const timeFormatter = () => {
    if (!current) {
      return
    }
    return parseFormat(format, current)
  }

  return (
    <View
      className={classNames(prefixClassname("count-down"), className)}
      style={style}
      children={children ?? timeFormatter()}
    />
  )
}

export default CountDown

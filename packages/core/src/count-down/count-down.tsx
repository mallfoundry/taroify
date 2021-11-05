import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"
import { CurrentTime, parseFormat } from "./count-down.shared"

interface CountDownProps extends ViewProps {
  current?: CurrentTime
  format?: string
  autostart?: boolean
  millisecond?: boolean
  children?: ReactNode
}

function CountDown(props: CountDownProps) {
  const { className, current, format = "HH:mm:ss", children, ...restProps } = props

  const timeFormatter = () => {
    if (!current) {
      return
    }
    return parseFormat(format, current)
  }

  return (
    <View
      className={classNames(prefixClassname("count-down"), className)}
      children={children ?? timeFormatter()}
      {...restProps}
    />
  )
}

export default CountDown

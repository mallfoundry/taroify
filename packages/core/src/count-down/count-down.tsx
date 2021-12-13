/* eslint-disable react-hooks/exhaustive-deps */
import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import { isFunction } from "lodash"
import * as React from "react"
import { forwardRef, ReactNode, useCallback, useEffect, useImperativeHandle } from "react"
import { prefixClassname } from "../styles"
import { UseCountDownOptions, useCountDown } from "./count-down.hooks"
import { CurrentTime, parseFormat } from "./count-down.shared"

interface CountDownProps extends ViewProps, UseCountDownOptions {
  format?: string
  autostart?: boolean
  children?: (current: CurrentTime) => ReactNode
}

export interface CountDownInstance {
  start: () => void
  pause: () => void
  reset: () => void
}

const CountDown = forwardRef<CountDownInstance, CountDownProps>((props, ref) => {
  const {
    className,
    time = 0,
    autostart = true,
    millisecond,
    format = "HH:mm:ss",
    onChange,
    onFinish,
    children,
  } = props

  const { current, start, pause, reset } = useCountDown({
    time,
    millisecond,
    onChange: (value) => {
      onChange?.(value)
    },
    onFinish: () => onFinish?.(),
  })

  const resetTime = useCallback(() => {
    reset(+time)
    if (autostart) {
      start()
    }
  }, [time, autostart])

  useEffect(() => {
    resetTime()
  }, [])

  useImperativeHandle(
    ref,
    (): CountDownInstance => ({
      start,
      pause,
      reset: resetTime,
    }),
    [pause, resetTime, start],
  )

  return (
    <View
      className={classNames(prefixClassname("count-down"), className)}
      children={children ?? isFunction(children) ? children(current) : parseFormat(format, current)}
    />
  )
})

export default CountDown

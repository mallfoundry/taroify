import { getWindowInfo } from "@tarojs/taro"
import { View } from "@tarojs/components"
import type { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { useMemo, type CSSProperties } from "react"
import { prefixClassname } from "../styles"

export type SafeAreaPosition = "top" | "bottom"

export interface SafeAreaProps extends ViewProps {
  position?: SafeAreaPosition
  style?: CSSProperties
  nativeSafeTop?: boolean
}

function SafeArea(props: SafeAreaProps) {
  const { className, position, nativeSafeTop, style, ...restProps } = props

  const { statusBarHeight } = getWindowInfo()

  const customStyle = useMemo(() => {
    if (position === "top" && nativeSafeTop) {
      return {
        paddingTop: `${statusBarHeight || 0}px`,
      }
    }
    return {}
  }, [position, nativeSafeTop, statusBarHeight])

  return (
    <View
      className={classNames(
        prefixClassname("safe-area"),
        {
          [prefixClassname("safe-area--top")]: position === "top",
          [prefixClassname("safe-area--bottom")]: position === "bottom",
        },
        className,
      )}
      style={{
        ...customStyle,
        ...style,
      }}
      {...restProps}
    />
  )
}

export default SafeArea

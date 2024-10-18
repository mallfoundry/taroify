import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { prefixClassname } from "../styles"
import { getEnv, getSystemInfoSync } from "@tarojs/taro"

export type SafeAreaPosition = "top" | "bottom"
const env = getEnv()
const isWeb = env === "WEB"

export interface SafeAreaProps extends ViewProps {
  position?: SafeAreaPosition
}

function SafeArea(props: SafeAreaProps) {
  const { className, position, ...restProps } = props
  const customStyle = React.useMemo(() => {
    if (isWeb) return {}
    const { safeArea, windowHeight } = getSystemInfoSync()
    let style = {}
    if (position === "top") {
      style = {
        paddingTop: safeArea?.top || 0,
      }
    } else {
      style = {
        paddingBottom: windowHeight - (safeArea?.bottom || 0),
      }
    }
    return style
  }, [position])
  return (
    <View
      className={classNames(
        prefixClassname("safe-area"),
        {
          [prefixClassname("safe-area--top")]: position === "top" && isWeb,
          [prefixClassname("safe-area--bottom")]: position === "bottom" && isWeb,
        },
        className,
      )}
      style={{
        ...customStyle,
      }}
      {...restProps}
    />
  )
}

export default SafeArea

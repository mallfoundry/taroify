import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { prefixClassname } from "../styles"
import { getSystemInfoSync } from "@tarojs/taro"
import { inBrowser } from "../utils/base"

export type SafeAreaPosition = "top" | "bottom"

export interface SafeAreaProps extends ViewProps {
  position?: SafeAreaPosition
}

function SafeArea(props: SafeAreaProps) {
  const { className, position, ...restProps } = props
  const customStyle = React.useMemo(() => {
    if (inBrowser || !position) return {}
    const { safeArea, screenHeight } = getSystemInfoSync()
    let style = {}
    if (position === "top") {
      style = {
        paddingTop: safeArea?.top || 0,
      }
    } else {
      style = {
        paddingBottom: screenHeight - (safeArea?.bottom || 0),
      }
    }
    return style
  }, [position])
  return (
    <View
      className={classNames(
        prefixClassname("safe-area"),
        {
          [prefixClassname("safe-area--top")]: position === "top" && inBrowser,
          [prefixClassname("safe-area--bottom")]: position === "bottom" && inBrowser,
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

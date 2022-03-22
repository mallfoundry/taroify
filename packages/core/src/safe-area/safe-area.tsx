import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { prefixClassname } from "../styles"

export type SafeAreaPosition = "top" | "bottom"

export interface SafeAreaProps extends ViewProps {
  position?: SafeAreaPosition
}

function SafeArea(props: SafeAreaProps) {
  const { className, position, ...restProps } = props
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
      {...restProps}
    />
  )
}

export default SafeArea

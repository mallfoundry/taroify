import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { PropsWithChildren } from "react"
import { ViewProps } from "@tarojs/components/types/View"
import { prefixClassname } from "../styles"

export interface TimeLineSeparatorProps extends PropsWithChildren<ViewProps> {}

function TimeLineSeparator(props: TimeLineSeparatorProps) {
  const { className, ...restProps } = props

  return (
    <View className={classNames(prefixClassname("timeline-separator"), className)} {...restProps} />
  )
}
TimeLineSeparator.displayName = "TimeLineSeparator"
export default TimeLineSeparator

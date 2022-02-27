import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { PropsWithChildren } from "react"
import { prefixClassname } from "../styles"

export interface TimeLineContentProps extends PropsWithChildren<ViewProps> {}

function TimeLineContent(props: TimeLineContentProps) {
  const { className, ...restProps } = props
  return (
    <View className={classNames(prefixClassname("timeline-content"), className)} {...restProps} />
  )
}

export default TimeLineContent

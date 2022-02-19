import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { PropsWithChildren } from "react"
import { prefixClassname } from "../styles"

export interface TimeLineProps extends PropsWithChildren<ViewProps> {}
function TimeLine(props: TimeLineProps) {
  const { className, ...restProps } = props

  return <View className={classNames(prefixClassname("timeline"), className)} {...restProps} />
}

export default TimeLine

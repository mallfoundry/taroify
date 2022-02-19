import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { PropsWithChildren } from "react"
import { prefixClassname } from "../styles"

export interface TimeLineItemBaseProps extends PropsWithChildren<ViewProps> {}
function TimeLineItemBase(props: TimeLineItemBaseProps) {
  const { className, ...restProps } = props

  return <View className={classNames(prefixClassname("timeline-item"), className)} {...restProps} />
}

export default TimeLineItemBase

import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"

interface CascaderHeaderProps extends ViewProps {
  children?: ReactNode
}

function CascaderHeader(props: CascaderHeaderProps) {
  const { className, ...restProps } = props
  return (
    <View className={classNames(prefixClassname("cascader__header"), className)} {...restProps} />
  )
}

export default CascaderHeader

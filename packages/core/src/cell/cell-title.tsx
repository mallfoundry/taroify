import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"

interface CellTitleProps extends ViewProps {
  children?: ReactNode
}

function CellTitle(props: CellTitleProps) {
  const { className, ...restProps } = props
  return <View className={classNames(prefixClassname("cell__title"), className)} {...restProps} />
}

export default CellTitle

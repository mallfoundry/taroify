import { View } from "@tarojs/components"
import type { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import type { ReactNode, CSSProperties } from "react"
import { prefixClassname } from "../styles"

interface CellTitleProps extends ViewProps {
  children?: ReactNode
  titleStyle?: CSSProperties
  titleClass?: string
}

function CellTitle(props: CellTitleProps) {
  const { className, titleStyle, titleClass, ...restProps } = props
  return (
    <View
      className={classNames(prefixClassname("cell__title"), className, titleClass)}
      style={titleStyle}
      {...restProps}
    />
  )
}

export default CellTitle

import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { CSSProperties, ReactNode, useContext } from "react"
import { prefixClassname } from "../styles"
import { addUnitPx } from "../utils/format/unit"
import FlexContext from "./flex.context"

export interface FlexItemProps extends ViewProps {
  style?: CSSProperties
  span?: number
  offset?: number
  children?: ReactNode
}

export default function FlexItem(props: FlexItemProps) {
  const { className, style, span, offset, ...restProps } = props
  const { gutter: gutters } = useContext(FlexContext)
  const [horizontalGutter] = gutters

  // Horizontal gutter use padding
  const gutterStyle: React.CSSProperties = {}
  if (horizontalGutter) {
    const averagePadding = horizontalGutter / 2
    gutterStyle.paddingLeft = addUnitPx(averagePadding)
    gutterStyle.paddingRight = addUnitPx(averagePadding)
  }

  return (
    <View
      className={classNames(
        prefixClassname("flex-item"),
        {
          [prefixClassname(`flex-item-${span}`)]: span !== undefined,
          [prefixClassname(`flex-item-offset-${offset}`)]: offset !== undefined,
        },
        className,
      )}
      style={{
        ...style,
        ...gutterStyle,
      }}
      {...restProps}
    />
  )
}

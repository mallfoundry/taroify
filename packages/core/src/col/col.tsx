import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { CSSProperties, ReactNode, useContext } from "react"
import { RowContext } from "../row/row"
import { prefixClassname } from "../styles"

interface ColProps {
  className?: string
  style?: CSSProperties
  span?: string | number
  offset?: string | number
  children?: ReactNode
}

export default function Col(props: ColProps) {
  const { className, style, span, offset, children } = props
  const { gutter: gutters } = useContext(RowContext)
  const [horizontalGutter] = gutters

  // Horizontal gutter use padding
  const gutterStyle: React.CSSProperties = {}
  if (horizontalGutter) {
    const averagePadding = horizontalGutter / 2
    gutterStyle.paddingLeft = `${averagePadding}px`
    gutterStyle.paddingRight = `${averagePadding}px`
  }

  return (
    <View
      className={classNames(
        prefixClassname("col"),
        {
          [prefixClassname(`col-${span}`)]: span !== undefined,
          [prefixClassname(`col-offset-${offset}`)]: offset !== undefined,
        },
        className
      )}
      style={{
        ...style,
        ...gutterStyle,
      }}
      children={children}
    />
  )
}

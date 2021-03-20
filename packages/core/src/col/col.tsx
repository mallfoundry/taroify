import { View } from "@tarojs/components"
import * as React from "react"
import { CSSProperties, ReactNode, useContext } from "react"
import classNames from "classnames"
import { prefixClassname } from "../styles"
import { RowContext } from "../row/row"

interface ColProps {
  className?: string
  style?: CSSProperties
  span?: string
  offset?: string
  children?: ReactNode
}

export default function Col(props: ColProps) {
  const { className, style, span, offset, children } = props
  const { gutter: gutters } = useContext(RowContext)
  const [horizontalGutter, verticalGutter] = gutters
  console.log(horizontalGutter, verticalGutter)

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
        className,
      )}
      style={{
        ...style,
        ...gutterStyle,
      }}
      children={children} />
  )
}

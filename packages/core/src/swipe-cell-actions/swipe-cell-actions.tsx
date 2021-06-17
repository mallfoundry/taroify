import { ITouchEvent, View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { CSSProperties, ForwardedRef, forwardRef, ReactNode } from "react"
import { prefixClassname } from "../styles"

enum SwipeCellSide {
  Left = "left",
  Right = "right",
}

type SwipeCellSideString = "left" | "right"

interface SwipeCellActionsProps {
  className?: string
  style?: CSSProperties
  side?: SwipeCellSide | SwipeCellSideString
  children?: ReactNode
  onClick?: (event: ITouchEvent) => void
}

const SwipeCellActions = forwardRef(function (
  props: SwipeCellActionsProps,
  ref: ForwardedRef<typeof View>,
) {
  const { className, style, side, children, onClick } = props

  return (
    <View
      ref={ref}
      className={classNames(
        prefixClassname("swipe-cell__actions"),
        prefixClassname(`swipe-cell__${side}`),
        className,
      )}
      style={style}
      children={children}
      onClick={onClick}
    />
  )
})

export default SwipeCellActions

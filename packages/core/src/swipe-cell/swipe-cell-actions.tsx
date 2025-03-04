import { View } from "@tarojs/components"
import type { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { type ForwardedRef, forwardRef, type ReactNode } from "react"
import { prefixClassname } from "../styles"

type SwipeCellSide = "left" | "right"

interface SwipeCellActionsProps extends ViewProps {
  side?: SwipeCellSide
  children?: ReactNode
}

const SwipeCellActions = forwardRef(
  (props: SwipeCellActionsProps, ref: ForwardedRef<typeof View>) => {
    const { className, side, ...restProps } = props

    return (
      <View
        ref={ref}
        className={classNames(
          prefixClassname("swipe-cell__actions"),
          {
            [prefixClassname("swipe-cell__left")]: side === "left",
            [prefixClassname("swipe-cell__right")]: side === "right",
          },
          className,
        )}
        {...restProps}
      />
    )
  },
)

export default SwipeCellActions

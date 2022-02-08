import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { prefixClassname } from "../styles"

type SkeletonVariant = "rect" | "circle"

type SkeletonAnimation = "pulse" | "wave"

interface SkeletonProps extends Omit<ViewProps, "animation"> {
  variant?: SkeletonVariant
  animation?: SkeletonAnimation | false
}

function Skeleton(props: SkeletonProps) {
  const { className, variant = "rect", animation = "pulse", ...restProps } = props

  return (
    <View
      className={classNames(
        prefixClassname("skeleton"),
        {
          [prefixClassname("skeleton--rect")]: variant === "rect",
          [prefixClassname("skeleton--circle")]: variant === "circle",
          [prefixClassname("skeleton--pulse")]: animation === "pulse",
          [prefixClassname("skeleton--wave")]: animation === "wave",
        },
        className,
      )}
      {...restProps}
    />
  )
}

export default Skeleton

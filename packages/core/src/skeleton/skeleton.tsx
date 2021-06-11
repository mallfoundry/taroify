import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { CSSProperties } from "react"
import { prefixClassname } from "../styles"

enum SkeletonVariant {
  Rect = "rect",
  Circle = "circle",
}

type SkeletonVariantString = "rect" | "circle"

enum SkeletonAnimation {
  Pulse = "pulse",
  Wave = "wave",
}

type SkeletonAnimationString = "pulse" | "wave"

interface SkeletonProps {
  className?: string
  style?: CSSProperties
  variant?: SkeletonVariant | SkeletonVariantString
  animation?: boolean | SkeletonAnimation | SkeletonAnimationString
}

function Skeleton(props: SkeletonProps) {
  const {
    className,
    style,
    variant = SkeletonVariant.Rect,
    animation = SkeletonAnimation.Pulse,
  } = props

  return (
    <View
      className={classNames(
        prefixClassname("skeleton"),
        {
          [prefixClassname("skeleton--rect")]: variant === SkeletonVariant.Rect,
          [prefixClassname("skeleton--circle")]: variant === SkeletonVariant.Circle,
          [prefixClassname("skeleton--pulse")]:
            animation === SkeletonAnimation.Pulse || animation === true,
          [prefixClassname("skeleton--wave")]: animation === SkeletonAnimation.Wave,
        },
        className,
      )}
      style={style}
    />
  )
}

export default Skeleton

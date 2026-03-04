import { View } from "@tarojs/components"
import type { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import type { CSSProperties, ReactNode } from "react"
import {
  ICON_PRESET_COLORS,
  ICON_PRESET_SIZES,
  ICON_TYPE,
  type IconColor,
  type IconProps,
  type IconSize,
} from "../shared"
import { addUnitPx } from "../utils/unit"

interface VanIconProps extends ViewProps {
  className?: string
  style?: CSSProperties
  name?: string
  size?: IconSize | number | string
  classPrefix?: string
  color?: IconColor | string
  children?: ReactNode
}

export default function VanIcon({
  className,
  style,
  name,
  size = "inherit",
  classPrefix = "van-icon",
  color = "inherit",
  ...restProps
}: VanIconProps) {
  const presetColor = ICON_PRESET_COLORS.includes(color as IconColor)
  const presetSize = ICON_PRESET_SIZES.includes(size as IconSize)
  const colorClass = presetColor && color !== "inherit" ? `taroify-icon--${color}` : undefined
  const sizeClass = presetSize && size !== "inherit" ? `taroify-icon--${size}` : undefined

  return (
    <View
      className={classNames(
        classPrefix,
        `${classPrefix}-${name}`,
        "taroify-icon",
        colorClass,
        sizeClass,
        className,
      )}
      style={{
        color: presetColor ? "" : color,
        fontSize: presetSize ? "" : addUnitPx(size),
        ...style,
      }}
      {...restProps}
    />
  )
}

export function createVanIconComponent(name: string) {
  function VanIconWrapper(props: IconProps) {
    return <VanIcon name={name} {...props} />
  }

  // @ts-ignore
  VanIconWrapper[ICON_TYPE] = ICON_TYPE
  return VanIconWrapper
}

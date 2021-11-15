import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { CSSProperties, ReactNode } from "react"
import {
  ICON_PRESET_COLORS,
  ICON_PRESET_SIZES,
  ICON_TYPE,
  IconColor,
  IconProps,
  IconSize,
} from "../shared"
import { addUnitPx } from "../utils/unit"

interface VanIconProps extends ViewProps {
  className?: string
  style?: CSSProperties
  name?: string
  size?: IconSize | number | string
  color?: IconColor | string
  children?: ReactNode
}

export default function VanIcon(props: VanIconProps) {
  const { className, style, name, size = "inherit", color = "inherit", ...restProps } = props
  const presetColor = ICON_PRESET_COLORS.includes(color as IconColor)
  const presetSize = ICON_PRESET_SIZES.includes(size as IconSize)

  return (
    <View
      className={classNames(
        "van-icon",
        `van-icon-${name}`,
        "taroify-icon",
        {
          [`taroify-icon--${color}`]: presetColor,
          [`taroify-icon--${size}`]: presetSize,
        },
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

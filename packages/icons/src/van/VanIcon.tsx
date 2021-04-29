import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { CSSProperties } from "react"
import {
  ICON_TYPE,
  IconColor,
  IconColorString,
  IconProps,
  IconSize,
  IconSizeString,
} from "../shared"

interface VanIconProps {
  className?: string
  style?: CSSProperties
  size?: IconSize | IconSizeString
  color?: IconColor | IconColorString
  children?: string
  onClick?: () => void
}

export default function VanIcon(props: VanIconProps) {
  const {
    className,
    style,
    size = IconSize.Inherit,
    color = IconColor.Inherit,
    children,
    onClick,
  } = props

  return (
    <View
      className={classNames(
        "van-icon",
        `van-icon-${children}`,
        "taroify-icon",
        {
          [`taroify-icon--${color}`]: color,
          [`taroify-icon--${size}`]: size,
        },
        className,
      )}
      style={style}
      onClick={onClick}
    />
  )
}

export function createVanIconComponent(name: string) {
  function VanIconWrapper(props: IconProps) {
    const { ...rest } = props
    return <VanIcon children={name} {...rest} />
  }

  // @ts-ignore
  VanIconWrapper[ICON_TYPE] = ICON_TYPE
  return VanIconWrapper
}

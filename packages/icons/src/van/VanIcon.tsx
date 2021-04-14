import * as React from "react"
import { CSSProperties } from "react"
import classNames from "classnames"
import { View } from "@tarojs/components"
import { IconColor, IconColorString, IconSize, IconSizeString } from "../shared"

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
    className, style,
    size = IconSize.Medium,
    color = IconColor.Inherit,
    children,
    onClick,
  } = props

  return (
    <View
      className={
        classNames(
          `van-icon`,
          `van-icon-${children}`,
          `taroify-icon`,
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

import classNames from "classnames"
import { View } from "@tarojs/components"
import * as React from "react"
import { CSSProperties } from "react"
import { IconColor, IconColorString, IconSize, IconSizeString } from "../shared"

export enum MaterialIconTheme {
  Filled = "filled",
  Outlined = "outlined",
  Rounded = "rounded",
  Sharp = "sharp",
}

type MaterialIconThemeString = "filled" | "outlined" | "rounded" | "sharp";

interface MaterialIconProps {
  className?: string
  style?: CSSProperties
  theme?: MaterialIconTheme | MaterialIconThemeString
  size?: IconSize | IconSizeString
  color?: IconColor | IconColorString
  children?: string
}

export default function MaterialIcon(props: MaterialIconProps) {
  const {
    className, style,
    theme = MaterialIconTheme.Filled,
    size = IconSize.Medium,
    color = IconColor.Inherit,
    children,
  } = props
  return (
    <View
      className={
        classNames(
          {
            ["material-icons"]: theme === MaterialIconTheme.Filled,
            [`material-icons-${theme}`]: theme !== MaterialIconTheme.Filled,
          },
          `taroify-icon`,
          {
            [`taroify-icon--${color}`]: color,
            [`taroify-icon--${size}`]: size,
          },
          className,
        )}
      style={style}
      children={children}
    />
  )
}

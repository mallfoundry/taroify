import * as React from "react"
import { CSSProperties } from "react"
import classNames from "classnames"
import { MaterialIcon } from "./material"

export enum IconTheme {
  Filled = "filled",
  Outlined = "outlined",
  Rounded = "rounded",
  Sharp = "sharp",
}

type IconThemeString = "filled" | "outlined" | "rounded" | "sharp";

export enum IconSize {
  Inherit = "inherit",
  Mini = "mini",
  Small = "small",
  Medium = "medium",
  Large = "large",
}

export type IconSizeString = "inherit" | "mini" | "small" | "medium" | "large"

export enum IconColor {
  Inherit = "inherit",
  Default = "default",
  Primary = "primary",
  Info = "info",
  Success = "success",
  Warning = "warning",
  Danger = "danger"
}

export type IconColorString = "inherit" | "default" | "primary" | "info" | "success" | "warning" | "danger"

export interface IconProps {
  className?: string
  style?: CSSProperties
  theme?: IconTheme | IconThemeString
  size?: IconSize | IconSizeString
  color?: IconColor | IconColorString
  children?: string
}

export default function Icon(props: IconProps) {
  const {
    className,
    style,
    theme = IconTheme.Filled,
    size = IconSize.Medium,
    color = IconColor.Default,
    children,
  } = props

  return (
    <MaterialIcon
      className={
        classNames(
          `taroify-icon`,
          `taroify-icon-color-${color}`,
          `taroify-icon-size-${size}`,
          className,
        )
      }
      style={style}
      theme={theme}
      children={children}
    />
  )
}

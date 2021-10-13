import { ITouchEvent } from "@tarojs/components"
import { CSSProperties, ReactNode } from "react"

export const ICON_TYPE = Symbol("__iconType__")

export enum IconSize {
  Inherit = "inherit",
  Mini = "mini",
  Small = "small",
  Medium = "medium",
  Large = "large",
}

export type IconSizeString = "inherit" | "mini" | "small" | "medium" | "large"

export const ICON_PRESET_SIZES: Array<IconSize | IconSizeString> = [
  "inherit",
  "mini",
  "small",
  "medium",
  "large",
]

export enum IconColor {
  Inherit = "inherit",
  Default = "default",
  Primary = "primary",
  Info = "info",
  Success = "success",
  Warning = "warning",
  Danger = "danger",
}

export type IconColorString =
  | "inherit"
  | "default"
  | "primary"
  | "info"
  | "success"
  | "warning"
  | "danger"

export const ICON_PRESET_COLORS: Array<IconColor | IconColorString> = [
  "inherit",
  "default",
  "primary",
  "info",
  "success",
  "warning",
  "danger",
]

export interface IconProps {
  className?: string
  style?: CSSProperties
  size?: IconSize | IconSizeString | number | string
  color?: IconColor | IconColorString | string
  children?: ReactNode

  onClick?(event: ITouchEvent): void
}

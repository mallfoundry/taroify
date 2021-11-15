import { ViewProps } from "@tarojs/components/types/View"
import { CSSProperties, ReactNode } from "react"

export const ICON_TYPE = Symbol("__iconType__")

export type IconSize = "inherit" | "mini" | "small" | "medium" | "large"

export const ICON_PRESET_SIZES = ["inherit", "mini", "small", "medium", "large"]

export type IconColor =
  | "inherit"
  | "default"
  | "primary"
  | "info"
  | "success"
  | "warning"
  | "danger"

export const ICON_PRESET_COLORS = [
  "inherit",
  "default",
  "primary",
  "info",
  "success",
  "warning",
  "danger",
]

export interface IconProps extends ViewProps {
  className?: string
  style?: CSSProperties
  size?: IconSize | number | string
  color?: IconColor | string
  children?: ReactNode
}

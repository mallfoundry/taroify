import type { Key, ReactNode } from "react"

export type FixedNavThemeVars = {
  fixedNavZIndex?: string
  fixedNavZContentIndex?: string
  fixedNavButtonBackground?: string
  fixedNavButtonFontSize?: string
  fixedNavBackgroundColor?: string
  fixedNavColor?: string
}

export type FixedNavDirection = "right" | "left"

export type FixedNavPosition = {
  top?: string
  bottom?: string
}

export interface FixedNavItem {
  id: Key
  text: ReactNode
  icon: ReactNode | string
}

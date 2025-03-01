import type { ReactNode } from "react"

export type DropdownMenuDirection = "up" | "down"

export interface DropdownMenuOptionEvent {
  active: boolean
  value: any
  children?: ReactNode
}

export type DropdownMenuThemeVars = {
  dropdownMenuHeight?: string
  dropdownMenuBackgroundColor?: string
  dropdownMenuZIndex?: string
  dropdownMenuBoxShadow?: string
  dropdownMenuTitleFontSize?: string
  dropdownMenuTitleColor?: string
  dropdownMenuTitlePadding?: string
  dropdownMenuTitleLineHeight?: string
  dropdownMenuTitleActiveOpacity?: string
  dropdownMenuTitleActiveColor?: string
  dropdownMenuTitleDisabledColor?: string
  dropdownMenuItemZIndex?: string | number
  dropdownMenuItemContentMaxHeight?: string
  dropdownMenuItemContentAnimationDuration?: string
  dropdownMenuOptionActiveColor?: string
}

export type DropdownMenuItemOption = {
  icon?: ReactNode
  title?: ReactNode
  value?: any
}

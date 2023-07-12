import { Key, ReactNode } from "react"

export type TabsTheme = "line" | "card"

export interface TabEvent {
  value?: any
  title?: ReactNode
  disabled?: boolean
}

export interface TabObject {
  key: Key
  index: number
  value: any
  className?: string
  classNames?: { title: string }
  title?: ReactNode
  disabled?: boolean
  dot?: boolean
  badge?: ReactNode
  children?: ReactNode
}

export type TabThemeVars = {
  tabsActiveColor?: string
  tabsWrapHeight?: string
  tabsCardHeight?: string
  tabsCardMargin?: string
  tabsCardBorderWidth?: string
  tabsCardBorderColor?: string
  tabsCardBorderRadius?: string
  tabsNavBackgroundColor?: string
  tabsLineWidth?: string
  tabsLineHeight?: string
  tabsLineBorderRadius?: string
  tabsLineBackgroundColor?: string
  tabColor?: string
  tabPadding?: string
  tabFontSize?: string
  tabLineHeight?: string
  tabActiveColor?: string
  tabActiveFontWeight?: string
  tabDisabledColor?: string
}

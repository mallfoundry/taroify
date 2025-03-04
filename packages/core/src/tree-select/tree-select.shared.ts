import type { ReactNode } from "react"
import type Sidebar from "../sidebar"

export type TreeSelectTabObject = Sidebar.TabObject

export interface TreeSelectOptionObject {
  active: boolean
  disabled: boolean
  value: any
  children?: ReactNode
}

export type TreeSelectThemeVars = {
  treeSelectFontSize?: string
  treeSelectSidebarBackgroundColor?: string
  treeSelectContentBackgroundColor?: string
  treeSelectTabPadding?: string
  treeSelectOptionPadding?: string
  treeSelectOptionFontWeight?: string
  treeSelectOptionLineHeight?: string
  treeSelectOptionActiveColor?: string
  treeSelectOptionActiveBackgroundColor?: string
  treeSelectOptionDisabledColor?: string
  treeSelectOptionIconActiveRight?: string
  treeSelectOptionIconActiveFontSize?: string
}

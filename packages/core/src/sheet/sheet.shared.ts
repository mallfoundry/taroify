import type { ReactNode } from "react"

export interface SheetItemObject {
  loading?: boolean
  disabled?: boolean
  children?: ReactNode
}

export type SheetThemeVars = {
  sheetMaxHeight?: string
  sheetHeaderPadding?: string
  sheetHeaderHeight?: string
  sheetHeaderFontSize?: string
  sheetTitleColor?: string
  sheetTitleFontSize?: string
  sheetTitleLineHeight?: string
  sheetDescriptionColor?: string
  sheetDescriptionFontSize?: string
  sheetDescriptionLineHeight?: string
  sheetItemBackground?: string
  sheetItemFontSize?: string
  sheetItemLineHeight?: string
  sheetItemTextColor?: string
  sheetItemDisabledTextColor?: string
  sheetCancelTextColor?: string
  sheetCancelPaddingTop?: string
  sheetCancelPaddingColor?: string
  sheetLoadingIconSize?: string
}

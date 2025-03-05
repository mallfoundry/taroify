import type { ReactNode } from "react"

export interface ShareSheetOptionObject {
  value?: any
  disabled?: boolean
  icon?: ReactNode
  name?: ReactNode
  description?: ReactNode
}

export type ShareSheetThemeVars = {
  shareSheetDescriptionFontSize?: string
  shareSheetOptionsPadding?: string
  shareSheetOptionIconMargin?: string
  shareSheetOptionIconSize?: string
  shareSheetOptionIconWidth?: string
  shareSheetOptionIconHeight?: string
  shareSheetOptionIconFontSize?: string
  shareSheetOptionNamePadding?: string
  shareSheetOptionNameMarginTop?: string
  shareSheetOptionNameColor?: string
  shareSheetOptionNameFontSize?: string
  shareSheetOptionNameLineHeight?: string
  shareSheetOptionDescriptionPadding?: string
  shareSheetOptionDescriptionColor?: string
  shareSheetOptionDescriptionFontSize?: string
}

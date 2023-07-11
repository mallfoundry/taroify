import { ReactNode } from "react"
import Sheet from "../sheet"

export interface ActionSheetActionObject extends Sheet.ItemObject {
  name?: ReactNode
  value?: any
}

export type ActionSheetThemeVars = {
  actionSheetDescriptionPaddingBottom?: string
  actionSheetSubnameMarginTop?: string
  actionSheetSubnameColor?: string
  actionSheetSubnameFontSize?: string
  actionSheetSubnameLineHeight?: string
}

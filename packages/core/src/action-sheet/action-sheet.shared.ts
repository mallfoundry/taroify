import { ReactNode } from "react"
import Sheet from "../sheet"

export interface ActionSheetActionObject extends Sheet.ItemObject {
  name?: ReactNode
  subname?: ReactNode
  disabled?: boolean
  loading?: boolean
  className?: string
  value?: any
  [key: string]: any
}

export type ActionSheetThemeVars = {
  actionSheetDescriptionPaddingBottom?: string
  actionSheetSubnameMarginTop?: string
  actionSheetSubnameColor?: string
  actionSheetSubnameFontSize?: string
  actionSheetSubnameLineHeight?: string
}

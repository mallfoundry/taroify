import { ReactNode } from "react";
import { ViewProps } from "@tarojs/components/types/View"
export type CellSize = "medium" | "large"

export type CellAlign = "start" | "center" | "end"

export type ArrowDirection = "right" | "left" | "up" | "down"

export type CellBaseProps = {
  size?: CellSize
  align?: CellAlign
  icon?: ReactNode
  rightIcon?: ReactNode
  required?: boolean
  bordered?: boolean
  clickable?: boolean
  isLink?: boolean
  arrowDirection?: ArrowDirection
  children?: ReactNode
} & ViewProps

export type CellThemeVars = {
  cellFontSize?: string
  cellLineHeight?: string
  cellColor?: string
  cellBackgroundColor?: string
  cellBorderColor?: string
  cellValueColor?: string
  cellActiveColor?: string
  cellRequiredColor?: string
  cellIconSize?: string
  cellIconMarginLeft?: string
  cellRightIconMarginRight?: string
  cellBriefMarginTop?: string
  cellBriefFontSize?: string
  cellBriefLineHeight?: string
  cellBriefColor?: string
  cellVerticalPadding?: string
  cellHorizontalPadding?: string
  cellVerticalPaddingLarge?: string
  cellTitleFontSizeLarge?: string
  cellSubtitleFontSizeLarge?: string
  cellGroupBackgroundColor?: string
  cellGroupTitleColor?: string
  cellGroupTitlePadding?: string
  cellGroupTitleFontSize?: string
  cellGroupTitleLineHeight?: string
  cellGroupInsetPadding?: string
  cellGroupInsetBorderRadius?: string
  cellGroupInsetTitlePadding?: string
}

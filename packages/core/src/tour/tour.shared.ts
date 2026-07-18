import type { ReactNode, RefObject } from "react"

export type TourType = "step" | "tile"

export type TourPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end"

export type TourTarget = Element | RefObject<Element> | string

export interface TourStep {
  target: TourTarget
  content?: ReactNode
  placement?: TourPlacement
  popoverOffset?: [number, number]
  arrowOffset?: number
}

export type TourThemeVars = {
  tourZIndex?: number | string
  tourMaskColor?: string
  tourMaskBorderRadius?: string
  tourPopoverMinWidth?: string
  tourPopoverMaxWidth?: string
  tourPopoverPadding?: string
  tourPopoverColor?: string
  tourPopoverBackgroundColor?: string
  tourPopoverBorderRadius?: string
  tourPopoverBoxShadow?: string
  tourArrowSize?: string
  tourContentFontSize?: string
  tourContentLineHeight?: string
  tourFooterMarginTop?: string
  tourButtonGap?: string
  tourButtonPadding?: string
  tourButtonFontSize?: string
  tourButtonBorderRadius?: string
}

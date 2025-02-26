import type { ReactNode } from "react"

export enum CircleStrokeLinecap {
  Round = "round",
  Square = "square",
  Butt = "butt",
}

export interface CircleProps {
  percent?: number
  color?: string | object
  layerColor?: string
  fill?: string
  size?: number
  speed?: number
  strokeWidth?: number
  strokeLinecap?: CanvasLineCap
  clockwise?: boolean
  startPosition?: "top" | "bottom" | "left" | "right"
  children?: ReactNode

  onChange?(value: number): void
}

export type CircleThemeVars = {
  circleSize?: string
  circleWidth?: string
  circleHeight?: string
  circleColor?: string
  circleHoverStroke?: string
  circleLayerStroke?: string
  circleTextPadding?: string
  circleTextColor?: string
  circleTextFontWeight?: string
  circleTextFontSize?: string
  circleTextLineHeight?: string
}

import { ReactNode } from "react"

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
  strokeLinecap?: CircleStrokeLinecap
  clockwise?: boolean
  children?: ReactNode

  onChange?(value: number): void
}

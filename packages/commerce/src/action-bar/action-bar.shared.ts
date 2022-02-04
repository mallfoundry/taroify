import { CSSProperties, ReactElement } from "react"

export interface ActionBarProps {
  safeAreaInsetBottom: boolean
  children: ReactElement
  className?: string
  style?: CSSProperties | any
}

export type ActionBarButtonType = "primary" | "info" | "warning" | "danger"
export type ActionBarSquare = "square" | "round" | "circle" | "border-round"

import { LoadingProps } from "@taroify/~core/src/loading"
import { ITouchEvent } from "@tarojs/components/types/common"
import { CSSProperties, ReactElement, ReactText } from "react"

export interface ActionBarProps {
  safeAreaInsetBottom: boolean
  children: ReactElement
  className?: string
  style?: CSSProperties | any
}

export type ActionBarButtonType = "primary" | "info" | "warning" | "danger"
type ActionBarSquare = "square" | "round" | "circle" | "border-round"

export interface ActionBarButtonProps {
  type?: ActionBarButtonType
  text?: string
  style?: CSSProperties | any
  className?: string
  index?: number
  onClick?: (event: ITouchEvent) => void
  disabled?: boolean
  loading?: boolean | LoadingProps
  icon?: ReactText | ReactElement
  children?: ReactText | ReactElement
  shape?: ActionBarSquare
}

export interface ActionBarIconButtonProps {
  icon?: ReactText | ReactElement
  text?: string
  badge?: string | number
  onClick?: (e: ITouchEvent) => void
  style?: CSSProperties | any
  className?: string
  children: ReactElement | ReactElement[]
}

export interface ActionBarButtonGroupProps {
  flex?: number
  children?: ReactElement | ReactElement[]
  shape?: ActionBarSquare
}

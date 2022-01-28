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
}

export interface ActionBarIconButtonProps {
  icon?: ReactText | ReactElement
  text?: string
  badge?: string | number
  onClick?: (e: ITouchEvent) => void
  style?: CSSProperties | any
  className?: string
}

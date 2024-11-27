import { CSSProperties, ReactNode } from "react"
import { Events } from "@tarojs/taro"
import { PopupBackdropProps } from "../popup"

export type ToastType = "text" | "loading" | "success" | "fail" | "html"

export type ToastPosition = "top" | "middle" | "bottom"

export interface ToastOptions {
  selector?: string
  className?: string
  style?: CSSProperties
  backdrop?: boolean | Omit<PopupBackdropProps, "open">
  type?: ToastType
  position?: ToastPosition
  icon?: ReactNode
  duration?: number
  message?: ReactNode

  onClose?(opened: boolean): void
  onTransitionExited?(): void
}

export type ToastThemeVars = {
  toastWidth?: string
  toastMinHeight?: string
  toastMaxWidth?: string
  toastPadding?: string
  toastFontSize?: string
  toastLineHeight?: string
  toastColor?: string
  toastBackgroundColor?: string
  toastBorderRadius?: string
  toastTransitionDuration?: string
  toastIconFontSize?: string
  toastIconColor?: string
  toastLoadingPadding?: string
  toastLoadingColor?: string
  toastTextMinWidth?: string
  toastTextPadding?: string
  toastPositionDistance?: string
  toastPositionTopDistance?: string
  toastPositionBottomDistance?: string
}

export const toastEvents = new Events()

export const toastSelectorSet = new Set<string>()

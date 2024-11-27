import { Events } from "@tarojs/taro"
import { CSSProperties, ReactNode } from "react"

export type NotifyColor = "primary" | "success" | "warning" | "danger"

export interface NotifyOptions {
  selector?: string
  className?: string
  style?: CSSProperties
  type?: NotifyColor
  color?: string
  background?: string
  duration?: number
  message?: ReactNode

  onClose?(opened: boolean): void
  onTransitionExited?(): void
}

export type NotifyThemeVars = {
  notifyColor?: string
  notifyPadding?: string
  notifyFontSize?: string
  notifyLineHeight?: string
  notifyPrimaryBackgroundColor?: string
  notifySuccessBackgroundColor?: string
  notifyWarningBackgroundColor?: string
  notifyDangerBackgroundColor?: string
}

export const notifyEvents = new Events()

export const notifySelectorSet = new Set<string>()

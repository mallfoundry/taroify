import { CSSProperties, ReactNode } from "react"
import { Events } from "@tarojs/taro"
import { PopupBackdropProps } from "../popup"
import { ButtonProps } from "../button"

export type DialogActionsTheme = "round"
export type DialogActionsVariant = "rounded"

export type DialogMessageAlign = "left" | "center" | "right"

export interface DialogOptions {
  selector?: string
  className?: string
  style?: CSSProperties
  backdrop?: boolean | Omit<PopupBackdropProps, "open">
  title?: ReactNode
  message?: ReactNode
  messageAlign?: DialogMessageAlign
  confirm?: ReactNode | ButtonProps
  cancel?: ReactNode | ButtonProps
  theme?: DialogActionsVariant

  onConfirm?(): void

  onCancel?(): void

  onBeforeClose?(action: "confirm" | "cancel"): boolean | Promise<boolean>
  onClose?(opened: boolean): void
  onTransitionExited?(): void
}

export type DialogThemeVars = {
  dialogWidth?: string
  dialogSmallScreenWidth?: string
  dialogFontSize?: string
  dialogTransition?: string
  dialogBorderRadius?: string
  dialogBackgroundColor?: string
  dialogHeaderFontWeight?: string
  dialogHeaderLineHeight?: string
  dialogHeaderPaddingTop?: string
  dialogHeaderIsolatedPadding?: string
  dialogMessagePadding?: string
  dialogMessageFontSize?: string
  dialogMessageLineHeight?: string
  dialogMessageMaxHeight?: string
  dialogHasTitleMessageColor?: string
  dialogHasTitleMessagePaddingTop?: string
  dialogButtonHeight?: string
  dialogConfirmButtonColor?: string
  dialogFooterRoundedPadding?: string
  dialogRoundedButtonActiveColor?: string
  dialogRoundedButtonFontSize?: string
  dialogRoundedButtonHeight?: string
  dialogRoundedButtonBorderRadius?: string
  dialogRoundedConfirmButtonBackgroundColor?: string
  dialogRoundedCancelButtonBackgroundColor?: string
}

export const dialogEvents = new Events()

export const dialogSelectorSet = new Set<string>()

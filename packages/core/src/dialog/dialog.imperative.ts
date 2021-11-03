import { Events } from "@tarojs/taro"
import * as _ from "lodash"
import { CSSProperties, ReactNode, useEffect } from "react"
import { ButtonProps } from "../button"
import { PopupBackdropProps } from "../popup"

const dialogEvents = new Events()

export function useDialogOpen(cb: (options: DialogOptions) => void) {
  useEffect(() => {
    dialogEvents.on("open", cb)
    return () => {
      dialogEvents.off("open", cb)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

type DialogMessageAlign = "left" | "center" | "right"

export interface DialogOptions {
  selector?: string
  className?: string
  style?: CSSProperties
  backdrop?: boolean | Omit<PopupBackdropProps, "open">
  duration?: number
  title?: ReactNode
  message?: ReactNode
  messageAlign?: DialogMessageAlign
  confirm?: ReactNode | ButtonProps
  cancel?: ReactNode | ButtonProps

  onConfirm?(): void

  onCancel?(): void
}

function parseDialogOptions(message: string | DialogOptions): DialogOptions {
  if (_.isPlainObject(message)) {
    return message as DialogOptions
  }
  return { message }
}

export function openDialog(args: string | DialogOptions) {
  const { selector = "#dialog", ...restOptions } = parseDialogOptions(args)
  dialogEvents.trigger("open", {
    selector,
    ...restOptions,
  })
}

export function confirmDialog(args: string | DialogOptions) {
  const { cancel = "取消", confirm = "确定", ...restOptions } = parseDialogOptions(args)
  return openDialog({
    confirm,
    cancel,
    ...restOptions,
  })
}

export function alertDialog(args: string | Omit<DialogOptions, "confirm">) {
  const { confirm = "确定", ...restOptions } = parseDialogOptions(args)
  return openDialog({
    confirm,
    ...restOptions,
  })
}

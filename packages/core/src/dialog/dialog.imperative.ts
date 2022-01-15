import { Events } from "@tarojs/taro"
import * as _ from "lodash"
import { CSSProperties, isValidElement, ReactNode, useEffect } from "react"
import { ButtonProps } from "../button"
import { PopupBackdropProps } from "../popup"

const initialDialogOptions: DialogOptions = {
  className: undefined,
  style: undefined,
  backdrop: undefined,
  duration: undefined,
  message: undefined,
  title: undefined,
  messageAlign: undefined,
  confirm: undefined,
  cancel: undefined,
}

const DEFAULT_DIALOG_SELECTOR = "#dialog"

const defaultDialogOptions: DialogOptions = {}

// First, Once
resetDefaultDialogOptions()

export function setDefaultDialogOptions(options: DialogOptions) {
  _.assign(defaultDialogOptions, options)
}

export function resetDefaultDialogOptions() {
  _.assign(defaultDialogOptions, {
    selector: DEFAULT_DIALOG_SELECTOR,
  })
}

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

export function useDialogCancel(cb: (selector: string) => void) {
  useEffect(() => {
    dialogEvents.on("cancel", cb)
    return () => {
      dialogEvents.off("cancel", cb)
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

  onClose?(opened: boolean): void
}

function parseDialogOptions(message: ReactNode | DialogOptions): DialogOptions {
  const options = !isValidElement(message) && _.isPlainObject(message) ? message : { message }
  return _.assign({}, initialDialogOptions, defaultDialogOptions, options)
}

export function openDialog(args: ReactNode | DialogOptions) {
  const { selector = "#dialog", ...restOptions } = parseDialogOptions(args)
  dialogEvents.trigger("open", {
    selector,
    ...restOptions,
  })
}

export function confirmDialog(args: ReactNode | DialogOptions) {
  const { cancel = "取消", confirm = "确定", ...restOptions } = parseDialogOptions(args)
  return openDialog({
    confirm,
    cancel,
    ...restOptions,
  })
}

export function alertDialog(args: ReactNode | Omit<DialogOptions, "confirm">) {
  const { confirm = "确定", ...restOptions } = parseDialogOptions(args)
  return openDialog({
    confirm,
    ...restOptions,
  })
}

export function cancelDialog(selector?: string) {
  dialogEvents.trigger("cancel", selector ?? defaultDialogOptions.selector)
}

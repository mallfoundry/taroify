import * as _ from "lodash"
import { createElement, isValidElement, type ReactNode } from "react"
import { document, type TaroNode } from "@tarojs/runtime"
import { mountPortal, unmountPortal, getPagePath } from "../utils/dom/portal"
import { dialogEvents, dialogSelectorSet, type DialogOptions } from "./dialog.shared"
import Dialog from "./dialog"

const initialDialogOptions: DialogOptions = {
  className: undefined,
  style: undefined,
  backdrop: undefined,
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

function parseDialogOptions(message: ReactNode | DialogOptions): DialogOptions {
  const options = !isValidElement(message) && _.isPlainObject(message) ? message : { message }
  return _.assign({}, initialDialogOptions, defaultDialogOptions, options)
}

const dialogView = document.createElement("view")

export function openDialog(args: ReactNode | DialogOptions) {
  const { selector = "#dialog", ...restOptions } = parseDialogOptions(args)
  if (selector && dialogSelectorSet.has(`${getPagePath()}__${selector}`)) {
    dialogEvents.trigger("open", {
      selector,
      ...restOptions,
    })
  } else {
    const onTransitionExited = restOptions.onTransitionExited
    restOptions.onTransitionExited = () => {
      onTransitionExited?.()
      unmountPortal(dialogView)
    }
    mountPortal(
      createElement(Dialog, { ...restOptions, defaultOpen: true }) as unknown as TaroNode,
      dialogView,
    )
  }
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

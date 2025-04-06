import type { ReactNode } from "react"
import Popup from "../popup"
import ToastComponent, { type ToastProps } from "./toast"
import {
  closeToast,
  createToast,
  openToast,
  resetDefaultToastOptions,
  setDefaultToastOptions,
  allowMultiple,
} from "./toast.imperative"
import type { ToastOptions } from "./toast.shared"
export type { ToastType, ToastPosition, ToastThemeVars, ToastOptions } from "./toast.shared"

interface ToastInterface {
  (props: ToastProps): JSX.Element

  Backdrop: typeof Popup.Backdrop

  open: typeof openToast

  loading(option: ReactNode | Omit<ToastOptions, "type">): string | undefined

  success(option: ReactNode | Omit<ToastOptions, "type">): string | undefined

  fail(option: ReactNode | Omit<ToastOptions, "type">): string | undefined

  close: typeof closeToast

  setDefaultOptions: typeof setDefaultToastOptions

  resetDefaultOptions: typeof resetDefaultToastOptions

  allowMultiple: typeof allowMultiple
}

const Toast = ToastComponent as ToastInterface
Toast.Backdrop = Popup.Backdrop
Toast.open = openToast
Toast.loading = createToast("loading")
Toast.success = createToast("success")
Toast.fail = createToast("fail")
Toast.close = closeToast
Toast.setDefaultOptions = setDefaultToastOptions
Toast.resetDefaultOptions = resetDefaultToastOptions
Toast.allowMultiple = allowMultiple

export default Toast

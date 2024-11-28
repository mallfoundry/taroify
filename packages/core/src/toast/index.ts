import { ReactNode } from "react"
import Popup from "../popup"
import ToastComponent, { ToastProps } from "./toast"
import {
  closeToast,
  createToast,
  openToast,
  resetDefaultToastOptions,
  setDefaultToastOptions,
} from "./toast.imperative"
import { ToastOptions } from "./toast.shared"
export type { ToastType, ToastPosition, ToastThemeVars, ToastOptions } from "./toast.shared"

interface ToastInterface {
  (props: ToastProps): JSX.Element

  Backdrop: typeof Popup.Backdrop

  open: typeof openToast

  loading(option: ReactNode | Omit<ToastOptions, "type">): void

  success(option: ReactNode | Omit<ToastOptions, "type">): void

  fail(option: ReactNode | Omit<ToastOptions, "type">): void

  close: typeof closeToast

  setDefaultOptions: typeof setDefaultToastOptions

  resetDefaultOptions: typeof resetDefaultToastOptions
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

export default Toast

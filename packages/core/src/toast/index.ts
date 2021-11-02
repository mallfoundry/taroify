import { ReactNode } from "react"
import Popup from "../popup"
import ToastComponent, { ToastProps } from "./toast"
import { createToast, openToast, ToastOptions } from "./toast.imperative"

export type { ToastOptions } from "./toast.imperative"

export type { ToastType, ToastPosition } from "./toast.shared"

interface ToastInterface {
  (props: ToastProps): JSX.Element

  Backdrop: typeof Popup.Backdrop

  open(option: ReactNode | Omit<ToastOptions, "type">): void

  loading(option: ReactNode | Omit<ToastOptions, "type">): void

  success(option: ReactNode | Omit<ToastOptions, "type">): void

  fail(option: ReactNode | Omit<ToastOptions, "type">): void

  close(): void
}

const Toast = ToastComponent as ToastInterface
Toast.Backdrop = Popup.Backdrop
Toast.open = openToast
Toast.loading = createToast("loading")
Toast.success = createToast("success")
Toast.fail = createToast("fail")

export default Toast

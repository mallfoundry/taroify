import { Events } from "@tarojs/taro"
import * as _ from "lodash"
import { CSSProperties, isValidElement, ReactNode, useEffect } from "react"
import { PopupBackdropProps } from "../popup"
import { ToastPosition, ToastType } from "./toast.shared"

const initialToastOptions: ToastOptions = {
  className: undefined,
  style: undefined,
  backdrop: undefined,
  type: undefined,
  position: undefined,
  icon: undefined,
  duration: undefined,
  message: undefined,
}

const DEFAULT_TOAST_SELECTOR = "#toast"

const defaultToastOptions: ToastOptions = {}

// First, Once
resetDefaultToastOptions()

export function setDefaultToastOptions(options: ToastOptions) {
  _.assign(defaultToastOptions, options)
}

export function resetDefaultToastOptions() {
  _.assign(defaultToastOptions, {
    selector: DEFAULT_TOAST_SELECTOR,
  })
}

const toastEvents = new Events()

export function useToastOpen(cb: (options: ToastOptions) => void) {
  useEffect(() => {
    toastEvents.on("open", cb)
    return () => {
      toastEvents.off("open", cb)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export function useToastClose(cb: (selector: string) => void) {
  useEffect(() => {
    toastEvents.on("close", cb)
    return () => {
      toastEvents.off("close", cb)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

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
}

function parseToastOptions(message: ReactNode | ToastOptions): ToastOptions {
  const options = !isValidElement(message) && _.isPlainObject(message) ? message : { message }
  return _.assign({}, initialToastOptions, defaultToastOptions, options)
}

export function openToast(args: ReactNode | ToastOptions) {
  const { selector, ...restOptions } = parseToastOptions(args)
  toastEvents.trigger("open", {
    selector,
    ...restOptions,
  })
}

export function createToast(type: ToastType) {
  return (args: string | Omit<ToastOptions, "type">) => {
    const options = parseToastOptions(args)
    options.type = type
    openToast(options)
  }
}

export function closeToast(selector?: string) {
  toastEvents.trigger("close", selector ?? defaultToastOptions.selector)
}

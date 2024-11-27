import * as _ from "lodash"
import { createElement, isValidElement, ReactNode } from "react"
import { document, TaroNode } from "@tarojs/runtime"
import { mountPortal, unmountPortal, getPagePath } from "../utils/dom/portal"
import { ToastOptions, ToastType, toastEvents, toastSelectorSet } from "./toast.shared"
import Toast from "./toast"

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

function parseToastOptions(message: ReactNode | ToastOptions): ToastOptions {
  const options = !isValidElement(message) && _.isPlainObject(message) ? message : { message }
  return _.assign({}, initialToastOptions, defaultToastOptions, options)
}

const toastView = document.createElement("view")
toastEvents.on("close-by-function", () => {
  unmountPortal(toastView)
})

export function openToast(args: ReactNode | ToastOptions) {
  const { selector, ...restOptions } = parseToastOptions(args)
  if (selector && toastSelectorSet.has(`${getPagePath()}__${selector}`)) {
    toastEvents.trigger("open", {
      selector,
      ...restOptions,
    })
  } else {
    const onTransitionExited = restOptions.onTransitionExited
    restOptions.onTransitionExited = () => {
      onTransitionExited?.()
      unmountPortal(toastView)
    }
    mountPortal(
      createElement(Toast, { ...restOptions, children: restOptions.message, defaultOpen: true }) as unknown as TaroNode,
      toastView
    )
  }
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

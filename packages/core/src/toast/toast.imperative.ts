import * as _ from "lodash"
import { createElement, isValidElement, type ReactNode } from "react"
import { document, type TaroNode } from "@tarojs/runtime"
import { mountPortal, unmountPortal, getPagePath } from "../utils/dom/portal"
import { type ToastOptions, type ToastType, toastEvents, toastSelectorSet } from "./toast.shared"
import Toast from "./toast"

let _isMultipleAllowed = false

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
const DEFAULT_TOAST_SELECTOR_CREATE = "toast"

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

// Set whether multiple toasts are allowed
export function allowMultiple(allow: boolean) {
  _isMultipleAllowed = allow
}

export function openToast(args: ReactNode | ToastOptions) {
  const { selector, ...restOptions } = parseToastOptions(args)

  // Check if a toast with this selector already exists
  const hasExistingToast = selector && toastSelectorSet.has(`${getPagePath()}__${selector}`)

  // If multiple toasts are allowed, or no existing toast with this selector
  if ((_isMultipleAllowed && !hasExistingToast) || (!_isMultipleAllowed && !hasExistingToast)) {
    // Create a new toast view for each instance if multiple are allowed
    const toastView = document.createElement("view")
    const onTransitionExited = restOptions.onTransitionExited
    restOptions.onTransitionExited = () => {
      onTransitionExited?.()
      unmountPortal(toastView)
    }

    const selectorId =
      selector === DEFAULT_TOAST_SELECTOR ? DEFAULT_TOAST_SELECTOR_CREATE : selector

    // If multiple toasts are allowed, append a unique identifier to ensure uniqueness
    const uniqueId = _isMultipleAllowed ? `${selectorId}-${Date.now()}` : selectorId

    mountPortal(
      createElement(Toast, {
        ...restOptions,
        children: restOptions.message,
        defaultOpen: true,
        id: uniqueId,
      }) as unknown as TaroNode,
      toastView,
    )

    // Return the uniqueId so it can be used to close this specific toast
    return uniqueId
  }

  // Update existing toast
  toastEvents.trigger("open", {
    selector,
    ...restOptions,
  })
  // Return the selector for the existing toast
  return selector
}

export function createToast(type: ToastType) {
  return (args: string | Omit<ToastOptions, "type">) => {
    const options = parseToastOptions(args)
    options.type = type
    return openToast(options)
  }
}

export function closeToast(selector?: string) {
  if (selector) {
    // 处理传入的是实例 ID 的情况，转换为选择器格式
    const selectorWithPrefix = selector.startsWith("#") ? selector : `#${selector}`
    toastEvents.trigger("close", selectorWithPrefix)
  } else {
    // 未传参数时关闭默认 Toast
    toastEvents.trigger("close", defaultToastOptions.selector)
  }
}

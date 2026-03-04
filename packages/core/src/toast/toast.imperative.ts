import * as _ from "lodash"
import { createElement, isValidElement, type ReactNode } from "react"
import { document, type TaroNode } from "@tarojs/runtime"
import { mountPortal, unmountPortal, getPagePath } from "../utils/dom/portal"
import {
  type ToastOptions,
  type ToastType,
  toastEvents,
  toastSelectorSet,
  pendingToastSelectorSet,
} from "./toast.shared"
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

  const pageSelector = selector ? `${getPagePath()}__${selector}` : undefined

  // Check both the mounted set and the pending (pre-useEffect) set.
  // pendingToastSelectorSet covers the async gap between mountPortal and useEffect,
  // preventing duplicate toasts on rapid successive calls.
  const hasExistingToast =
    pageSelector &&
    (toastSelectorSet.has(pageSelector) || pendingToastSelectorSet.has(pageSelector))

  // In single mode: only create when no existing toast
  // In multiple mode: always create a new instance
  if (_isMultipleAllowed || !hasExistingToast) {
    const toastView = document.createElement("view")
    const onTransitionExited = restOptions.onTransitionExited
    restOptions.onTransitionExited = () => {
      onTransitionExited?.()
      unmountPortal(toastView)
      // Also clean up pending set here as a safety net
      // (primary cleanup happens in toast.tsx useEffect on unmount)
      if (pageSelector) pendingToastSelectorSet.delete(pageSelector)
    }

    const selectorId =
      selector === DEFAULT_TOAST_SELECTOR ? DEFAULT_TOAST_SELECTOR_CREATE : selector

    // If multiple toasts are allowed, append a unique identifier to ensure uniqueness
    const uniqueId = _isMultipleAllowed ? `${selectorId}-${Date.now()}` : selectorId

    // Register synchronously before mountPortal to prevent race conditions
    // where rapid successive calls see an empty toastSelectorSet before useEffect fires
    if (!_isMultipleAllowed && pageSelector) {
      pendingToastSelectorSet.add(pageSelector)
    }

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

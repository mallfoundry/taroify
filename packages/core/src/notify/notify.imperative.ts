import * as _ from "lodash"
import { createElement, isValidElement, type ReactNode } from "react"
import { document, type TaroNode } from "@tarojs/runtime"
import { mountPortal, unmountPortal, getPagePath } from "../utils/dom/portal"
import {
  type NotifyColor,
  type NotifyOptions,
  notifyEvents,
  notifySelectorSet,
} from "./notify.shared"
import Notify from "./notify"

const initialNotifyOptions: NotifyOptions = {
  className: undefined,
  style: undefined,
  duration: undefined,
  message: undefined,
  color: undefined,
}

const DEFAULT_NOTIFY_SELECTOR = "#notify"
const DEFAULT_NOTIFY_SELECTOR_CREATE = "notify"

const defaultNotifyOptions: NotifyOptions = {}

// First, Once
resetDefaultNotifyOptions()

export function setDefaultNotifyOptions(options: NotifyOptions) {
  _.assign(defaultNotifyOptions, options)
}

export function resetDefaultNotifyOptions() {
  _.assign(defaultNotifyOptions, {
    selector: DEFAULT_NOTIFY_SELECTOR,
  })
}

function parseNotifyOptions(message: ReactNode | NotifyOptions): NotifyOptions {
  const options = !isValidElement(message) && _.isPlainObject(message) ? message : { message }
  return _.assign({}, initialNotifyOptions, defaultNotifyOptions, options)
}

const notifyView = document.createElement("view")

export function openNotify(args: ReactNode | NotifyOptions) {
  const { selector = "#notify", ...restOptions } = parseNotifyOptions(args)
  if (selector && notifySelectorSet.has(`${getPagePath()}__${selector}`)) {
    notifyEvents.trigger("open", {
      selector,
      ...restOptions,
    })
  } else {
    const onTransitionExited = restOptions.onTransitionExited
    restOptions.onTransitionExited = () => {
      onTransitionExited?.()
      unmountPortal(notifyView)
    }
    mountPortal(
      createElement(Notify, {
        ...restOptions,
        children: restOptions.message,
        defaultOpen: true,
        id: selector === DEFAULT_NOTIFY_SELECTOR ? DEFAULT_NOTIFY_SELECTOR_CREATE : selector,
      }) as unknown as TaroNode,
      notifyView,
    )
  }
}

export function createNotify(color: NotifyColor) {
  return (args: string | Omit<NotifyOptions, "color">) => {
    const options = parseNotifyOptions(args)
    options.color = color
    openNotify(options)
  }
}

export function closeNotify(selector?: string) {
  notifyEvents.trigger("close", selector ? `#${selector}` : defaultNotifyOptions.selector)
}

import { Events } from "@tarojs/taro"
import * as _ from "lodash"
import { CSSProperties, isValidElement, ReactNode, useEffect } from "react"
import { NotifyColor } from "./notify.shared"

const initialNotifyOptions: NotifyOptions = {
  className: undefined,
  style: undefined,
  duration: undefined,
  message: undefined,
  color: undefined,
}

const DEFAULT_NOTIFY_SELECTOR = "#notify"

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

const notifyEvents = new Events()

export function useNotifyOpen(cb: (options: NotifyOptions) => void) {
  useEffect(() => {
    notifyEvents.on("open", cb)
    return () => {
      notifyEvents.off("open", cb)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export function useNotifyClose(cb: (selector: string) => void) {
  useEffect(() => {
    notifyEvents.on("close", cb)
    return () => {
      notifyEvents.off("close", cb)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export interface NotifyOptions {
  selector?: string
  className?: string
  style?: CSSProperties
  color?: NotifyColor
  duration?: number
  message?: ReactNode

  onClose?(opened: boolean): void
}

function parseNotifyOptions(message: ReactNode | NotifyOptions): NotifyOptions {
  const options = !isValidElement(message) && _.isPlainObject(message) ? message : { message }
  return _.assign({}, initialNotifyOptions, defaultNotifyOptions, options)
}

export function openNotify(args: ReactNode | NotifyOptions) {
  const { selector = "#notify", ...restOptions } = parseNotifyOptions(args)
  notifyEvents.trigger("open", {
    selector,
    ...restOptions,
  })
}

export function createNotify(color: NotifyColor) {
  return (args: string | Omit<NotifyOptions, "color">) => {
    const options = parseNotifyOptions(args)
    options.color = color
    openNotify(options)
  }
}

export function closeNotify(selector?: string) {
  notifyEvents.trigger("close", selector ?? defaultNotifyOptions.selector)
}

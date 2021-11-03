import { Events } from "@tarojs/taro"
import * as _ from "lodash"
import { CSSProperties, ReactNode, useEffect } from "react"
import { NotifyColor } from "./notify.shared"

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

export interface NotifyOptions {
  selector?: string
  className?: string
  style?: CSSProperties
  color?: NotifyColor
  duration?: number
  message?: ReactNode

  onClose?(opened: boolean): void
}

function parseNotifyOptions(message: string | NotifyOptions): NotifyOptions {
  if (_.isPlainObject(message)) {
    return message as NotifyOptions
  }
  return { message }
}

export function openNotify(args: string | NotifyOptions) {
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

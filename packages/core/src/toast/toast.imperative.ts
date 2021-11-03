import { Events } from "@tarojs/taro"
import * as _ from "lodash"
import { CSSProperties, ReactNode, useEffect } from "react"
import { PopupBackdropProps } from "../popup"
import { ToastPosition, ToastType } from "./toast.shared"

const events = new Events()

export function useToastOpen(cb: (options: ToastOptions) => void) {
  useEffect(() => {
    events.on("open", cb)
    return () => {
      events.off("open", cb)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

// export function useToastClose(cb: (options: ToastOptions) => void) {
//   useEffect(() => {
//     events.on("close", cb)
//     return () => {
//       events.off("close", cb)
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])
// }

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

function parseOptions(message: string | ToastOptions): ToastOptions {
  if (_.isPlainObject(message)) {
    return message as ToastOptions
  }
  return { message }
}

export function openToast(args: string | ToastOptions) {
  const { selector = "#toast", ...restOptions } = parseOptions(args)
  events.trigger("open", {
    selector,
    ...restOptions,
  })
}

// export function closeAllToast() {
//   events.trigger("close")
// }

export function createToast(type: ToastType) {
  return (args: string | Omit<ToastOptions, "type">) => {
    const options = parseOptions(args)
    options.type = type
    openToast(options)
  }
}

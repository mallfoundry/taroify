import { CommonEvent } from "@tarojs/components"
import { inBrowser } from "../base"

export function stopPropagation(event: CommonEvent) {
  event.stopPropagation()
}

export function preventDefault(event: CommonEvent, isStopPropagation?: boolean) {
  if (inBrowser) {
    if (event.preventDefault && ((event as unknown) as TouchEvent).cancelable) {
      event.preventDefault()
    }
  } else {
    event.preventDefault()
  }

  if (isStopPropagation) {
    stopPropagation(event)
  }
}

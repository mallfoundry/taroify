import { CommonEvent } from "@tarojs/components"

export function stopPropagation(event: CommonEvent) {
  event.stopPropagation()
}

export function preventDefault(event: CommonEvent, isStopPropagation?: boolean) {
  event.preventDefault()
  if (isStopPropagation) {
    stopPropagation(event)
  }
}

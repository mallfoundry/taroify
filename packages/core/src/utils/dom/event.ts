import { CommonEvent, ITouchEvent } from "@tarojs/components"
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

interface ClientCoordinates {
  clientX: number
  clientY: number
}

export function getClientCoordinates(event: ITouchEvent | MouseEvent): ClientCoordinates {
  // @ts-ignore
  const { clientX, clientY, touches } = event

  if (clientX && clientY) {
    return {
      clientX,
      clientY,
    }
  }
  return touches[0]
}

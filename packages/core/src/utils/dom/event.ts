import { CommonEvent, ITouchEvent } from "@tarojs/components"
import { inBrowser } from "../base"

export function stopPropagation(event: CommonEvent) {
  event.stopPropagation()
}

export function preventDefault(event: CommonEvent, isStopPropagation?: boolean) {
  if (inBrowser) {
    // @ts-ignore
    if (typeof event.cancelable !== "boolean" || event.cancelable) {
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
    /** 支付宝点击 */
  const { clientX: touchMoveClientX, clientY:  touchMoveClientY, touches: moveTouches } = event.detail || {}

  if (touchMoveClientX && touchMoveClientY) {
    return {
      clientX: touchMoveClientX,
      clientY: touchMoveClientY,
    }
  }

  return touches?.[0] || moveTouches?.[0]
}

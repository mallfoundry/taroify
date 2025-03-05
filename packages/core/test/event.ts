import { fireEvent } from "@testing-library/react"

export function touchEvent(el: Element | Node | Document | Window, clientX = 0, clientY = 0) {
  fireEvent.touchStart(el, { touches: [{ clientX: 0, clientY: 0 }] })
  fireEvent.touchMove(el, { touches: [{ clientX, clientY }] })
  fireEvent.touchEnd(el)
}

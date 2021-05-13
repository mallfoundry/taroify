import { MutableRefObject } from "react"

export interface BoundingClientRect {
  bottom: number
  dataset: Record<string, any>
  height: number
  id: string
  left: number
  right: number
  top: number
  width: number
}

function makeBoundingClientRect(width: number, height: number) {
  return {
    top: 0,
    left: 0,
    right: width,
    bottom: height,
    width,
    height,
  } as BoundingClientRect
}

function unref(elementOrRef: any): Element {
  const ref = elementOrRef as MutableRefObject<Element | Window | undefined>
  return ref?.current as Element
}

export function getBoundingClientRect(elementOrRef: any): BoundingClientRect {
  const element = unref(elementOrRef)
  if (element && element.getBoundingClientRect) {
    return (element.getBoundingClientRect() as unknown) as BoundingClientRect
  }

  return makeBoundingClientRect(0, 0)
}

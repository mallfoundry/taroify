import { createSelectorQuery } from "@tarojs/taro"
import { inBrowser } from "./base"
import { elementUnref, isWindow } from "./dom/element"

export interface BoundingClientRect {
  dataset: Record<string, any>
  id: string
  top: number
  right: number
  bottom: number
  left: number
  width: number
  height: number
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

export function getBoundingClientRect(elementOrRef: any): Promise<BoundingClientRect> {
  const element = elementUnref(elementOrRef)
  if (element) {
    if (inBrowser) {
      if (isWindow(element)) {
        const width = element.innerWidth
        const height = element.innerHeight
        return Promise.resolve(makeBoundingClientRect(width, height))
      }

      return Promise.resolve((element.getBoundingClientRect() as unknown) as BoundingClientRect)
    } else {
      return new Promise<BoundingClientRect>((resolve) => {
        createSelectorQuery()
          .select("#" + element.uid)
          .boundingClientRect(resolve)
          .exec()
      })
    }
  }
  return Promise.resolve(makeBoundingClientRect(0, 0))
}

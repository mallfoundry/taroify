import { createSelectorQuery } from "@tarojs/taro"
import { MutableRefObject } from "react"
import { inBrowser } from "./base"

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

interface TaroElement extends Element {
  uid: string
}

function unref(elementOrRef: any): TaroElement {
  const ref = elementOrRef as MutableRefObject<TaroElement | undefined>
  return ref?.current as TaroElement
}

export function getBoundingClientRect(elementOrRef: any): Promise<BoundingClientRect> {
  const element = unref(elementOrRef)
  if (element) {
    if (inBrowser) {
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

// export function useBoundingClientRect(elementOrRef: any): BoundingClientRect {
//   const [rect, setRect] = useState<BoundingClientRect>(makeBoundingClientRect(0, 0))
//   useReady(() => setRect(getBoundingClientRect(elementOrRef)))
//   return rect
// }

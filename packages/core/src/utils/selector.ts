import { createSelectorQuery } from "@tarojs/taro"

interface BoundingClientRect {
  bottom: number
  dataset: Record<string, any>
  height: number
  id: string
  left: number
  right: number
  top: number
  width: number
}

export function selectRect(selector: string) {
  return new Promise<BoundingClientRect>((resolve) => {
    createSelectorQuery()
      .select(selector)
      // @ts-ignore
      .boundingClientRect(resolve)
      .exec()
  })
}

export function selectAllRect(selector: string) {
  return new Promise<BoundingClientRect[]>((resolve) => {
    createSelectorQuery()
      .selectAll(selector)
      // @ts-ignore
      .boundingClientRect(resolve)
      .exec()
  })
}

import { useReady } from "@tarojs/taro"
import { useState } from "react"
import { getRect } from "../utils/dom/rect"

export default function useHeight(elementOrRef: any) {
  const [height, setHeight] = useState<number>()
  useReady(() =>
    getRect(elementOrRef)
      .then(({ height }) => height)
      .then(setHeight),
  )
  return height
}

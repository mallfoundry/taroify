import { useReady } from "@tarojs/taro"
import { useState } from "react"
import { getBoundingClientRect } from "../utils/rect"

export default function useHeight(elementOrRef: any) {
  const [height, setHeight] = useState<number>()
  useReady(() =>
    getBoundingClientRect(elementOrRef)
      .then(({ height }) => height)
      .then(setHeight),
  )
  return height
}

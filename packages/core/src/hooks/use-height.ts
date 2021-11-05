import { nextTick } from "@tarojs/taro"
import { useEffect, useState } from "react"
import { getRect } from "../utils/dom/rect"

export default function useHeight(elementOrRef: any) {
  const [height, setHeight] = useState<number>(0)
  useEffect(
    () =>
      nextTick(() =>
        getRect(elementOrRef)
          .then(({ height }) => height)
          .then(setHeight),
      ),
    [elementOrRef],
  )
  return height
}

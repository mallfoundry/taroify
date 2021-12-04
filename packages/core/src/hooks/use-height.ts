import { useState } from "react"
import { getRect } from "../utils/dom/rect"
import useMounted from "./use-mounted"

export default function useHeight(elementOrRef: any) {
  const [height, setHeight] = useState<number>(0)
  useMounted(() =>
    getRect(elementOrRef)
      .then(({ height }) => height)
      .then(setHeight),
  )
  return height
}

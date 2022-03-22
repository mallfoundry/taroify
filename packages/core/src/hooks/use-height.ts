import { DependencyList, useState } from "react"
import { getRect } from "../utils/dom/rect"
import { useRenderedEffect } from "./index"

export default function useHeight(elementOrRef: any, deps?: DependencyList) {
  const [height, setHeight] = useState<number>(0)
  useRenderedEffect(() => {
    getRect(elementOrRef)
      .then((rect) => rect?.height)
      .then(setHeight)
  }, deps)
  return height
}

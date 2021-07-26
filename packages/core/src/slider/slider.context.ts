import { ITouchEvent } from "@tarojs/components"
import { createContext } from "react"

interface SliderContextValue {
  onTouchStart?(event: ITouchEvent, index?: number): void

  onTouchMove?(event: ITouchEvent, index?: number): void

  onTouchEnd?(event: ITouchEvent, index?: number): void
}

const SliderContext = createContext<SliderContextValue>({})

export default SliderContext

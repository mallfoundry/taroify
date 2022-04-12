import { createContext } from "react"
import { SwiperDirection } from "./swiper.shared"

export interface SwiperItemInstance {
  setOffset: (offset: number) => void
}

interface SwiperContextValue {
  direction?: SwiperDirection
  lazyRender?: boolean
  loop?: boolean
  getSize?: () => number
  indicator?: number
  count?: number
  itemInstances: SwiperItemInstance[]
}

const SwiperContext = createContext<SwiperContextValue>({
  itemInstances: [],
})
export default SwiperContext

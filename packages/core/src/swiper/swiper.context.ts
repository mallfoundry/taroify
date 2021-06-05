import { createContext } from "react"
import { SwiperDirection } from "./swiper.shared"

export type SwiperChildren = SwiperItemChild[]

export interface SwiperItemChild {
  setOffset: (offset: number) => void
}

interface SwiperContextValue {
  direction?: SwiperDirection
  size?: number
  children: SwiperChildren
}

const SwiperContext = createContext<SwiperContextValue>({
  children: [],
})
export default SwiperContext

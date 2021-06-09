import { createContext } from "react"
import { ComputedRef } from "../utils/computed"
import { SwiperDirection } from "./swiper.shared"

export type SwiperChildren = SwiperItemChild[]

export interface SwiperItemChild {
  setOffset: (offset: number) => void
}

interface SwiperContextValue {
  direction?: SwiperDirection
  activeIndicator?: ComputedRef<number>
  size?: ComputedRef<number>
  count?: number
  children: SwiperChildren
}

const SwiperContext = createContext<SwiperContextValue>({
  children: [],
})
export default SwiperContext

import { LegacyRef } from "react"
import { SwiperProps } from "./swiper"
import { SwiperItemProps } from "./swiper-item"
import { SwiperInstance, SwiperItemEvent } from "./swiper.shared"

export { SwiperDirection, SwiperInstance } from "./swiper.shared"

interface WithRefSwiperProps extends SwiperProps {
  ref?: LegacyRef<SwiperInstance | undefined>
}

declare function Swiper(props: WithRefSwiperProps): JSX.Element

declare namespace Swiper {
  export type ItemEvent = SwiperItemEvent

  export type ItemProps = SwiperItemProps

  export function Item(props: ItemProps): JSX.Element
}

export default Swiper

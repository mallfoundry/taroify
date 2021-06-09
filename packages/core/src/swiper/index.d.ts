import { LegacyRef } from "react"
import { SwiperProps } from "./swiper"
import { SwiperIndicatorProps } from "./swiper-indicator"
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

  export type IndicatorProps = SwiperIndicatorProps

  export function Item(props: ItemProps): JSX.Element

  export function Indicator(props: IndicatorProps): JSX.Element
}

export default Swiper

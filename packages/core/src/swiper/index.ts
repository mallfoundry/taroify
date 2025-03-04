import SwiperElement, { type SwiperProps } from "./swiper"
import SwiperIndicator, { type SwiperIndicatorProps } from "./swiper-indicator"
import SwiperItem, { type SwiperItemProps } from "./swiper-item"
import type { SwiperItemEvent } from "./swiper.shared"

export type { SwiperThemeVars } from "./swiper.shared"

interface SwiperInterface {
  (props: SwiperProps): JSX.Element

  Item: typeof SwiperItem
  Indicator: typeof SwiperIndicator
}

const Swiper = SwiperElement as unknown as SwiperInterface

Swiper.Item = SwiperItem
Swiper.Indicator = SwiperIndicator

namespace Swiper {
  export type ItemEvent = SwiperItemEvent

  export type ItemProps = SwiperItemProps

  export type IndicatorProps = SwiperIndicatorProps
}

export default Swiper

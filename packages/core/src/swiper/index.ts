import SwiperElement, { SwiperProps } from "./swiper"
import SwiperIndicator, { SwiperIndicatorProps } from "./swiper-indicator"
import SwiperItem, { SwiperItemProps } from "./swiper-item"
import { SwiperItemEvent } from "./swiper.shared"

interface SwiperInterface {
  (props: SwiperProps): JSX.Element

  Item: typeof SwiperItem
  Indicator: typeof SwiperIndicator
}

const Swiper = (SwiperElement as unknown) as SwiperInterface

Swiper.Item = SwiperItem
Swiper.Indicator = SwiperIndicator

// eslint-disable-next-line @typescript-eslint/no-redeclare
namespace Swiper {
  export type ItemEvent = SwiperItemEvent

  export type ItemProps = SwiperItemProps

  export type IndicatorProps = SwiperIndicatorProps
}

export default Swiper

import { Swiper as TaroSwiper, SwiperItem as TaroSwiperItem } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"

enum SwiperDirection {
  Horizontal = "horizontal",
  Vertical = "vertical",
}

type SwiperDirectionString = "horizontal" | "vertical"

interface SwiperProps {
  className?: string
  autoplay?: boolean
  duration?: number
  direction?: SwiperDirection | SwiperDirectionString
  children?: ReactNode
  onChange?: (event: Swiper.ItemEvent) => void
}

function Swiper(props: SwiperProps) {
  const { className, direction = SwiperDirection.Horizontal, children, onChange } = props

  return (
    <TaroSwiper
      className={classNames(prefixClassname("swiper"), className)}
      indicatorDots
      vertical={direction === SwiperDirection.Vertical}
      onChange={(e) => onChange?.({ index: e.detail.current })}
      children={children}
    />
  )
}

namespace Swiper {
  export enum IndicatorPosition {
    Top = "top",
    TopLeft = "top-left",
    TopRight = "top-right",
    Bottom = "bottom",
    BottomLeft = "bottom-left",
    BottomRight = "bottom-right",
  }

  interface IndicatorProps {
    position: IndicatorPosition
  }

  export function Indicator(props: IndicatorProps) {}

  export interface ItemEvent {
    index: number
  }

  interface ItemProps {
    className?: string
    children?: ReactNode
  }

  export function Item(props: ItemProps) {
    const { className, children } = props
    return (
      <TaroSwiperItem
        className={classNames(prefixClassname("swiper-item"), className)}
        children={children}
      />
    )
  }
}

export default Swiper

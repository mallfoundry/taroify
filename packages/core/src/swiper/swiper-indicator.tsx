import { View } from "@tarojs/components"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { ReactNode, useContext } from "react"
import { prefixClassname } from "../styles"
import SwiperContext from "./swiper.context"
import { SwiperDirection } from "./swiper.shared"

export interface SwiperIndicatorProps {
  className?: string
  children?: ReactNode
}

export default function SwiperIndicator(props: SwiperIndicatorProps) {
  const { activeIndicator, direction, count } = useContext(SwiperContext)

  function renderIndicator(index: number) {
    const active = index === activeIndicator?.value
    // const style = active
    //   ? {
    //     backgroundColor: props.indicatorColor,
    //   }
    //   : undefined;

    return (
      <View
        key={index}
        className={classNames(prefixClassname("swiper__indicator"), {
          [prefixClassname("swiper__indicator--active")]: active,
        })}
      />
    )
  }

  return (
    <View
      className={classNames(prefixClassname("swiper__indicators"), {
        [prefixClassname("swiper__indicators--vertical")]: direction === SwiperDirection.Vertical,
      })}
    >
      {_.range(0, count).map(renderIndicator)}
    </View>
  )
}

import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { ReactNode, useCallback, useContext, useMemo } from "react"
import { prefixClassname } from "../styles"
import SwiperContext from "./swiper.context"

export interface SwiperIndicatorProps extends ViewProps {
  className?: string
  children?: ReactNode
}

export default function SwiperIndicator(props: SwiperIndicatorProps) {
  const { className, children, ...restProps } = props
  const { indicator = 0, direction, count } = useContext(SwiperContext)

  const renderIndicator = useCallback(
    (index: number) => (
      <View
        key={index}
        className={classNames(prefixClassname("swiper__indicator"), {
          [prefixClassname("swiper__indicator--active")]: index === indicator,
        })}
      />
    ),
    [indicator],
  )

  const indicators = useMemo(() => !children && _.range(0, count).map(renderIndicator), [
    children,
    count,
    renderIndicator,
  ])

  return (
    <View
      className={classNames(
        {
          [prefixClassname("swiper__indicators")]: !children,
          [prefixClassname("swiper__indicators--vertical")]: !children && direction === "vertical",
        },
        className,
      )}
      children={children ?? indicators}
      {...restProps}
    />
  )
}

import { ITouchEvent, View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { prefixClassname } from "../styles"
import { stopPropagation } from "../utils/dom/event"

interface SliderThumbProps {
  index?: number

  onTouchStart?(event: ITouchEvent): void

  onTouchMove?(event: ITouchEvent): void

  onTouchEnd?(event: ITouchEvent): void
}

function SliderThumb(props: SliderThumbProps) {
  const { index, onTouchStart, onTouchMove, onTouchEnd } = props
  return (
    <View
      className={classNames({
        [prefixClassname("slider__button-wrapper")]: index === undefined,
        [prefixClassname("slider__button-wrapper-left")]: index === 0,
        [prefixClassname("slider__button-wrapper-right")]: index === 1,
      })}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchEnd}
      onClick={stopPropagation}
    >
      <View className={prefixClassname("slider__button")} />
    </View>
  )
}

export default SliderThumb

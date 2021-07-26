import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { CSSProperties, ReactNode, useContext } from "react"
import { prefixClassname } from "../styles"
import { stopPropagation } from "../utils/dom/event"
import { getSizeStyle } from "../utils/format/unit"
import SliderContext from "./slider.context"

export interface SliderThumbProps {
  style?: CSSProperties
  className?: string
  size?: number
  children?: ReactNode
}

export interface InternalSliderThumbProps extends SliderThumbProps {
  index?: number
}

function SliderThumb(props: SliderThumbProps) {
  const { style = {}, className, size, index, children } = props as InternalSliderThumbProps
  const { onTouchStart, onTouchMove, onTouchEnd } = useContext(SliderContext)

  return (
    <View
      className={classNames({
        [prefixClassname("slider__thumb-wrapper")]: index === undefined,
        [prefixClassname("slider__thumb-wrapper-left")]: index === 0,
        [prefixClassname("slider__thumb-wrapper-right")]: index === 1,
      })}
      style={{
        ...getSizeStyle(size),
      }}
      onTouchStart={(event) => onTouchStart?.(event, index)}
      onTouchMove={(event) => onTouchMove?.(event, index)}
      onTouchEnd={(event) => onTouchEnd?.(event, index)}
      onTouchCancel={(event) => onTouchEnd?.(event, index)}
      onClick={stopPropagation}
    >
      {
        //
        children ?? (
          <View className={classNames(prefixClassname("slider__thumb"), className)} style={style} />
        )
      }
    </View>
  )
}

export default SliderThumb

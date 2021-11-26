import { View } from "@tarojs/components"
import * as React from "react"
import { CSSProperties } from "react"
import { prefixClassname } from "../styles"
import { addUnitPx } from "../utils/format/unit"
import CircleCanvas from "./circle-canvas"
import { CircleProps, CircleStrokeLinecap } from "./circle.shared"

function getCircleSizeStyle(originSize?: string | number): CSSProperties | undefined {
  if (originSize !== undefined && originSize !== null) {
    const size = addUnitPx(originSize)
    return {
      width: size,
      height: size,
    }
  }
  return {}
}

function Circle(props: CircleProps) {
  const {
    speed = 100,
    clockwise = true,
    strokeWidth = 40,
    strokeLinecap = CircleStrokeLinecap.Round,
    size,
    children,
    ...restProps
  } = props
  return (
    <View className={prefixClassname("circle")} style={getCircleSizeStyle(size)}>
      <CircleCanvas
        speed={speed}
        clockwise={clockwise}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        size={size}
        {...restProps}
      />
      {children && <View className={prefixClassname("circle__text")} children={children} />}
    </View>
  )
}

export default Circle

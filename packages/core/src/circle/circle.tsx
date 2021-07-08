import { View } from "@tarojs/components"
import * as React from "react"
import { CSSProperties } from "react"
import { prefixClassname } from "../styles"
import { addUnitPx } from "../utils/format/unit"
import CircleCanvas from "./circle-canvas"
import { CircleProps } from "./circle.shared"

function getCircleSizeStyle(originSize?: string | number): CSSProperties | undefined {
  if (originSize !== undefined && originSize !== null) {
    const size = addUnitPx(originSize)
    return {
      width: size,
      height: size,
    }
  }
}

function Circle(props: CircleProps) {
  const { children, size, ...restProps } = props
  return (
    <View className={prefixClassname("circle")} style={getCircleSizeStyle(size)}>
      <CircleCanvas {...restProps} />
      {children && <View className={prefixClassname("circle__text")} children={children} />}
    </View>
  )
}

export default Circle

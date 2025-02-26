import { View } from "@tarojs/components"
import * as React from "react"
import { prefixClassname } from "../styles"
import { addUnitPx } from "../utils/format/unit"
import CircleCanvas from "./circle-canvas"
import type { CircleProps } from "./circle.shared"

function Circle({ size = 100, children, ...props }: CircleProps) {
  return (
    <View
      className={prefixClassname("circle")}
      style={{ width: addUnitPx(size), height: addUnitPx(size) }}
    >
      <CircleCanvas size={size} {...props} />
      {children && <View className={prefixClassname("circle__text")} children={children} />}
    </View>
  )
}

export default Circle

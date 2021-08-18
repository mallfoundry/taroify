import { View } from "@tarojs/components"
import * as React from "react"
import { prefixClassname } from "../styles"
import { addUnitPx } from "../utils/format/unit"
import { TabOffset } from "./nav-tabs"

interface TabsLineProps {
  offset?: TabOffset
  // transform?: string
  transitionDuration?: string
}

export default function TabsLine(props: TabsLineProps) {
  const { offset = {}, transitionDuration = "0.3s" } = props
  const { left: offsetLeft = 0, width: offsetWidth = 0 } = offset
  const __left__ = offsetLeft + offsetWidth / 2
  const transform = `translateX(${addUnitPx(__left__)}) translateX(-50%)`
  return (
    <View className={prefixClassname("tabs__line")} style={{ transform, transitionDuration }} />
  )
}

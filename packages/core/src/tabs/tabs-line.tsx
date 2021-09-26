import { View } from "@tarojs/components"
import * as React from "react"
import { prefixClassname } from "../styles"

interface TabsLineProps {
  transitionDuration?: string
}

export default function TabsLine(props: TabsLineProps) {
  const { transitionDuration = "0.3s" } = props
  
  return (
    <View className={prefixClassname("tabs__line")} style={{ transitionDuration }} />
  )
}

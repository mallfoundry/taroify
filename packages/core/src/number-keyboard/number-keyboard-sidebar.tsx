import { View } from "@tarojs/components"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"

interface NumberKeyboardSidebarProps {
  children?: ReactNode
}

function NumberKeyboardSidebar(props: NumberKeyboardSidebarProps) {
  const { children } = props
  return <View className={prefixClassname("number-keyboard__sidebar")} children={children} />
}

export default NumberKeyboardSidebar

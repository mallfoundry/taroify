import { View } from "@tarojs/components"
import * as React from "react"
import type { ReactNode } from "react"
import { prefixClassname } from "../styles"

interface PickerTitleProps {
  className?: string
  children?: ReactNode
}

export default function PickerTitle(props: PickerTitleProps) {
  const { children } = props
  // biome-ignore lint/correctness/noChildrenProp: <explanation>
  return <View className={prefixClassname("picker__title")} children={children} />
}

import { View } from "@tarojs/components"
import * as React from "react"
import { addUnitPx } from "../utils/format/unit"
import useHeight from "./use-height"

interface UsePlaceholderOptions {
  className?: string
}

export default function usePlaceholder(contentRef: any, { className }: UsePlaceholderOptions) {
  const height = useHeight(contentRef)

  return ({
    // @ts-ignore
    children,
  }) => (
    <View
      className={className}
      style={{ height: height ? `${addUnitPx(height)}` : "" }}
      children={children}
    />
  )
}

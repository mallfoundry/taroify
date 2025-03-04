import { View } from "@tarojs/components"
import type { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import type { CSSProperties, PropsWithChildren } from "react"
import { useHeight } from "../hooks"
import { addUnitPx } from "../utils/format/unit"

interface UsePlaceholderOptions {
  className?: string
}

export interface PlaceholderProps extends PropsWithChildren<ViewProps> {
  style?: CSSProperties
}

export default function usePlaceholder(contentRef: any, { className }: UsePlaceholderOptions = {}) {
  console.warn("[Taroify] usePlaceholder is deprecated, please don't use it.")
  return ({ className: classNameProp, style = {}, children, ...restProps }: PlaceholderProps) => {
    // biome-ignore lint/correctness/useHookAtTopLevel: <explanation>
    const height = useHeight(contentRef, [children])
    return (
      <View
        className={classNames(className, classNameProp)}
        style={{
          ...style,
          height: height ? `${addUnitPx(height)}` : "",
        }}
        children={children}
        {...restProps}
      />
    )
  }
}

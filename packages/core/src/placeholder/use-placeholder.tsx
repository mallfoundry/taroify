import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { CSSProperties, PropsWithChildren } from "react"
import { useHeight } from "../hooks"
import { addUnitPx } from "../utils/format/unit"

interface UsePlaceholderOptions {
  className?: string
}

export interface PlaceholderProps extends PropsWithChildren<ViewProps> {
  style?: CSSProperties
}

export default function usePlaceholder(contentRef: any, { className }: UsePlaceholderOptions = {}) {
  return ({ className: classNameProp, style = {}, children, ...restProps }: PlaceholderProps) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
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

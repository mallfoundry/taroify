import { View } from "@tarojs/components"
import type { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { type PropsWithChildren, useRef } from "react"
import type { PlaceholderProps } from "../placeholder"
import SafeArea, { type SafeAreaPosition } from "../safe-area"
import { prefixClassname } from "../styles"
import type { FixedViewPosition } from "./fixed-view.shared"
import { useHeight } from "../hooks"
import { addUnitPx } from "../utils/format/unit"
import mergeStyle from "../utils/merge-style"

function useFixedViewPlaceholder(placeholder?: boolean | string | PlaceholderProps) {
  if (placeholder === true) {
    return {
      className: prefixClassname("fixed-view__placeholder"),
    }
  }

  if (_.isString(placeholder)) {
    return {
      className: placeholder,
    }
  }

  if (_.isObject(placeholder)) {
    return placeholder
  }
}

interface FixedViewProps extends PropsWithChildren<ViewProps> {
  position?: boolean | FixedViewPosition
  safeArea?: SafeAreaPosition
  nativeSafeTop?: boolean
  placeholder?: boolean | string | Omit<PlaceholderProps, "children">
}

function FixedView<T>(props: FixedViewProps & T) {
  const {
    className,
    position,
    safeArea,
    nativeSafeTop,
    placeholder: placeholderProp,
    children,
    ...restProps
  } = props
  const rootRef = useRef()
  const placeholder = useFixedViewPlaceholder(placeholderProp)
  const height = useHeight(rootRef)

  if (position !== "top" && position !== "bottom" && position !== true) {
    return children as JSX.Element
  }

  const content = (
    <View
      ref={rootRef}
      className={classNames(
        prefixClassname("fixed-view"),
        {
          [prefixClassname("fixed-view--top")]: position === "top",
          [prefixClassname("fixed-view--bottom")]: position === "bottom" || position === true,
        },
        className,
      )}
      {...restProps}
    >
      {safeArea === "top" && <SafeArea position="top" nativeSafeTop={nativeSafeTop} />}
      {children}
      {safeArea === "bottom" && <SafeArea position="bottom" />}
    </View>
  )

  if (placeholder) {
    const { className: placeholderClassName, style: styleProp, ...restPlaceholder } = placeholder
    const style = mergeStyle(styleProp, height ? { height: addUnitPx(height) } : {})
    return (
      <View
        className={classNames(prefixClassname("fixed-view__placeholder"), placeholderClassName)}
        style={style}
        children={content}
        {...restPlaceholder}
      />
    )
  }

  return content
}

export default FixedView

import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { PropsWithChildren, useRef } from "react"
import { PlaceholderProps, usePlaceholder } from "../placeholder"
import SafeArea, { SafeAreaPosition } from "../safe-area"
import { prefixClassname } from "../styles"
import { FixedViewPosition } from "./fixed-view.shared"

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
  placeholder?: boolean | string | Omit<PlaceholderProps, "children">
}

function FixedView<T>(props: FixedViewProps & T) {
  const {
    className,
    position,
    safeArea,
    placeholder: placeholderProp,
    children,
    ...restProps
  } = props
  const rootRef = useRef()
  const placeholder = useFixedViewPlaceholder(placeholderProp)
  const Placeholder = usePlaceholder(rootRef)

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
      {safeArea === "top" && <SafeArea position="top" />}
      {children}
      {safeArea === "bottom" && <SafeArea position="bottom" />}
    </View>
  )

  if (placeholder) {
    const { className: placeholderClassName, ...restPlaceholder } = placeholder
    return (
      <Placeholder
        className={classNames(prefixClassname("fixed-view__placeholder"), placeholderClassName)}
        {...restPlaceholder}
        children={content}
      />
    )
  }

  return content
}

export default FixedView

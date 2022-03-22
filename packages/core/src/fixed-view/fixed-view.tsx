import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { PropsWithChildren, useRef } from "react"
import { usePlaceholder } from "../hooks"
import { PlaceholderProps } from "../placeholder"
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

const FixedView = function (props: FixedViewProps) {
  const { className, position, safeArea, placeholder: placeholderProp, ...restProps } = props
  const rootRef = useRef()
  const placeholder = useFixedViewPlaceholder(placeholderProp)
  const Placeholder = usePlaceholder(rootRef)

  const content = (
    <>
      {safeArea === "top" && <SafeArea position="top" />}
      <View
        ref={rootRef}
        className={classNames(
          {
            [prefixClassname("fixed-view")]:
              position === "top" || position === "bottom" || position === true,
            [prefixClassname("fixed-view--top")]: position === "top",
            [prefixClassname("fixed-view--bottom")]: position === "bottom" || position === true,
          },
          className,
        )}
        {...restProps}
      />
      {safeArea === "bottom" && <SafeArea position="bottom" />}
    </>
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

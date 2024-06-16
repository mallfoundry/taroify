import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { CSSProperties, ReactNode, useMemo, cloneElement } from "react"
import { prefixClassname } from "../styles"
import { isElementOf } from "../utils/validate"

export type BadgePosition = "top-left" | "top-right" | "bottom-left" | "bottom-right"

export interface BadgeProps extends ViewProps {
  className?: string
  style?: CSSProperties
  content?: ReactNode
  fixed?: boolean
  dot?: boolean
  max?: number
  position?: BadgePosition
  children?: ReactNode
}

function Badge(props: BadgeProps): JSX.Element {
  const {
    className,
    content: contentProp,
    max,
    dot: dotProp,
    position = "top-right",
    children,
    ...restProps
  } = props
  const hasChildren = children !== undefined

  const dot = contentProp === true || dotProp
  const content = useMemo(
    () =>
      _.isNumber(contentProp)
        ? _.toString(_.gt(contentProp, max) ? `${max}+` : contentProp)
        : contentProp,
    [contentProp, max],
  )

  const badge = (
    <View
      className={classNames(
        prefixClassname("badge__badge"),
        {
          [prefixClassname("badge--dot")]: dot,
          [prefixClassname("badge--content")]: content,
          [prefixClassname("badge--fixed")]: hasChildren,
          [prefixClassname("badge--top-left")]: position === "top-left",
          [prefixClassname("badge--top-right")]: position === "top-right",
          [prefixClassname("badge--bottom-left")]: position === "bottom-left",
          [prefixClassname("badge--bottom-right")]: position === "bottom-right",
        },
        !hasChildren && className,
      )}
      children={!dot && content}
      {...restProps}
    />
  )

  if (isElementOf(contentProp, Badge)) {
    // @ts-ignore
    return cloneElement(contentProp, {
      className,
      children
      // omit(props, 'content')
    })
  }

  if (hasChildren) {
    return  <View className={classNames(prefixClassname("badge-wrapper"), className)} >
      {children}
      {(dot || content) && badge}
    </View>
  }

  return badge
}

export default Badge

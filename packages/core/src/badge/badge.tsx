import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { CSSProperties, ReactNode, useContext, useMemo } from "react"
import { prefixClassname } from "../styles"
import BadgeWrapper from "./badge-wrapper"
import BadgeWrapperContext from "./badge-wrapper.context"

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
    dot,
    fixed: fixedProp,
    position = "top-right",
    children,
    ...restProps
  } = props
  const inWrapper = useContext(BadgeWrapperContext)
  const hasChildren = children !== undefined
  const noChildren = children === undefined
  const fixed = fixedProp ?? !!inWrapper

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
          [prefixClassname("badge--fixed")]: fixed || hasChildren,
          [prefixClassname("badge--top-left")]: position === "top-left",
          [prefixClassname("badge--top-right")]: position === "top-right",
          [prefixClassname("badge--bottom-left")]: position === "bottom-left",
          [prefixClassname("badge--bottom-right")]: position === "bottom-right",
        },
        className,
      )}
      children={!dot && content}
      {...restProps}
    />
  )

  if (noChildren) {
    return badge
  }

  return (
    <BadgeWrapper>
      {children}
      {(dot || content) && badge}
    </BadgeWrapper>
  )
}

export default Badge

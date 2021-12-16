import { cloneIconElement, isIconElement } from "@taroify/icons/utils"
import { View } from "@tarojs/components"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { ReactElement, ReactNode, useMemo } from "react"
import { prefixClassname } from "../styles"

export type BadgePosition = "top-left" | "top-right" | "bottom-left" | "bottom-right"

export interface BadgeProps {
  className?: string
  content?: ReactNode
  max?: number
  dot?: boolean
  position?: BadgePosition
  children?: ReactNode
}

function Badge(props: BadgeProps): JSX.Element {
  const { className, content: contentProp, max, dot, position = "top-right", children } = props
  const isIcon = useMemo(() => isIconElement(children), [children])
  const hasChildren = children !== undefined
  const noneChildren = children === undefined

  const content = useMemo(
    () =>
      _.isNumber(contentProp)
        ? _.toString(_.gt(contentProp, max) ? `${max}+` : contentProp)
        : contentProp,
    [contentProp, max],
  )

  return cloneIconElement(isIcon ? children : <View />, {
    className: classNames(
      {
        [prefixClassname("badge__wrapper")]: hasChildren,
        [prefixClassname("badge")]: noneChildren,
        [prefixClassname("badge--dot")]: noneChildren && dot,
        [prefixClassname("badge--top-left")]: noneChildren && position === "top-left",
        [prefixClassname("badge--top-right")]: noneChildren && position === "top-right",
        [prefixClassname("badge--bottom-left")]: noneChildren && position === "bottom-left",
        [prefixClassname("badge--bottom-right")]: noneChildren && position === "bottom-right",
      },
      className,
    ),
    children: (
      <>
        {!isIcon && children}
        {noneChildren && !dot && content}
        {hasChildren && (dot || content) && (
          <View
            className={classNames(
              prefixClassname("badge"),
              {
                [prefixClassname("badge--dot")]: dot,
                [prefixClassname("badge--content")]: content,
                [prefixClassname("badge--top-left")]: position === "top-left",
                [prefixClassname("badge--top-right")]: position === "top-right",
                [prefixClassname("badge--bottom-left")]: position === "bottom-left",
                [prefixClassname("badge--bottom-right")]: position === "bottom-right",
              },
              prefixClassname("badge--fixed"),
            )}
            children={!dot && content}
          />
        )}
      </>
    ),
  }) as ReactElement
}

export default Badge

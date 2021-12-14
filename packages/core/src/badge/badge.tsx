import { cloneIconElement, isIconElement } from "@taroify/icons/utils"
import { View } from "@tarojs/components"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { ReactNode, useMemo } from "react"
import { prefixClassname } from "../styles"

export interface BadgeProps {
  className?: string
  content?: ReactNode
  max?: number
  dot?: boolean
  children?: ReactNode
}

function Badge(props: BadgeProps): JSX.Element {
  const { className, content: contentProp, max, dot, children } = props
  const isIcon = useMemo(() => isIconElement(children), [children])
  const hasChildren = children !== undefined
  const noneChildren = children === undefined
  const content = _.isNumber(contentProp) && _.gt(contentProp, max) ? `${max}+` : contentProp

  return cloneIconElement(isIcon ? children : <View />, {
    className: classNames(
      {
        [prefixClassname("badge__wrapper")]: hasChildren,
        [prefixClassname("badge")]: noneChildren,
        [prefixClassname("badge--dot")]: noneChildren && dot,
      },
      className,
    ),
    children: (
      <>
        {!isIcon && children}
        {noneChildren && !dot && content}
        {hasChildren && (dot || (content || content !== 0) ) && (
          <View
            className={classNames(
              prefixClassname("badge"),
              {
                [prefixClassname("badge--dot")]: dot,
                [prefixClassname("badge--content")]: content,
              },
              prefixClassname("badge--fixed"),
            )}
            children={!dot && content}
          />
        )}
      </>
    ),
  }) as React.ReactElement
}

export default Badge

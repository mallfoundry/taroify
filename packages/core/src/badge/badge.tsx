import { View } from "@tarojs/components"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"

interface BadgeProps {
  className?: string
  color?: string
  content?: ReactNode
  max?: number
  dot?: boolean
  children?: ReactNode
}

function Badge(props: BadgeProps) {
  const { color = "", className, max, dot, children } = props
  const hasChildren = children !== undefined
  const noneChildren = children === undefined
  const content = _.isNumber(props.content) && _.gt(props.content, max) ? `${max}+` : props.content

  return (
    <View
      className={classNames(
        {
          [prefixClassname("badge__wrapper")]: hasChildren,
          [prefixClassname("badge")]: noneChildren,
          [prefixClassname("badge--dot")]: noneChildren && dot,
        },
        className,
      )}
    >
      {children}
      {noneChildren && !dot && content}
      {hasChildren && (
        <View
          style={{ background: color }}
          className={classNames(
            prefixClassname("badge"),
            {
              [prefixClassname("badge--dot")]: dot,
            },
            prefixClassname("badge--fixed"),
          )}
          children={!dot && content}
        />
      )}
    </View>
  )
}

export default Badge

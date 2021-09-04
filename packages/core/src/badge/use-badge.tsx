import * as _ from "lodash"
import * as React from "react"
import { cloneElement, isValidElement, ReactElement, ReactNode } from "react"
import Badge, { BadgeProps } from "./badge"

interface BadgeChildren {
  children?: ReactNode
}

function elementTypeOf(node: ReactNode, type: any) {
  return isValidElement(node) && (node as ReactElement).type === type
}

export default function useBadge(badge: ReactNode, props: BadgeProps = {}) {
  if (_.isBoolean(badge) && badge) {
    return ({ children }: BadgeChildren) => <Badge {...props} dot children={children} />
  }

  if (_.isNumber(badge) || _.isString(badge)) {
    return ({ children }: BadgeChildren) => <Badge {...props} content={badge} children={children} />
  }

  if (elementTypeOf(badge, Badge)) {
    return ({ children }: BadgeChildren) =>
      cloneElement(badge as ReactElement, {
        ...props,
        children,
      })
  }
  return ({ children }: BadgeChildren) => <Badge {...props} children={children} />
}

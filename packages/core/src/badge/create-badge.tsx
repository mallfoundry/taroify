import * as _ from "lodash"
import * as React from "react"
import { cloneElement, ReactElement, ReactNode } from "react"
import { isElementOf } from "../utils/validate"
import Badge, { BadgeProps } from "./badge"

export default function createBadge(badge: ReactNode, props: BadgeProps = {}) {
  if (_.isBoolean(badge) && badge) {
    return (badgeProps: BadgeProps) => <Badge {...props} dot {...badgeProps} />
  }

  if (_.isNumber(badge) || _.isString(badge)) {
    return (badgeProps: BadgeProps) => <Badge {...props} content={badge} {...badgeProps} />
  }

  if (isElementOf(badge, Badge)) {
    return (badgeProps: BadgeProps) =>
      cloneElement(badge as ReactElement, {
        ...props,
        ...badgeProps,
      })
  }
  return (badgeProps: BadgeProps) => <Badge {...props} {...badgeProps} />
}

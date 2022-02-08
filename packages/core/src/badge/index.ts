import { FunctionComponent } from "react"
import BadgeComponent, { BadgeProps } from "./badge"
import BadgeWrapper from "./badge-wrapper"

export { default as createBadge } from "./create-badge"
export { default as createBadgeWrapper } from "./create-badge-wrapper"

export { default as useBadge } from "./use-badge"
export { default as useBadgeWrapper } from "./use-badge-wrapper"

interface BadgeInterface extends FunctionComponent<BadgeProps> {
  Wrapper: typeof BadgeWrapper
}

const Badge = BadgeComponent as BadgeInterface

Badge.Wrapper = BadgeWrapper

export default Badge

import * as React from "react"
import * as _ from "lodash"
import { cloneElement, useMemo, ReactElement, ReactNode, isValidElement, Children } from "react"
import classNames from "classnames"
import { isElementOf } from "../utils/validate"
import { prefixClassname } from "../styles"
import { AvatarVarinat, SpacingSize } from "./avatar.shared"
import Avatar, { AvatarProps } from "./avatar"
interface AvatarGroupProps {
  children: ReactNode[]
  max?: number
  variant?: AvatarVarinat
  spacing?: SpacingSize
  total?: number
}
const useAvatars = (children: ReactNode, variant: AvatarVarinat, max: number): ReactNode[] => {
  const avatars = Children.toArray(children)
    .filter((child) => isValidElement(child))
    .filter((element) => isElementOf(element, Avatar))
    .map((child, index) => {
      const element = child as ReactElement<AvatarProps>
      const { key, props } = element
      const { children, ...restProps } = props
      return cloneElement(
        element,
        {
          key: key ?? index,
          variant,
          ...restProps,
        },
        children,
      )
    })
  if (max) return avatars?.splice(0, max)
  return avatars
}
export default function AvatarsGroup({
  variant = "circular",
  max = 9999999,
  children,
  spacing = "medium",
  total,
}: AvatarGroupProps): JSX.Element {
  const length = useMemo(() => {
    return children.length - max > 0 ? children.length - max : 0
  }, [children, max])
  const avatars = useAvatars(children, variant, max)
  return (
    <div
      className={classNames(prefixClassname("avatar-group"), {
        [prefixClassname("avatar-group--spacing-small")]: spacing === "small",
        [prefixClassname("avatar-group--spacing-medium")]: spacing === "medium",
        [prefixClassname("avatar-group--spacing-large")]: spacing === "large",
      })}
    >
      {avatars}
      <Avatar variant={variant} style={{ zIndex: _.size(avatars) }}>
        +{total ? total - _.size(avatars) : length}
      </Avatar>
    </div>
  )
}

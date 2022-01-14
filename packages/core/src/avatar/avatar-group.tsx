import * as React from "react"
import * as _ from "lodash"
import { cloneElement, useMemo, ReactElement, ReactNode, isValidElement, Children } from "react"
import classNames from "classnames"
import { isElementOf } from "../utils/validate"
import { prefixClassname } from "../styles"
import { AvatarVarinatType, spacingSize } from "./avatar.shared"
import Avatar, { AvatarProps } from "./avatar"
interface AvatarGroupProps {
  children: ReactNode[]
  max?: number
  variant?: AvatarVarinatType
  spacing?: spacingSize
  total?: number
}
const avatarGroupNode = (
  children: ReactNode,
  variant: AvatarVarinatType,
  max: number,
): ReactNode[] => {
  const avatars = Children.toArray(children)
    .filter((child) => isValidElement(child))
    .filter((element) => isElementOf(element, Avatar))
    .map((child, index) => {
      const element = child as ReactElement<AvatarProps>
      const { props } = element
      const { children, ...restProps } = props

      return cloneElement(
        element,
        {
          ...restProps,
          key: index,
          variant: variant,
        },
        children,
      )
    })

  if (max) {
    return avatars?.splice(0, max > 5 ? 5 : max)
  } else {
    return avatars?.splice(0, 5)
  }
}
export default function AvatarsGroup({
  variant = "circular",
  max = 0,
  children,
  spacing = "medium",
  total,
}: AvatarGroupProps): JSX.Element {
  const length = useMemo(() => {
    return children.length - max
  }, [children, max])
  const avatars = avatarGroupNode(children, variant, max)
  return (
    <div
      className={classNames(prefixClassname("avatar-group"), {
        [prefixClassname("avatar-group--spacing-small")]: spacing === "small",
        [prefixClassname("avatar-group--spacing-medium")]: spacing === "medium",
        [prefixClassname("avatar-group--spacing-large")]: spacing === "large",
      })}
    >
      {avatars}
      <Avatar variant={variant} style={{ zIndex: 999 }}>
        +{total ? total - _.size(avatars) : length}
      </Avatar>
    </div>
  )
}

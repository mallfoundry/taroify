import { View } from "@tarojs/components"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import {
  Children,
  cloneElement,
  isValidElement,
  ReactChild,
  ReactElement,
  ReactNode,
  useMemo,
} from "react"
import { prefixClassname } from "../styles"
import { isElementOf } from "../utils/validate"
import Avatar, { AvatarProps } from "./avatar"
import { AvatarShape, AvatarSize, AvatarSpacing } from "./avatar.shared"

const useAvatars = (
  children: ReactNode,
  shape: AvatarShape,
  limit: number,
): [ReactNode[], number, AvatarSize] => {
  return useMemo(() => {
    const avatars = Children.toArray(children) //
      .filter((child) => isValidElement(child) && isElementOf(child, Avatar))

    const avatarsSize = _.size(avatars)
    const luckyAvatars: ReactNode[] = []
    const length = Math.min(avatarsSize, limit)

    const size = avatars[length]
      ? (avatars[length] as ReactElement<AvatarProps>).props.size || "medium"
      : "medium"

    for (let index = 0; index < length; index++) {
      const child = _.get(avatars, index) as ReactChild
      const element = child as ReactElement<AvatarProps>
      const { key, props } = element
      const { style, children, ...restProps } = props
      luckyAvatars.push(
        cloneElement(
          element,
          {
            key: key ?? index,
            shape,
            style: {
              ...style,
              zIndex: index,
            },
            ...restProps,
          },
          children,
        ),
      )
    }
    return [luckyAvatars, avatarsSize, size]
  }, [children, limit, shape])
}

interface AvatarGroupProps {
  children: ReactNode[]
  shape?: AvatarShape
  spacing?: AvatarSpacing
  limit?: number
  total?: number
  className?: string
}

export default function AvatarGroup(props: AvatarGroupProps) {
  const {
    className,
    shape = "circle",
    limit = Number.MAX_VALUE,
    spacing = "small",
    total,
    children, //
  } = props
  const [avatars, avatarsSize, size] = useAvatars(children, shape, limit)

  return (
    <View
      className={classNames(
        prefixClassname("avatar-group"),
        {
          [prefixClassname("avatar-group--spacing-mini")]: spacing === "mini",
          [prefixClassname("avatar-group--spacing-small")]: spacing === "small",
          [prefixClassname("avatar-group--spacing-medium")]: spacing === "medium",
          [prefixClassname("avatar-group--spacing-large")]: spacing === "large",
        },
        className,
      )}
    >
      {avatars}
      {avatarsSize >= limit && (
        <Avatar shape={shape} size={size} style={{ zIndex: avatarsSize }}>
          +{total ? total - limit : avatarsSize - limit}
        </Avatar>
      )}
    </View>
  )
}

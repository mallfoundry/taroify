import * as React from "react"
import { View } from "@tarojs/components"
import classNames from "classnames"
import { Image } from "@taroify/core"
import { prefixClassname } from "../styles"
import { AvatarSize, AvatarVarinatType } from "./avatar.shared"

export interface AvatarProps {
  children?: any
  style?: React.CSSProperties
  src?: string
  alt?: string
  variant?: AvatarVarinatType
  position?: string
  size?:AvatarSize
}

function Avatar({
  children,
  style = {},
  src,
  alt,
  variant = "circular",
  position,
  size="medium"
}: AvatarProps): JSX.Element {
  const { backgroundColor = "gray" } = style
  return (
    <View
      className={classNames(prefixClassname("avatar"), {
        [prefixClassname("avatar--circular")]: variant === "circular",
        [prefixClassname("avatar--square")]: variant === "square",
        [prefixClassname("avatar--rounded")]: variant === "rounded",
        [prefixClassname("avatar--position")]: position === "position",
      },{
        [prefixClassname("avatar--mini")]: size === "mini",
        [prefixClassname("avatar--small")]: size === "small",
        [prefixClassname("avatar--medium")]: size === "medium",
        [prefixClassname("avatar--large")]: size === "large",
      })}
      style={{ backgroundColor, ...style }}
    >
      {src ? <Image alt={alt} src={src}></Image> : children}
    </View>
  )
}

export default Avatar

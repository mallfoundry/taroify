import * as React from "react"
import { View } from "@tarojs/components"
import { CSSProperties } from "react"
import classNames from "classnames"
import { Image } from "@taroify/core"
import { prefixClassname } from "../styles"
import { AvatarSize, AvatarVarinat } from "./avatar.shared"

export interface AvatarProps {
  children?: any
  style?: CSSProperties
  src?: string
  alt?: string
  variant?: AvatarVarinat
  size?: AvatarSize
}

function Avatar({
  children,
  style = {},
  src,
  alt,
  variant = "circular",
  size = "medium",
}: AvatarProps): JSX.Element {
  return (
    <View
      className={classNames(
        prefixClassname("avatar"),
        {
          [prefixClassname("avatar--circular")]: variant === "circular",
          [prefixClassname("avatar--square")]: variant === "square",
          [prefixClassname("avatar--rounded")]: variant === "rounded",
        },
        {
          [prefixClassname("avatar--mini")]: size === "mini",
          [prefixClassname("avatar--small")]: size === "small",
          [prefixClassname("avatar--medium")]: size === "medium",
          [prefixClassname("avatar--large")]: size === "large",
        },
      )}
      style={style}
    >
      {src ? <Image alt={alt} src={src}></Image> : children}
    </View>
  )
}

export default Avatar

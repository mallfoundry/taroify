import { Image } from "@taroify/core"
import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { CSSProperties, ReactNode } from "react"
import { prefixClassname } from "../styles"
import { AvatarShape, AvatarSize } from "./avatar.shared"

export interface AvatarProps extends ViewProps {
  style?: CSSProperties
  src?: string
  alt?: string
  shape?: AvatarShape
  size?: AvatarSize
  children?: ReactNode
}

function Avatar(props: AvatarProps) {
  const { src, alt, shape = "circular", size = "medium", children, ...restProps } = props
  return (
    <View
      className={classNames(
        prefixClassname("avatar"),
        {
          [prefixClassname("avatar--circular")]: shape === "circular",
          [prefixClassname("avatar--square")]: shape === "square",
          [prefixClassname("avatar--rounded")]: shape === "rounded",
        },
        {
          [prefixClassname("avatar--mini")]: size === "mini",
          [prefixClassname("avatar--small")]: size === "small",
          [prefixClassname("avatar--medium")]: size === "medium",
          [prefixClassname("avatar--large")]: size === "large",
        },
      )}
      {...restProps}
    >
      {src ? <Image alt={alt} round={shape === "circular"} src={src} /> : children}
    </View>
  )
}

export default Avatar

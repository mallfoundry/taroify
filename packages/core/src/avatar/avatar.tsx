import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { CSSProperties, ReactNode } from "react"
import Image from "../image"
import { prefixClassname } from "../styles"
import { AvatarShape, AvatarSize } from "./avatar.shared"

export interface AvatarProps extends ViewProps {
  className?: string
  style?: CSSProperties
  src?: string
  alt?: string
  shape?: AvatarShape
  size?: AvatarSize
  children?: ReactNode
}

function Avatar(props: AvatarProps) {
  const { className, src, alt, shape = "circle", size = "medium", children, ...restProps } = props
  return (
    <View
      className={classNames(
        prefixClassname("avatar"),
        {
          [prefixClassname("avatar--circle")]: shape === "circle",
          [prefixClassname("avatar--square")]: shape === "square",
          [prefixClassname("avatar--rounded")]: shape === "rounded",
        },
        {
          [prefixClassname("avatar--mini")]: size === "mini",
          [prefixClassname("avatar--small")]: size === "small",
          [prefixClassname("avatar--medium")]: size === "medium",
          [prefixClassname("avatar--large")]: size === "large",
        },
        className,
      )}
      {...restProps}
    >
      {src ? <Image alt={alt} shape={shape} src={src} /> : children}
    </View>
  )
}

export default Avatar

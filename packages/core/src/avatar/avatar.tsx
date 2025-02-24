import { View } from "@tarojs/components"
import type { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import type { CSSProperties, ReactNode } from "react"
import Image from "../image"
import { prefixClassname } from "../styles"
import type { AvatarShape, AvatarSize } from "./avatar.shared"

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
      {src ? (
        <Image
          alt={alt}
          shape={shape}
          src={src}
          className={classNames({
            [prefixClassname("avatar__image--mini")]: size === "mini",
            [prefixClassname("avatar__image--small")]: size === "small",
            [prefixClassname("avatar__image--medium")]: size === "medium",
            [prefixClassname("avatar__image--large")]: size === "large",
          })}
        />
      ) : (
        children
      )}
    </View>
  )
}

export default Avatar

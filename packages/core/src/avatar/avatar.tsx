import * as React from "react"
import { View } from "@tarojs/components"
import classNames from "classnames"
import { Image } from "@taroify/core"
import { prefixClassname } from "../styles"

interface AvatarStyle {
  height?: number
  width?: number
  background?: string
}
export enum variantEnum {
  SQUARE = "square",
  ROUNDED = "rounded",
  CIRCULAR = "circular",
}
export type VarinatType = "square" | "rounded" | "circular"
export interface AvatarProps {
  children?: any
  sx?: AvatarStyle
  src?: string
  alt?: string
  variant?: variantEnum | VarinatType
  position?: string
  left?:any
  ZIndex?:number
}

function Avatar({
  children,
  sx = {},
  src,
  alt,
  variant = variantEnum.CIRCULAR,
  position,
  left,
  ZIndex
}: AvatarProps): JSX.Element {
  const { width = 36, height = 36, background = "gray" } = sx
  return (
    <View
      className={classNames(prefixClassname("avatar"), {
        [prefixClassname("avatar--circular")]: variant === "circular",
        [prefixClassname("avatar--square")]: variant === "square",
        [prefixClassname("avatar--rounded")]: variant === "rounded",
        [prefixClassname("avatar--position")]: position === "position",
      })}
      style={{
        background: background,
        width: width + "px",
        height: height + "px",
        lineHeight: height + "px",
        left: left+"px",
        zIndex:ZIndex
      }}
    >
      {src ? <Image alt={alt} src={src}></Image> : children}
    </View>
  )
}

export default Avatar

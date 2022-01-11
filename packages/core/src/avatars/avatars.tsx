import * as React from "react"
import { View } from "@tarojs/components"
import classNames from "classnames"
import { Image } from "@taroify/core"
import { prefixClassname } from "../styles"

interface AvatarsSx {
  height?: string
  width?: string
  background?: string
}
enum variantEnum {
  SQUARE = "square",
  ROUNDED = "rounded",
  CIRCULAR = "circular",
}
type VarinatType = "square" | "rounded" | "circular"
export interface AvatarsProps {
  children?: any
  sx?: AvatarsSx
  src?: string
  alt?: string
  variant?: variantEnum | VarinatType
}

function Avatars({
  children,
  sx = { width: "36px", height: "36px", background: "gray" },
  src,
  alt,
  variant = variantEnum.CIRCULAR,
}: AvatarsProps): JSX.Element {
  return (
    <View
      className={classNames(prefixClassname("avatars"), {
        [prefixClassname("avatars--circular")]: variant === "circular",
        [prefixClassname("avatars--square")]: variant === "square",
        [prefixClassname("avatars--rounded")]: variant === "rounded",
      })}
      style={sx}
    >
      {children}
      <Image alt={alt} src={src}></Image>
    </View>
  )
}
export default Avatars

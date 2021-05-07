import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { CSSProperties, ReactNode } from "react"
import { default as TaroImage } from "../image"
import { prefixClassname } from "../styles"

const PRESET_IMAGES = ["default", "error", "search", "network"]

function obtainImageUrl(image?: string) {
  if (image && PRESET_IMAGES.includes(image)) {
    return `https://img.yzcdn.cn/vant/empty-image-${image}.png`
  }
  return image
}

interface EmptyProps {
  className?: string
  children?: ReactNode
}

function Empty(props: EmptyProps) {
  const { className, children } = props
  return (
    <View
      className={classNames(prefixClassname("empty"), {
        className,
      })}
    >
      {children}
    </View>
  )
}

namespace Empty {
  enum ImagePreset {
    Default = "default",
    Error = "error",
    Search = "search",
    Network = "network",
  }

  type ImagePresetString = "default" | "error" | "search" | "network"

  interface ImageProps {
    className?: string
    style?: CSSProperties
    src?: ImagePreset | ImagePresetString | string
  }

  export function Image(props: ImageProps) {
    const { className, style, src = ImagePreset.Default } = props
    const __src__ = obtainImageUrl(src)
    return (
      <TaroImage
        className={classNames(prefixClassname("empty__image"), className)}
        style={style}
        src={__src__}
      />
    )
  }

  interface DescriptionProps {
    className?: string
    style?: CSSProperties
    children?: ReactNode
  }

  export function Description(props: DescriptionProps) {
    const { className, style, children } = props
    return (
      <View
        className={classNames(prefixClassname("empty__description"), className)}
        style={style}
        children={children}
      />
    )
  }
}

export default Empty

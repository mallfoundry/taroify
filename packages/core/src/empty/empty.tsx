import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
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

interface EmptyProps extends ViewProps {
  className?: string
  children?: ReactNode
}

function Empty(props: EmptyProps) {
  const { className, ...restProps } = props
  return <View className={classNames(prefixClassname("empty"), className)} {...restProps} />
}

namespace Empty {
  type ImagePreset = "default" | "error" | "search" | "network"

  interface ImageProps {
    className?: string
    style?: CSSProperties
    src?: ImagePreset | string
  }

  export function Image(props: ImageProps) {
    const { className, style, src = "default" } = props
    const __src__ = obtainImageUrl(src)
    return (
      <TaroImage
        className={classNames(prefixClassname("empty__image"), className)}
        style={style}
        src={__src__}
      />
    )
  }

  interface DescriptionProps extends ViewProps {
    children?: ReactNode
  }

  export function Description(props: DescriptionProps) {
    const { className, ...restProps } = props
    return (
      <View
        className={classNames(prefixClassname("empty__description"), className)}
        {...restProps}
      />
    )
  }
}

export default Empty

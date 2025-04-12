import * as React from "react"
import { View } from "@tarojs/components"
import { Icon } from "@taroify/icons"
import classNames from "classnames"
import { prefixClassname } from "../styles"
import type { SkeletonImageProps } from "./skeleton.shared"
import { getSizeStyle } from "../utils/format/unit"

function SkeletonImage(props: SkeletonImageProps) {
  const { imageSize, imageShape } = props

  return (
    <View
      className={classNames(prefixClassname("skeleton__image"), {
        [prefixClassname("skeleton__image--round")]: imageShape === "round",
      })}
      style={getSizeStyle(imageSize)}
    >
      <Icon name="photo" className={prefixClassname("skeleton__image-icon")} />
    </View>
  )
}

export default SkeletonImage

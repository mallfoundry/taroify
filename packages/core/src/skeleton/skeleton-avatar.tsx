import * as React from "react"
import { View } from "@tarojs/components"
import classNames from "classnames"
import { prefixClassname } from "../styles"
import type { SkeletonAvatarProps } from "./skeleton.shared"
import { getSizeStyle } from "../utils/format/unit"

function SkeletonAvatar(props: SkeletonAvatarProps) {
  const { avatarSize, avatarShape } = props

  return (
    <View
      className={classNames(prefixClassname("skeleton__avatar"), {
        [prefixClassname("skeleton__avatar--round")]: avatarShape === "round",
      })}
      style={{
        ...getSizeStyle(avatarSize),
      }}
    />
  )
}

export default SkeletonAvatar

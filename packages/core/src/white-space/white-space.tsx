import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { CSSProperties, useMemo } from "react"
import { prefixClassname } from "../styles"

export enum WhiteSpaceSize {
  Mini = "mini",
  Small = "small",
  Medium = "medium",
  Large = "large",
}

const SIZE_PRESETS = [
  WhiteSpaceSize.Mini,
  WhiteSpaceSize.Small,
  WhiteSpaceSize.Medium,
  WhiteSpaceSize.Large,
]

function isPresetSize(size?: WhiteSpaceSize | string | number) {
  return SIZE_PRESETS.includes(size as WhiteSpaceSize)
}

type WhiteSpaceSizeString = "mini" | "small" | "medium" | "large"

interface WhiteSpaceProps {
  size?: WhiteSpaceSize | WhiteSpaceSizeString | string | number
}

export default function WhiteSpace(props: WhiteSpaceProps) {
  const { size = WhiteSpaceSize.Medium } = props

  const rootStyle = useMemo<CSSProperties>(
    () => ({ height: isPresetSize(size) ? "" : size }), //
    [size],
  )

  return (
    <View
      className={classNames(prefixClassname("white-space"), {
        [prefixClassname(`white-space-size-${size}`)]: isPresetSize(size),
      })}
      style={rootStyle}
    />
  )
}

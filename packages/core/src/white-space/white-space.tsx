import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { prefixClassname } from "../styles"

export enum WhiteSpaceSize {
  Mini = "mini",
  Small = "small",
  Medium = "medium",
  Large = "large",
}

type WhiteSpaceSizeString = "mini" | "small" | "medium" | "large"

interface WhiteSpaceProps {
  size?: WhiteSpaceSize | WhiteSpaceSizeString
}


export default function WhiteSpace(props: WhiteSpaceProps) {
  const { size = WhiteSpaceSize.Medium } = props
  return (
    <View
      className={
        classNames(
          prefixClassname("white-space"),
          prefixClassname(`white-space-size-${size}`),
        )}
    />
  )
}

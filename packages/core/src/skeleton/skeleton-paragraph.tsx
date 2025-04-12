import * as React from "react"
import { View } from "@tarojs/components"
import classNames from "classnames"
import { prefixClassname } from "../styles"
import type { SkeletonParagraphProps } from "./skeleton.shared"

export const DEFAULT_ROW_WIDTH = "100%"

function SkeletonParagraph(props: SkeletonParagraphProps) {
  const { round, rowWidth = DEFAULT_ROW_WIDTH } = props

  return (
    <View
      className={classNames(prefixClassname("skeleton__paragraph"), {
        [prefixClassname("skeleton__paragraph--round")]: round,
      })}
      style={{ width: rowWidth }}
    />
  )
}

export default SkeletonParagraph

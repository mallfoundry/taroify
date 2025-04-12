import * as React from "react"
import { View } from "@tarojs/components"
import classNames from "classnames"
import { prefixClassname } from "../styles"
import type { SkeletonTitleProps } from "./skeleton.shared"
import { addUnitPx } from "../utils/format/unit"

function SkeletonTitle(props: SkeletonTitleProps) {
  const { round, titleWidth } = props

  return (
    <View
      className={classNames(prefixClassname("skeleton__title"), {
        [prefixClassname("skeleton__title--round")]: round,
      })}
      style={{ width: addUnitPx(titleWidth) }}
    />
  )
}

export default SkeletonTitle

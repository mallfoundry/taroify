import * as React from "react"
import { View } from "@tarojs/components"
import classNames from "classnames"
import { prefixClassname } from "../styles"
import { addUnitPx } from "../utils/format/unit"
import SkeletonAvatar from "./skeleton-avatar"
import SkeletonTitle from "./skeleton-title"
import SkeletonParagraph, { DEFAULT_ROW_WIDTH } from "./skeleton-paragraph"
import type { SkeletonProps } from "./skeleton.shared"

const DEFAULT_LAST_ROW_WIDTH = "60%"

function Skeleton(props: SkeletonProps) {
  const {
    className,
    loading = true,
    round = true,
    animate = true,
    row = 0,
    rowWidth = DEFAULT_ROW_WIDTH,
    avatar,
    avatarSize,
    avatarShape = "round",
    title,
    titleWidth,
    children,
    template,
    ...restProps
  } = props

  const getRowWidth = (index: number) => {
    const { rowWidth } = props

    if (rowWidth === DEFAULT_ROW_WIDTH && index === +row - 1) {
      return DEFAULT_LAST_ROW_WIDTH
    }

    if (Array.isArray(rowWidth)) {
      return rowWidth[index]
    }

    return rowWidth
  }

  const renderContent = () => {
    if (template) {
      return template
    }

    return (
      <>
        {avatar && <SkeletonAvatar avatarSize={avatarSize} avatarShape={avatarShape} />}
        <View className={prefixClassname("skeleton__content")}>
          {title && <SkeletonTitle round={round} titleWidth={titleWidth} />}
          {Array(+row)
            .fill("")
            .map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <SkeletonParagraph key={i} round={round} rowWidth={addUnitPx(getRowWidth(i))} />
            ))}
        </View>
      </>
    )
  }

  if (!loading) {
    return children
  }

  return (
    <View
      className={classNames(
        prefixClassname("skeleton"),
        {
          [prefixClassname("skeleton--round")]: round,
          [prefixClassname("skeleton--animate")]: animate,
        },
        className,
      )}
      {...restProps}
    >
      {renderContent()}
    </View>
  )
}

export default Skeleton

import type { FC } from "react"
import SkeletonComponent from "./skeleton"
import SkeletonAvatar from "./skeleton-avatar"
import SkeletonTitle from "./skeleton-title"
import SkeletonParagraph from "./skeleton-paragraph"
import SkeletonImage from "./skeleton-image"

import type { SkeletonProps } from "./skeleton.shared"

interface SkeletonInterface extends FC<SkeletonProps> {
  Avatar: typeof SkeletonAvatar
  Title: typeof SkeletonTitle
  Paragraph: typeof SkeletonParagraph
  Image: typeof SkeletonImage
}

const Skeleton = SkeletonComponent as SkeletonInterface

Skeleton.Avatar = SkeletonAvatar
Skeleton.Title = SkeletonTitle
Skeleton.Paragraph = SkeletonParagraph
Skeleton.Image = SkeletonImage

export type {
  SkeletonThemeVars,
  SkeletonProps,
  SkeletonAvatarProps,
  SkeletonTitleProps,
  SkeletonParagraphProps,
  SkeletonImageProps,
} from "./skeleton.shared"

export default Skeleton

import type { ReactNode } from "react"
import type { ViewProps } from "@tarojs/components/types/View"

export type SkeletonThemeVars = {
  skeletonAvatarSize?: string
  skeletonAvatarBackground?: string
  skeletonDuration?: string
  skeletonParagraphHeight?: string
  skeletonParagraphBackground?: string
  skeletonTitleWidth?: string
  skeletonParagraphMarginTop?: string
}

export interface SkeletonProps extends Pick<ViewProps, "className" | "style" | "children"> {
  /**
   * 段落占位图行数
   * @default 3
   */
  row?: number
  /** 段落占位图宽度 */
  rowWidth?: number | string | (number | string)[]
  /** 是否显示标题占位图 */
  title?: boolean
  /** 是否显示头像占位图 */
  avatar?: boolean
  /** 是否显示骨架屏 */
  loading?: boolean
  /** 是否启用动画 */
  animate?: boolean
  /** 是否启用圆角 */
  round?: boolean
  /** 标题占位图宽度 */
  titleWidth?: number | string
  /** 头像占位图大小 */
  avatarSize?: string | number
  /** 头像占位图形状 */
  avatarShape?: "square" | "round"
  /** 骨架屏自定义 */
  template?: ReactNode
}

export interface SkeletonAvatarProps extends Pick<SkeletonProps, "avatarSize" | "avatarShape"> {}

export interface SkeletonTitleProps extends Pick<SkeletonProps, "round" | "titleWidth"> {}

export interface SkeletonParagraphProps extends Pick<SkeletonProps, "round"> {
  /** 段落占位图宽度 */
  rowWidth?: number | string
}

export interface SkeletonImageProps {
  /** 图片占位图大小 */
  imageSize?: string | number
  /** 图片占位图形状 */
  imageShape?: "square" | "round"
}

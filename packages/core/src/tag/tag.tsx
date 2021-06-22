import { Cross } from "@taroify/icons"
import { cloneIconElement } from "@taroify/icons/utils"
import { View } from "@tarojs/components"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"

export enum TagVariant {
  Contained = "contained",
  Outlined = "outlined",
}

type TagVariantString = "contained" | "outlined"

export enum TagColor {
  Default = "default",
  Primary = "primary",
  Info = "info",
  Success = "success",
  Warning = "warning",
  Danger = "danger",
}

type TagColorString = "default" | "primary" | "info" | "success" | "warning" | "danger"

export enum TagSize {
  Small = "small",
  Medium = "medium",
  Large = "large",
}

type TagSizeString = "small" | "medium" | "large"

export enum TagShape {
  Square = "square",
  Round = "round",
  RoundRight = "roundRight",
  RoundLeft = "roundLeft",
}

type TagShapeString = "square" | "round" | "roundRight" | "roundLeft"

const TAG_PRESET_COLORS: string[] = [
  TagColor.Default,
  TagColor.Primary,
  TagColor.Info,
  TagColor.Success,
  TagColor.Warning,
  TagColor.Danger,
]

function isPresetTagColor(color?: string | TagColor) {
  return _.includes(TAG_PRESET_COLORS, color)
}

function createCustomColor(
  variant?: TagVariant | TagVariantString,
  color?: TagColor | TagColorString | string,
) {
  return color && variant === TagVariant.Contained && !isPresetTagColor(color) ? color : ""
}

function createCustomTextColor(
  variant?: TagVariant | TagVariantString,
  textColor?: TagColor | TagColorString | string,
  color?: TagColor | TagColorString | string,
) {
  if (textColor && variant === TagVariant.Contained && !isPresetTagColor(textColor)) {
    return textColor
  }

  if (color && variant === TagVariant.Outlined && !isPresetTagColor(color)) {
    return color
  }

  return ""
}

interface TagProps {
  variant?: TagVariant | TagVariantString
  size?: TagSize | TagSizeString
  color?: TagColor | TagColorString | string
  textColor?: string
  // borderColor?: TagColor | TagColorString | string
  shape?: TagShape | TagShapeString
  closeIcon?: ReactNode
  closeable?: boolean
  children?: ReactNode
  onClose?: () => void
}

function Tag(props: TagProps) {
  const {
    variant = TagVariant.Contained,
    size = TagSize.Small,
    color = TagColor.Default,
    textColor,
    shape = TagShape.Square,
    closeable,
    closeIcon = <Cross />,
    onClose,
    children,
  } = props

  return (
    <View
      style={{
        // Set custom color
        background: createCustomColor(variant, color),
        color: createCustomTextColor(variant, textColor, color),
      }}
      className={classNames(prefixClassname("tag"), {
        [prefixClassname("tag--outlined")]: variant === TagVariant.Outlined,
        // Set size styles
        [prefixClassname("tag--medium")]: size === TagSize.Medium,
        [prefixClassname("tag--large")]: size === TagSize.Large,
        // Set color styles
        [prefixClassname("tag--default")]: color === TagColor.Default,
        [prefixClassname("tag--primary")]: color === TagColor.Primary,
        [prefixClassname("tag--info")]: color === TagColor.Info,
        [prefixClassname("tag--success")]: color === TagColor.Success,
        [prefixClassname("tag--warning")]: color === TagColor.Warning,
        [prefixClassname("tag--danger")]: color === TagColor.Danger,
        // Set shape styles
        [prefixClassname("tag--round")]: shape === TagShape.Round,
        [prefixClassname("tag--round-right")]: shape === TagShape.RoundRight,
        [prefixClassname("tag--round-left")]: shape === TagShape.RoundLeft,
      })}
    >
      {children}
      {closeable &&
        cloneIconElement(closeIcon, {
          className: prefixClassname("tag__close"),
          onClick: onClose,
        })}
    </View>
  )
}

export default Tag

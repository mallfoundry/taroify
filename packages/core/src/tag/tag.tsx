import { Cross } from "@taroify/icons"
import { cloneIconElement } from "@taroify/icons/utils"
import { ITouchEvent, View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"

type TagVariant = "contained" | "outlined"

type TagColor = "default" | "primary" | "info" | "success" | "warning" | "danger"

type TagSize = "small" | "medium" | "large"

type TagShape = "square" | "rounded" | "roundedRight" | "roundedLeft"

interface TagProps extends ViewProps {
  variant?: TagVariant
  size?: TagSize
  color?: TagColor
  shape?: TagShape
  closeIcon?: ReactNode
  closeable?: boolean
  children?: ReactNode

  onClose?(event: ITouchEvent): void
}

function Tag(props: TagProps) {
  const {
    className,
    variant = "contained",
    size = "small",
    color = "default",
    shape = "square",
    closeable,
    closeIcon = <Cross />,
    onClose,
    children,
    ...restProps
  } = props

  return (
    <View
      className={classNames(
        prefixClassname("tag"),
        {
          [prefixClassname("tag--outlined")]: variant === "outlined",
          // Set size styles
          [prefixClassname("tag--medium")]: size === "medium",
          [prefixClassname("tag--large")]: size === "large",
          // Set color styles
          [prefixClassname("tag--default")]: color === "default",
          [prefixClassname("tag--primary")]: color === "primary",
          [prefixClassname("tag--info")]: color === "info",
          [prefixClassname("tag--success")]: color === "success",
          [prefixClassname("tag--warning")]: color === "warning",
          [prefixClassname("tag--danger")]: color === "danger",
          // Set shape styles
          [prefixClassname("tag--rounded")]: shape === "rounded",
          [prefixClassname("tag--rounded-right")]: shape === "roundedRight",
          [prefixClassname("tag--rounded-left")]: shape === "roundedLeft",
        },
        className,
      )}
      {...restProps}
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

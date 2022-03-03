import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { PropsWithChildren } from "react"
import { prefixClassname } from "../styles"

const TIMELINE_DOT_COLORS = ["default", "primary", "info", "success", "warning", "danger"]

const TIMELINE_DOT_VARIANTS = ["filled", "outlined"]

type TimelineDotColor = "default" | "primary" | "info" | "success" | "warning" | "danger"

type TimelineDotVariant = "filled" | "outlined"

function isPresetColor(color: TimelineDotColor) {
  return TIMELINE_DOT_COLORS.includes(color)
}

function isPresetVariant(variant: TimelineDotVariant) {
  return TIMELINE_DOT_VARIANTS.includes(variant)
}

export interface TimelineDotProps extends PropsWithChildren<ViewProps> {
  variant?: TimelineDotVariant
  color?: TimelineDotColor
}

function TimelineDot(props: TimelineDotProps) {
  const { className, variant = "filled", color = "default", ...restProps } = props
  return (
    <View
      className={classNames(
        prefixClassname("timeline-dot"),
        {
          [prefixClassname(`timeline-dot--${variant}-${color}`)]:
            isPresetVariant(variant) && isPresetColor(color),
        },
        className,
      )}
      {...restProps}
    />
  )
}

export default TimelineDot

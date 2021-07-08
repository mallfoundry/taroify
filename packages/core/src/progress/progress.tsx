import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { CSSProperties, ReactNode, useMemo } from "react"
import { prefixClassname } from "../styles"

export enum ProgressColor {
  Primary = "primary",
  Info = "info",
  Success = "success",
  Warning = "warning",
  Danger = "danger",
}

type ProgressColorString = "primary" | "info" | "success" | "warning" | "danger"

const PRESET_COLORS = ["primary", "info", "success", "warning", "danger"]

function isPresetColor(color: string) {
  return PRESET_COLORS.includes(color)
}

interface ProgressProps {
  className?: string
  animated?: boolean
  striped?: boolean
  inactive?: boolean
  label?: ReactNode | boolean
  percent?: number
  color?: ProgressColor | ProgressColorString | string
  trackColor?: string
  textColor?: string
}

function Progress(props: ProgressProps) {
  const {
    className,
    animated,
    striped,
    inactive,
    label,
    color = ProgressColor.Primary,
    percent: percentProp = 0,
  } = props
  const percent = Math.min(Math.max(0, percentProp), 100)

  function renderLabel() {
    if (label === undefined) {
      return `${percent}%`
    } else if (!label) {
      return undefined
    }
    return label
  }

  const barStyle = useMemo(() => {
    const style: CSSProperties = {}
    style.width = `${percent}%`
    style.background = !inactive && isPresetColor(color) ? "" : color
    return style
  }, [inactive, percent, color])

  return (
    <View
      className={classNames(
        prefixClassname("progress"),
        {
          [prefixClassname("progress--inactive")]: inactive,
          [prefixClassname("progress--striped")]: !inactive && striped,
          [prefixClassname("progress--animated")]: !inactive && striped && animated,
          [prefixClassname("progress--primary")]: !inactive && color === ProgressColor.Primary,
          [prefixClassname("progress--info")]: !inactive && color === ProgressColor.Info,
          [prefixClassname("progress--success")]: !inactive && color === ProgressColor.Success,
          [prefixClassname("progress--warning")]: !inactive && color === ProgressColor.Warning,
          [prefixClassname("progress--danger")]: !inactive && color === ProgressColor.Danger,
        },
        className,
      )}
    >
      <View className={classNames(prefixClassname("progress__portion"))} style={barStyle}>
        {renderLabel()}
      </View>
    </View>
  )
}

export default Progress

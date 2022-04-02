import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { CSSProperties, ReactNode, useMemo } from "react"
import { prefixClassname } from "../styles"

type ProgressColor = "primary" | "info" | "success" | "warning" | "danger"

export interface ProgressProps extends ViewProps {
  animated?: boolean
  striped?: boolean
  inactive?: boolean
  label?: ReactNode | boolean
  percent?: number
  color?: ProgressColor
}

function Progress(props: ProgressProps) {
  const {
    className,
    animated,
    striped,
    inactive,
    label,
    color = "primary",
    percent: percentProp = 0,
    ...restProps
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

  const barStyle = useMemo<CSSProperties>(
    () => ({
      width: `${percent}%`,
    }),
    [percent],
  )

  return (
    <View
      className={classNames(
        prefixClassname("progress"),
        {
          [prefixClassname("progress--inactive")]: inactive,
          [prefixClassname("progress--striped")]: !inactive && striped,
          [prefixClassname("progress--animated")]: !inactive && striped && animated,
          [prefixClassname("progress--primary")]: !inactive && color === "primary",
          [prefixClassname("progress--info")]: !inactive && color === "info",
          [prefixClassname("progress--success")]: !inactive && color === "success",
          [prefixClassname("progress--warning")]: !inactive && color === "warning",
          [prefixClassname("progress--danger")]: !inactive && color === "danger",
        },
        className,
      )}
      {...restProps}
    >
      <View className={classNames(prefixClassname("progress__portion"))} style={barStyle}>
        {renderLabel()}
      </View>
    </View>
  )
}

export default Progress

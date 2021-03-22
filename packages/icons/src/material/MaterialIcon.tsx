import classNames from "classnames"
import { View } from "@tarojs/components"
import * as React from "react"
import { CSSProperties } from "react"

export enum MaterialIconTheme {
  Filled = "filled",
  Outlined = "outlined",
  Rounded = "rounded",
  Sharp = "sharp",
}

type MaterialIconThemeString = "filled" | "outlined" | "rounded" | "sharp";

interface MaterialIconProps {
  className?: string
  style?: CSSProperties
  theme?: MaterialIconTheme | MaterialIconThemeString
  children?: string
}

export default function MaterialIcon(props: MaterialIconProps) {
  const { className, style, theme = MaterialIconTheme.Filled, children } = props
  return (
    <View
      className={
        classNames(
          {
            ["material-icons"]: theme === MaterialIconTheme.Filled,
            [`material-icons-${theme}`]: theme !== MaterialIconTheme.Filled,
          },
          className,
        )}
      style={style}
      children={children}
    />
  )
}

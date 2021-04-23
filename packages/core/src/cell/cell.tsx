import { View } from "@tarojs/components"
import { ITouchEvent } from "@tarojs/components/types/common"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"

export enum CellSize {
  Medium = "medium",
  Large = "large",
}

type CellSizeString = "medium" | "large"

enum CellAlign {
  Start = "start",
  Center = "center",
  End = "end",
}

type CellAlignString = "start" | "center" | "end"

interface CellProps {
  className?: string
  size?: CellSize | CellSizeString
  align?: CellAlign | CellAlignString
  title?: ReactNode
  subtitle?: ReactNode
  startIcon?: ReactNode
  endIcon?: ReactNode
  bordered?: boolean
  clickable?: boolean
  children?: ReactNode
  onClick?: (event: ITouchEvent) => void
}

export default function Cell(props: CellProps) {
  const {
    className,
    size = CellSize.Medium,
    align,
    title,
    subtitle,
    clickable = false,
    bordered = true,
    startIcon,
    endIcon,
    children,
    onClick,
  } = props

  return (
    <View
      className={classNames(
        prefixClassname("cell"),
        {
          [prefixClassname("cell--start")]: align === CellAlign.Start,
          [prefixClassname("cell--center")]: align === CellAlign.Center,
          [prefixClassname("cell--end")]: align === CellAlign.End,
          [prefixClassname("cell--large")]: size === CellSize.Large,
          [prefixClassname("cell--clickable")]: clickable,
          [prefixClassname("cell--borderless")]: !bordered,
        },
        className,
      )}
      onClick={onClick}
    >
      {startIcon && <View className={prefixClassname("cell-start-icon")}>{startIcon}</View>}
      {title && (
        <View className={prefixClassname("cell__title")}>
          {title}
          {subtitle && <View className={prefixClassname("cell__subtitle")} children={subtitle} />}
        </View>
      )}
      <View
        className={classNames(prefixClassname("cell__value"), {
          [prefixClassname("cell__value--alone")]: !title,
        })}
      >
        {children}
      </View>
      {endIcon && <View className={prefixClassname("cell__end-icon")}>{endIcon}</View>}
    </View>
  )
}

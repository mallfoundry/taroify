import { cloneIconElement } from "@taroify/icons/utils"
import { ITouchEvent, View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { CSSProperties, ReactNode } from "react"
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

export interface CellProps {
  className?: string
  style?: CSSProperties
  size?: CellSize | CellSizeString
  align?: CellAlign | CellAlignString
  title?: ReactNode
  brief?: ReactNode
  leftIcon?: ReactNode
  icon?: ReactNode
  rightIcon?: ReactNode
  bordered?: boolean
  clickable?: boolean
  children?: ReactNode
  onClick?: (event: ITouchEvent) => void
}

function Cell(props: CellProps) {
  const {
    className,
    style,
    size = CellSize.Medium,
    align,
    title,
    brief,
    clickable = false,
    bordered = true,
    icon,
    rightIcon,
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
      style={style}
      onClick={onClick}
    >
      {icon && cloneIconElement(icon, { className: prefixClassname("cell__icon") })}
      {title && (
        <View className={prefixClassname("cell__title")}>
          {title}
          {brief && <View className={prefixClassname("cell__brief")} children={brief} />}
        </View>
      )}
      <View
        className={classNames(prefixClassname("cell__value"), {
          [prefixClassname("cell__value--alone")]: !title,
        })}
      >
        {children}
      </View>
      {rightIcon && cloneIconElement(rightIcon, { className: prefixClassname("cell__right-icon") })}
    </View>
  )
}

export default Cell

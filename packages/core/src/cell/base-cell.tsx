import { cloneIconElement } from "@taroify/icons/utils"
import { ITouchEvent, View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { CSSProperties, ReactNode, useContext } from "react"
import { prefixClassname } from "../styles"
import CellGroupContext from "./cell-group.context"
import { CellAlign, CellAlignString, CellSize, CellSizeString } from "./cell.shared"

export interface BaseCellProps {
  className?: string
  titleClassName?: string
  briefClassName?: string
  valueClassName?: string
  style?: CSSProperties
  size?: CellSize | CellSizeString
  align?: CellAlign | CellAlignString
  title?: ReactNode
  brief?: ReactNode
  icon?: ReactNode
  rightIcon?: ReactNode
  bordered?: boolean
  clickable?: boolean
  children?: ReactNode
  onClick?: (event: ITouchEvent) => void
}

function BaseCell(props: BaseCellProps) {
  const {
    className,
    titleClassName,
    briefClassName,
    valueClassName,
    style,
    size = CellSize.Medium,
    align,
    title,
    brief,
    clickable: clickableProp = false,
    bordered = true,
    icon,
    rightIcon,
    children,
    onClick,
  } = props

  const { clickable } = useContext(CellGroupContext)

  return (
    <View
      className={classNames(
        prefixClassname("cell"),
        {
          [prefixClassname("cell--start")]: align === CellAlign.Start,
          [prefixClassname("cell--center")]: align === CellAlign.Center,
          [prefixClassname("cell--end")]: align === CellAlign.End,
          [prefixClassname("cell--large")]: size === CellSize.Large,
          [prefixClassname("cell--clickable")]: clickableProp || clickable,
          [prefixClassname("cell--borderless")]: !bordered,
        },
        className,
      )}
      style={style}
      onClick={onClick}
    >
      {icon && cloneIconElement(icon, { className: prefixClassname("cell__icon") })}
      {title && (
        <View className={classNames(prefixClassname("cell__title"), titleClassName)}>
          {title}
          {brief && (
            <View
              className={classNames(prefixClassname("cell__brief"), briefClassName)}
              children={brief}
            />
          )}
        </View>
      )}
      {children && (
        <View
          className={classNames(
            prefixClassname("cell__value"),
            {
              [prefixClassname("cell__value--alone")]: !title,
            },
            valueClassName,
          )}
          children={children}
        />
      )}
      {rightIcon && cloneIconElement(rightIcon, { className: prefixClassname("cell__right-icon") })}
    </View>
  )
}

export default BaseCell

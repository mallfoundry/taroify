import { cloneIconElement } from "@taroify/icons/utils"
import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { ReactNode, useContext } from "react"
import { prefixClassname } from "../styles"
import CellGroupContext from "./cell-group.context"
import { CellAlign, CellSize } from "./cell.shared"

export interface BaseCellProps extends ViewProps {
  titleClassName?: string
  briefClassName?: string
  valueClassName?: string
  size?: CellSize
  align?: CellAlign
  title?: ReactNode
  brief?: ReactNode
  icon?: ReactNode
  rightIcon?: ReactNode
  bordered?: boolean
  required?: boolean
  clickable?: boolean
  children?: ReactNode
}

function BaseCell(props: BaseCellProps) {
  const {
    className,
    titleClassName,
    briefClassName,
    valueClassName,
    size = "medium",
    align,
    title,
    brief,
    clickable: clickableProp = false,
    required = false,
    bordered = true,
    icon,
    rightIcon,
    children,
    ...restProps
  } = props

  const { clickable } = useContext(CellGroupContext)

  return (
    <View
      className={classNames(
        prefixClassname("cell"),
        {
          [prefixClassname("cell--start")]: align === "start",
          [prefixClassname("cell--center")]: align === "center",
          [prefixClassname("cell--end")]: align === "end",
          [prefixClassname("cell--large")]: size === "large",
          [prefixClassname("cell--clickable")]: clickableProp || clickable,
          [prefixClassname("cell--required")]: required,
          [prefixClassname("cell--borderless")]: !bordered,
        },
        className,
      )}
      {...restProps}
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

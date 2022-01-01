import { cloneIconElement, isIconElement } from "@taroify/icons/utils"
import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { ReactNode, useContext } from "react"
import { prefixClassname } from "../styles"
import CellGroupContext from "./cell-group.context"
import { CellAlign, CellSize } from "./cell.shared"

export interface CellBaseProps extends ViewProps {
  bordered?: boolean
  required?: boolean
  clickable?: boolean
  size?: CellSize
  align?: CellAlign
  icon?: ReactNode
  rightIcon?: ReactNode
  children?: ReactNode
}

function CellBase(props: CellBaseProps) {
  const {
    className,
    size = "medium",
    align,
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
      {icon && isIconElement(icon)
        ? cloneIconElement(icon, { className: prefixClassname("cell__icon") })
        : icon}
      {children}
      {rightIcon && isIconElement(rightIcon)
        ? cloneIconElement(rightIcon, { className: prefixClassname("cell__right-icon") })
        : rightIcon}
    </View>
  )
}

export default CellBase

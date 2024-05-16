import { cloneIconElement, isIconElement } from "@taroify/icons/utils"
import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { useContext, useMemo } from "react"
import { ArrowLeft, ArrowRight, ArrowDown, ArrowUp } from "@taroify/icons"
import { prefixClassname } from "../styles"
import CellGroupContext from "./cell-group.context"
import { CellBaseProps, ArrowDirection } from "./cell.shared"

export const iconMap: Record<ArrowDirection, any> = {
  right: ArrowRight,
  left: ArrowLeft,
  up: ArrowUp,
  down: ArrowDown
}

function CellBase(props: CellBaseProps) {
  const {
    className,
    size = "medium",
    align,
    clickable: clickableProp = false,
    required = false,
    bordered = true,
    isLink = false,
    icon,
    arrowDirection = "right",
    rightIcon: rightIconProps,
    children,
    ...restProps
  } = props

  const { clickable } = useContext(CellGroupContext)
  const cellClickable = isLink || clickable || clickableProp

  const leftIcon = useMemo(() => {
    if (icon) {
      return isIconElement(icon)
        ? cloneIconElement(icon, { className: prefixClassname("cell__icon") })
        : icon
    }
    return null
  }, [icon])

  const rightIcon = useMemo(() => {
    if (rightIconProps) {
      return isIconElement(rightIconProps)
        ? cloneIconElement(rightIconProps, { className: prefixClassname("cell__right-icon") })
        : rightIconProps
    } else if (isLink && iconMap[arrowDirection] ) {
      const Icon = iconMap[arrowDirection]
      return <Icon className={ prefixClassname("cell__right-icon") } />
    }
    return null
  }, [rightIconProps, isLink, arrowDirection])
  return (
    <View
      className={classNames(
        prefixClassname("cell"),
        {
          [prefixClassname("cell--start")]: align === "start",
          [prefixClassname("cell--center")]: align === "center",
          [prefixClassname("cell--end")]: align === "end",
          [prefixClassname("cell--large")]: size === "large",
          [prefixClassname("cell--clickable")]: cellClickable,
          [prefixClassname("cell--required")]: required,
          [prefixClassname("cell--borderless")]: !bordered,
        },
        className,
      )}
      {...restProps}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </View>
  )
}

export default CellBase

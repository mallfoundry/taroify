import { View } from "@tarojs/components"
import * as React from "react"
import { ReactNode } from "react"
import classNames from "classnames"
import { prefixClassname } from "../styles"
import { ITouchEvent } from "@tarojs/components/types/common"

interface CellProps {
  className?: string
  label?: ReactNode
  endIcon?: ReactNode
  bordered?: boolean
  clickable?: boolean
  children?: ReactNode
  onClick?: (event: ITouchEvent) => void
}

export default function Cell(props: CellProps) {
  const { className, label, clickable = false, bordered = true, endIcon, children, onClick } = props
  return (
    <View
      className={classNames(
        prefixClassname("cell"),
        {
          [prefixClassname(`cell-clickable`)]: clickable,
          [prefixClassname(`cell-borderless`)]: !bordered,
        },
        className,
      )}
      onClick={onClick}>
      <View className={prefixClassname("cell-label")}>{label}</View>
      <View className={prefixClassname("cell-value")}>{children}</View>
      {
        endIcon && (
          <View className={prefixClassname("cell-end-icon")}>
            {endIcon}
          </View>
        )
      }
    </View>
  )
}

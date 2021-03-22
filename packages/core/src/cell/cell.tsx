import { View } from "@tarojs/components"
import * as React from "react"
import { ReactNode } from "react"
import classNames from "classnames"
import { prefixClassname } from "../styles"
import ArrowForwardIosOutlined from "@vant-taro/icons/ArrowForwardIosOutlined"

interface CellProps {
  className?: string
  label?: ReactNode
  arrow?: boolean
  endIcon?: ReactNode
  clickable?: boolean
  children?: ReactNode
}

export default function Cell(props: CellProps) {
  const { className, label, clickable = false, arrow = false, children } = props
  return (
    <View className={classNames(
      prefixClassname("cell"),
      {
        [prefixClassname(`cell-clickable`)]: clickable,
        // [prefixClassname(`col-offset-${offset}`)]: offset !== undefined,
      },
      className,
    )}>
      <View className={prefixClassname("cell-label")}>{label}</View>
      <View className={prefixClassname("cell-value")}>{children}</View>
      {
        arrow && (
          <View className={prefixClassname("cell-arrow")}>
            <ArrowForwardIosOutlined color="inherit" size="inherit" />
          </View>
        )
      }
    </View>
  )
}

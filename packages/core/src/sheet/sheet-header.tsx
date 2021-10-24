import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { CSSProperties, ReactNode } from "react"
import { prefixClassname } from "../styles"

export interface SheetHeaderProps {
  className?: string
  style?: CSSProperties
  title?: ReactNode
  children?: ReactNode
}

export default function SheetHeader(props: SheetHeaderProps) {
  const { className, style, title, children } = props
  return (
    <View className={classNames(prefixClassname("sheet__header"), className)} style={style}>
      {title && <View className={classNames(prefixClassname("sheet__title"))} children={title} />}
      {children && (
        <View className={classNames(prefixClassname("sheet__description"))} children={children} />
      )}
    </View>
  )
}

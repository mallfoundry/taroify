import { View } from "@tarojs/components"
import type { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import type { ReactNode } from "react"
import { prefixClassname } from "../styles"

export interface SheetHeaderProps extends ViewProps {
  title?: ReactNode
  children?: ReactNode
}

export default function SheetHeader(props: SheetHeaderProps) {
  const { className, title, children, ...restProps } = props
  return (
    <View className={classNames(prefixClassname("sheet__header"), className)} {...restProps}>
      {title && <View className={classNames(prefixClassname("sheet__title"))} children={title} />}
      {children && (
        <View className={classNames(prefixClassname("sheet__description"))} children={children} />
      )}
    </View>
  )
}

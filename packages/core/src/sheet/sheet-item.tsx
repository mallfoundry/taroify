import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import Loading from "../loading"
import { prefixClassname } from "../styles"

export interface SheetItemProps extends ViewProps {
  loading?: boolean
  disabled?: boolean
  children?: ReactNode
}

export default function SheetItem(props: SheetItemProps) {
  const { className, loading, disabled, children, ...restProps } = props
  return (
    <View
      className={classNames(
        prefixClassname("sheet__item"),
        {
          [prefixClassname("sheet__item--loading")]: loading,
          [prefixClassname("sheet__item--disabled")]: disabled,
        },
        className,
      )}
      children={loading ? <Loading /> : children}
      {...restProps}
    />
  )
}

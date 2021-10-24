import { ITouchEvent, View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { CSSProperties, ReactNode } from "react"
import Loading from "../loading"
import { prefixClassname } from "../styles"

export interface SheetItemProps {
  className?: string
  style?: CSSProperties
  loading?: boolean
  disabled?: boolean
  children?: ReactNode

  onClick?(event: ITouchEvent): void
}

export default function SheetItem(props: SheetItemProps) {
  const { className, style, loading, disabled, children, onClick } = props
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
      style={style}
      children={loading ? <Loading /> : children}
      onClick={onClick}
    />
  )
}

import { ITouchEvent, View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"

export interface PickerOptionProps {
  className?: string
  value?: any
  disabled?: boolean
  children?: ReactNode

  onClick?(event: ITouchEvent): void
}

export default function PickerOption(props: PickerOptionProps) {
  const { className, disabled, children, onClick } = props

  return (
    <View
      className={classNames(
        prefixClassname("picker-column__item"),
        {
          [prefixClassname("picker-column__item--disabled")]: disabled,
        },
        className,
      )}
      style={{ height: "44px" }}
      children={children}
      onClick={onClick}
    />
  )
}

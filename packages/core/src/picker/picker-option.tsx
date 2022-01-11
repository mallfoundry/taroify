import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { CSSProperties, ReactNode } from "react"
import { prefixClassname } from "../styles"

export interface PickerOptionProps extends ViewProps {
  className?: string
  style?: CSSProperties
  value?: any
  label?: ReactNode
  disabled?: boolean
  children?: ReactNode
}

export default function PickerOption(props: PickerOptionProps) {
  const { className, disabled, ...restProps } = props

  return (
    <View
      className={classNames(
        prefixClassname("ellipsis"),
        prefixClassname("picker-option"),
        {
          [prefixClassname("picker-option--disabled")]: disabled,
        },
        className,
      )}
      {...restProps}
    />
  )
}

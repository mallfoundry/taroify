import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { CSSProperties, isValidElement, ReactNode, useMemo } from "react"
import { prefixClassname } from "../styles"
import { isTextElement } from "../utils/validate"

export interface PickerOptionProps extends ViewProps {
  className?: string
  style?: CSSProperties
  value?: any
  label?: ReactNode
  disabled?: boolean
  children?: ReactNode
}

export default function PickerOption(props: PickerOptionProps) {
  const {
    className,
    disabled,
    // @ts-ignore
    index,
    value,
    label,
    children: childrenProp,
    ...restProps
  } = props

  const children = useMemo(() => {
    if (isValidElement(childrenProp) || isTextElement(childrenProp)) {
      return childrenProp
    }
    if (isValidElement(label) || isTextElement(label)) {
      return label
    }
  }, [childrenProp, label])

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
      children={children}
      {...restProps}
    />
  )
}

import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"

interface PickerOptionProps {
  className?: string
  children?: ReactNode
}

export default function PickerOption(props: PickerOptionProps) {
  const { className, children } = props

  return (
    <View
      className={classNames(prefixClassname("picker-column__item"), className)}
      style={{ height: "44px" }}
      children={children}
    />
  )
}

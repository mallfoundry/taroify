import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"

interface FieldButtonProps {
  className?: string
  children: ReactNode
}

function FieldButton(props: FieldButtonProps) {
  const { className, children } = props
  return (
    <View className={classNames(prefixClassname("field__button"), className)} children={children} />
  )
}

export default FieldButton

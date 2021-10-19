import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"

interface DialogHeaderProps {
  className?: string
  children?: ReactNode
}

export default function DialogHeader(props: DialogHeaderProps) {
  const { className, children } = props
  return (
    <View
      className={classNames(prefixClassname("dialog__header"), className)}
      children={children}
    />
  )
}

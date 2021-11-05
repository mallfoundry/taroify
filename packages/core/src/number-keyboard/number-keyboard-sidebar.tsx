import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"

interface NumberKeyboardSidebarProps extends ViewProps {
  children?: ReactNode
}

function NumberKeyboardSidebar(props: NumberKeyboardSidebarProps) {
  const { className, ...restProps } = props
  return (
    <View
      className={classNames(prefixClassname("number-keyboard__sidebar"), className)}
      {...restProps}
    />
  )
}

export default NumberKeyboardSidebar

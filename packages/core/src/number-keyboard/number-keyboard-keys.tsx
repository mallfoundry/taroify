import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"

interface NumberKeyboardKeysProps extends ViewProps {
  className?: string
  children?: ReactNode
}

function NumberKeyboardKeys(props: NumberKeyboardKeysProps) {
  const { className, children, ...restProps } = props
  return (
    <View
      className={classNames(prefixClassname("number-keyboard__keys"), className)}
      children={children}
      {...restProps}
    />
  )
}

export default NumberKeyboardKeys

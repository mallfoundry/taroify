import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"

interface NumberKeyboardKeysProps {
  className?: string
  children?: ReactNode
}

function NumberKeyboardKeys(props: NumberKeyboardKeysProps) {
  const { className, children } = props
  return (
    <View
      className={classNames(prefixClassname("number-keyboard__keys"), className)}
      children={children}
    />
  )
}

export default NumberKeyboardKeys

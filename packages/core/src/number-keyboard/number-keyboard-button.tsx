import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { ReactNode, useContext } from "react"
import { prefixClassname } from "../styles"
import { NumberKeyboardKeyCode } from "./number-keyboard-key.shared"
import NumberKeyboardContext from "./number-keyboard.context"

export enum NumberKeyboardButtonType {
  Hide = "hide",
}

export type NumberKeyboardButtonTypeString = "hide"

export interface NumberKeyboardButtonProps {
  type?: NumberKeyboardButtonType | NumberKeyboardButtonTypeString
  children?: ReactNode
}

function NumberKeyboardButton(props: NumberKeyboardButtonProps) {
  const { type = NumberKeyboardButtonType.Hide, children } = props

  const { onKeyPress } = useContext(NumberKeyboardContext)

  function onClick() {
    if (type === NumberKeyboardButtonType.Hide) {
      onKeyPress?.(children as string, NumberKeyboardKeyCode.KeyboardHide)
    }
  }

  return (
    <View
      className={classNames({
        [prefixClassname("number-keyboard__hide")]: type === NumberKeyboardButtonType.Hide,
      })}
      children={children}
      onClick={onClick}
    />
  )
}

export default NumberKeyboardButton

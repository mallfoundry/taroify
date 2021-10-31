import { ITouchEvent, View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { ReactNode, useContext } from "react"
import { prefixClassname } from "../styles"
import NumberKeyboardContext from "./number-keyboard.context"

export type NumberKeyboardButtonType = "hide"

export interface NumberKeyboardButtonProps extends ViewProps {
  type?: NumberKeyboardButtonType
  children?: ReactNode
}

function NumberKeyboardButton(props: NumberKeyboardButtonProps) {
  const { className, type = "hide", children, onClick, ...restProps } = props

  const { onKeyPress } = useContext(NumberKeyboardContext)

  function handleClick(event: ITouchEvent) {
    onClick?.(event)
    if (type === "hide") {
      onKeyPress?.(children as string, "keyboard-hide")
    }
  }

  return (
    <View
      className={classNames(
        {
          [prefixClassname("number-keyboard__hide")]: type === "hide",
        },
        className,
      )}
      children={children}
      onClick={handleClick}
      {...restProps}
    />
  )
}

export default NumberKeyboardButton

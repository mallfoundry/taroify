import { ITouchEvent, View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { useContext, useState } from "react"
import { prefixClassname } from "../styles"
import { useTouch } from "../utils/touch"
import {
  NumberKeyboardKeyCode,
  NumberKeyboardKeyCodeString,
  NumberKeyboardKeyOnPress,
} from "./number-keyboard-key.shared"
import NumberKeyboardContext from "./number-keyboard.context"

export enum NumberKeyboardKeySize {
  Small = "small",
  Medium = "medium",
  Large = "large",
}

type NumberKeyboardKeySizeString = "small" | "medium" | "large"

export enum NumberKeyboardKeyColor {
  Blue = "blue",
}

type NumberKeyboardKeyColorString = "blue"

export interface NumberKeyboardKeyProps {
  className?: string
  code?: NumberKeyboardKeyCode | NumberKeyboardKeyCodeString
  size?: NumberKeyboardKeySize | NumberKeyboardKeySizeString
  color?: NumberKeyboardKeyColor | NumberKeyboardKeyColorString
  wider?: boolean
  children?: string | number

  onPress?: NumberKeyboardKeyOnPress
}

function NumberKeyboardKey(props: NumberKeyboardKeyProps) {
  const { wider, code = NumberKeyboardKeyCode.Extra, size, color, children, onPress } = props
  const { onKeyPress } = useContext(NumberKeyboardContext)
  const value = children ?? ""
  const [active, setActive] = useState(false)
  const touch = useTouch()

  const onTouchStart = (event: ITouchEvent) => {
    touch.start(event)
    setActive(true)
  }

  const onTouchMove = (event: ITouchEvent) => {
    touch.move(event)

    if (touch.direction) {
      setActive(false)
    }
  }

  const onTouchEnd = (event: ITouchEvent) => {
    if (active) {
      // eliminate tap delay on safari
      // see: https://github.com/youzan/vant/issues/6836
      if (!children) {
        event.preventDefault()
      }

      setActive(false)
      onPress?.(value, code ?? value)
      onKeyPress?.(value, code ?? value)
    }
  }

  const renderContent = () => {
    switch (code) {
      case NumberKeyboardKeyCode.Backspace:
        return children ?? <View className="taroify-backspace" />
      case NumberKeyboardKeyCode.KeyboardHide:
        return children ?? <View className="taroify-keyboard-hide" />
      default:
        return children
    }
  }

  return (
    <View
      className={classNames(prefixClassname("key__wrapper"), {
        [prefixClassname("key__wrapper--wider")]: wider,
      })}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchEnd}
    >
      <View
        className={classNames(prefixClassname("key"), {
          [prefixClassname("key--active")]: active,
          [prefixClassname("key--large")]: size === NumberKeyboardKeySize.Large,
          [prefixClassname("key--blue")]: color === NumberKeyboardKeyColor.Blue,
        })}
      >
        {renderContent()}
      </View>
    </View>
  )
}

export default NumberKeyboardKey

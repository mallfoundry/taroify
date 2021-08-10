import { View } from "@tarojs/components"
import * as React from "react"
import { Children, isValidElement, ReactElement, ReactNode, useContext, useMemo } from "react"
import { prefixClassname } from "../styles"
import NumberKeyboardButton, {
  NumberKeyboardButtonProps,
  NumberKeyboardButtonType,
} from "./number-keyboard-button"
import NumberKeyboardContext from "./number-keyboard.context"

interface NumberKeyboardHeaderChildren {
  left?: ReactNode
  title?: ReactNode
  right?: ReactNode
}

function useNumberKeyboardHeaderChildren(children?: ReactNode) {
  const { title } = useContext(NumberKeyboardContext)
  return useMemo(() => {
    const __children__: NumberKeyboardHeaderChildren = {
      title: title && (
        <View className={prefixClassname("number-keyboard__title")} children={title} />
      ),
    }

    Children.forEach(children, (child: ReactNode) => {
      if (isValidElement(child)) {
        const element = child as ReactElement

        const elementType = element.type
        if (elementType === NumberKeyboardButton) {
          const { type } = element.props as NumberKeyboardButtonProps
          if (type === undefined || type === NumberKeyboardButtonType.Hide) {
            __children__.right = element
          }
        }
      }
    })

    return __children__
  }, [children, title])
}

export interface NumberKeyboardHeaderProps {
  children?: ReactNode
}

function NumberKeyboardHeader(props: NumberKeyboardHeaderProps) {
  const { left, title, right } = useNumberKeyboardHeaderChildren(props.children)

  return (
    <View className={prefixClassname("number-keyboard__header")}>
      {left}
      {title}
      {right}
    </View>
  )
}

export default NumberKeyboardHeader

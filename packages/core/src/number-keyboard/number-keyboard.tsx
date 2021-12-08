import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { Children, cloneElement, isValidElement, ReactElement, ReactNode, useMemo } from "react"
import { prefixClassname } from "../styles"
import Transition from "../transition"
import NumberKeyboardHeader from "./number-keyboard-header"
import NumberKeyboardKey, { NumberKeyboardKeyProps } from "./number-keyboard-key"
import {
  isNumberKeyboardKeyElement,
  NumberKeyboardKeyCode,
  NumberKeyboardKeyOnPress,
} from "./number-keyboard-key.shared"
import NumberKeyboardKeys from "./number-keyboard-keys"
import NumberKeyboardSidebar from "./number-keyboard-sidebar"
import NumberKeyboardContext from "./number-keyboard.context"

function createBasicKeys(random: boolean): ReactNode[] {
  const keys = Array(9)
    .fill("")
    .map((_, i) => <NumberKeyboardKey key={i + 1} children={i + 1} />)

  if (random) {
    keys.sort(() => (Math.random() > 0.5 ? 1 : -1))
  }

  return keys
}

export function createExtraNumberKeyboardKey(extraKey: ReactNode): ReactNode {
  if (_.isString(extraKey) || _.isNumber(extraKey)) {
    return <NumberKeyboardKey key={extraKey} children={extraKey} />
  } else if (isNumberKeyboardKeyElement(extraKey)) {
    const element = extraKey as ReactElement
    const elementProps = element.props as NumberKeyboardKeyProps
    return cloneElement(extraKey as ReactElement, {
      key: element.key ?? elementProps.children ?? elementProps.code,
    })
  }
  return undefined
}

function createCustomKeys(extraKey?: ReactNode | [ReactNode, ReactNode]): ReactNode[] {
  if (extraKey === undefined) {
    return [
      <NumberKeyboardKey key="keyboard-hide" code="keyboard-hide" />,
      <NumberKeyboardKey key={0} children={0} />,
      <NumberKeyboardKey key="backspace" code="backspace" />,
    ]
  }

  if (_.isString(extraKey) || _.isNumber(extraKey) || isNumberKeyboardKeyElement(extraKey)) {
    return [
      createExtraNumberKeyboardKey(extraKey),
      <NumberKeyboardKey key={0} children={0} />,
      <NumberKeyboardKey key="backspace" code="backspace" />,
    ]
  }

  if (_.isArray(extraKey) && _.size(extraKey) === 1) {
    return [
      createExtraNumberKeyboardKey(extraKey[0]),
      <NumberKeyboardKey key={0} wider children={0} />,
    ]
  }

  if (_.isArray(extraKey) && _.size(extraKey) === 2) {
    const wider = extraKey.filter((key) => key !== undefined).length === 1
    return [
      createExtraNumberKeyboardKey(extraKey[0]),
      <NumberKeyboardKey key={0} wider={wider} children={0} />,
      createExtraNumberKeyboardKey(extraKey[1]),
    ]
  }

  return []
}

interface NumberKeyboardChildren {
  header?: ReactNode
  sidebar?: ReactNode
}

function useNumberKeyboardChildren(
  children?: ReactNode,
  title?: ReactNode,
): NumberKeyboardChildren {
  return useMemo(() => {
    const __children__: NumberKeyboardChildren = {
      sidebar: undefined,
    }

    Children.forEach(children, (child: ReactNode) => {
      if (isValidElement(child)) {
        const element = child as ReactElement

        const elementType = element.type
        if (elementType === NumberKeyboardHeader) {
          __children__.header = element
        }

        if (elementType === NumberKeyboardSidebar) {
          __children__.sidebar = element
        }
      }
    })

    if (title && !__children__.header) {
      __children__.header = <NumberKeyboardHeader />
    }

    return __children__
  }, [children, title])
}

export interface NumberKeyboardProps extends ViewProps {
  className?: string
  open?: boolean
  title?: ReactNode
  extraKey?: ReactNode | [ReactNode, ReactNode]
  random?: boolean
  children?: ReactNode

  onKeyPress?: NumberKeyboardKeyOnPress

  onBackspace?(): void

  onHide?(): void
}

function NumberKeyboard(props: NumberKeyboardProps) {
  const {
    className,
    open,
    title,
    extraKey,
    random = false,
    children: childrenProp,
    onKeyPress,
    onBackspace,
    onHide,
    ...restProps
  } = props
  const { header, sidebar } = useNumberKeyboardChildren(childrenProp, title)

  const basicKeys = useMemo(() => createBasicKeys(random), [random])
  const keys = useMemo(() => [...basicKeys, ...createCustomKeys(extraKey)], [basicKeys, extraKey])

  const handleKeyPress = (value: string | number, code: NumberKeyboardKeyCode) => {
    onKeyPress?.(value, code)
    if (code === "backspace") {
      onBackspace?.()
    } else if (code === "keyboard-hide") {
      onHide?.()
    }
  }
  return (
    <NumberKeyboardContext.Provider
      value={{
        title,
        onKeyPress: handleKeyPress,
      }}
    >
      <Transition in={open} appear name="slide-up">
        <View
          className={classNames(
            prefixClassname("number-keyboard"),
            {
              [prefixClassname("number-keyboard--with-title")]: header,
            },
            className,
          )}
          {...restProps}
        >
          {header}
          <View className={prefixClassname("number-keyboard__body")}>
            <NumberKeyboardKeys children={keys} />
            {sidebar}
          </View>
        </View>
      </Transition>
    </NumberKeyboardContext.Provider>
  )
}

export default NumberKeyboard

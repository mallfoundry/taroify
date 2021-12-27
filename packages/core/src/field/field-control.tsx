import { Input as TaroInput } from "@tarojs/components"
import { InputProps } from "@tarojs/components/types/Input"
import * as React from "react"
import { Children, cloneElement, isValidElement, ReactElement, ReactNode, useMemo } from "react"
import Input from "../input"

interface FieldControlProps {
  name?: string
  value?: any
  children?: ReactNode

  onChange?(value: any): void

  onBlur?(value: any): void
}

function FieldControl(props: FieldControlProps): JSX.Element {
  const {
    name,
    value,
    children = <Input />,
    onChange: onDelegatingChange,
    onBlur: onDelegatingBlur,
  } = props

  return useMemo<ReactNode>(
    () =>
      Children.map(children, (child: ReactNode) => {
        if (!isValidElement(child)) {
          return child
        }

        const element = child as ReactElement
        const { props: elementProps, type: elementType } = element as ReactElement<InputProps>
        const { onBlur, onInput } = elementProps
        if (elementType === TaroInput || elementType === Input) {
          return cloneElement<InputProps>(element, {
            name,
            value,
            onInput: (e) => {
              onInput?.(e)
              onDelegatingChange?.(e.detail.value)
            },
            onBlur: (e) => {
              onBlur?.(e)
              onDelegatingBlur?.(e.detail.value)
            },
          })
        }

        return element
      }),
    [children, name, onDelegatingBlur, onDelegatingChange, value],
  ) as JSX.Element
}

export default FieldControl

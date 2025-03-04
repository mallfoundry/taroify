import { useUncontrolled } from "@taroify/hooks"
import { View } from "@tarojs/components"
import type { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import type { ReactNode } from "react"
import { prefixClassname } from "../styles"
import RadioGroupContext from "./radio-group.context"
import type { RadioGroupDirection } from "./radio-group.shared"

export interface RadioGroupProps<T = any> extends ViewProps {
  defaultValue?: T
  value?: T
  disabled?: boolean
  direction?: RadioGroupDirection
  size?: number
  children?: ReactNode

  onChange?(value: T): void
}

function RadioGroup<T = any>(props: RadioGroupProps<T>) {
  const {
    className,
    defaultValue,
    value: valueProp,
    disabled,
    direction = "vertical",
    size,
    children,
    onChange: onChangeProp,
    ...restProps
  } = props

  const { value, setValue } = useUncontrolled({
    value: valueProp,
    defaultValue,
    onChange: onChangeProp,
  })

  return (
    <RadioGroupContext.Provider
      value={{
        value,
        disabled,
        direction,
        size,
        onChange: setValue,
      }}
    >
      <View
        className={classNames(
          prefixClassname("radio-group"),
          prefixClassname(`radio-group--${direction}`),
          className,
        )}
        children={children}
        {...restProps}
      />
    </RadioGroupContext.Provider>
  )
}

export default RadioGroup

import { useUncontrolled } from "@taroify/hooks"
import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"
import RadioGroupContext from "./radio-group.context"
import { RadioGroupDirection } from "./radio-group.shared"

export interface RadioGroupProps extends ViewProps {
  defaultValue?: any
  value?: any
  disabled?: boolean
  direction?: RadioGroupDirection
  size?: number
  children?: ReactNode

  onChange?(value: any): void
}

function RadioGroup(props: RadioGroupProps) {
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

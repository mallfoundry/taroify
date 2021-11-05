import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"
import RadioGroupContext from "./radio-group.context"
import { RadioGroupDirection } from "./radio-group.shared"

interface RadioGroupProps extends ViewProps {
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
    value,
    disabled,
    direction = "vertical",
    size,
    children,
    onChange,
    ...restProps
  } = props
  return (
    <RadioGroupContext.Provider
      value={{
        value,
        disabled,
        direction,
        size,
        onChange,
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

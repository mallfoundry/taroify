import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"
import RadioGroupContext from "./radio-group.context"
import { RadioGroupDirection, RadioGroupDirectionString } from "./radio-group.shared"

interface RadioGroupProps {
  className?: string
  value?: any
  disabled?: boolean
  direction?: RadioGroupDirection | RadioGroupDirectionString
  size?: number
  children?: ReactNode

  onChange?(value: any): void
}

function RadioGroup(props: RadioGroupProps) {
  const {
    className,
    value,
    disabled,
    direction = RadioGroupDirection.Vertical,
    size,
    children,
    onChange,
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
      />
    </RadioGroupContext.Provider>
  )
}

export default RadioGroup

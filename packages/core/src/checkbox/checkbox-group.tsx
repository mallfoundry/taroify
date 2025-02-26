import { useUncontrolled } from "@taroify/hooks"
import { View } from "@tarojs/components"
import type { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import type { ReactNode } from "react"
import { prefixClassname } from "../styles"
import CheckboxGroupContext from "./checkbox-group.context"
import type { CheckboxGroupDirection } from "./checkbox-group.shared"

export interface CheckboxGroupProps<T = any> extends ViewProps {
  defaultValue?: T[]
  value?: T[]
  disabled?: boolean
  max?: number
  direction?: CheckboxGroupDirection
  children?: ReactNode

  onChange?(value: T[]): void
}

function CheckboxGroup<T = any>(props: CheckboxGroupProps<T>) {
  const {
    defaultValue,
    value: valueProp,
    disabled,
    max,
    direction = "vertical",
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
    <CheckboxGroupContext.Provider
      value={{
        value,
        max,
        disabled,
        direction,
        onChange: setValue,
      }}
    >
      <View
        className={classNames(prefixClassname("checkbox-group"), {
          [prefixClassname("checkbox-group--horizontal")]: direction === "horizontal",
          [prefixClassname("checkbox-group--vertical")]: direction === "vertical",
        })}
        children={children}
        {...restProps}
      />
    </CheckboxGroupContext.Provider>
  )
}

export default CheckboxGroup

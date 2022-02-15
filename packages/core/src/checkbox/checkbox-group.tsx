import { useUncontrolled } from "@taroify/hooks"
import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"
import CheckboxGroupContext from "./checkbox-group.context"
import { CheckboxGroupDirection } from "./checkbox-group.shared"

export interface CheckboxGroupProps extends ViewProps {
  defaultValue?: any[]
  value?: any[]
  max?: number
  direction?: CheckboxGroupDirection
  children?: ReactNode

  onChange?(value: any[]): void
}

function CheckboxGroup(props: CheckboxGroupProps) {
  const {
    defaultValue,
    value: valueProp,
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

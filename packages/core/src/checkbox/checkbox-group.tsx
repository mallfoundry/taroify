import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"
import { useValue } from "../utils/state"
import CheckboxGroupContext from "./checkbox-group.context"

export type CheckboxGroupDirection = "horizontal" | "vertical"

interface CheckboxGroupProps {
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
  } = props

  const [value, onChange] = useValue(valueProp, { defaultValue, onChange: onChangeProp })

  return (
    <CheckboxGroupContext.Provider
      value={{
        value,
        max,
        onChange,
      }}
    >
      <View
        className={classNames(
          prefixClassname("checkbox-group"),
          prefixClassname(`checkbox-group--${direction}`),
        )}
        children={children}
      />
    </CheckboxGroupContext.Provider>
  )
}

export default CheckboxGroup

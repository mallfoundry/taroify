import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"
import CheckboxGroupContext from "./checkbox-group.context"

export enum CheckboxGroupDirection {
  Horizontal = "horizontal",
  Vertical = "vertical",
}

export type CheckboxGroupDirectionString = "horizontal" | "vertical"

interface CheckboxGroupProps {
  value?: any[]
  max?: number
  direction?: CheckboxGroupDirection | CheckboxGroupDirectionString
  children?: ReactNode

  onChange?(value: any[]): void
}

function CheckboxGroup(props: CheckboxGroupProps) {
  const { value, max, direction = CheckboxGroupDirection.Vertical, children, onChange } = props
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

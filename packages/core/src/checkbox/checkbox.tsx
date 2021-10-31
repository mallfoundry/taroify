import { Success } from "@taroify/icons"
import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { ReactNode, useContext } from "react"
import { prefixClassname } from "../styles"
import { addUnitPx } from "../utils/format/unit"
import CheckboxGroupContext from "./checkbox-group.context"
import { CheckboxShape } from "./checkbox.shared"

export interface CheckboxProps extends ViewProps {
  name?: any
  checked?: boolean
  disabled?: boolean
  shape?: CheckboxShape
  icon?: ReactNode
  size?: number
  children?: ReactNode

  onChange?(checked: boolean): void
}

export default function Checkbox(props: CheckboxProps) {
  const {
    className,
    name,
    checked: checkedProp,
    disabled,
    shape = "round",
    icon = <Success />,
    size,
    children,
    onChange,
    ...restProps
  } = props

  const { value: names = [], max: namesMax = 0, onChange: onNamesChange } = useContext(
    CheckboxGroupContext,
  )
  const checked = checkedProp || (name && names?.includes(name))

  function handleClick() {
    if (disabled) {
      return
    }
    onChange?.(!checked)

    if (name) {
      if (names?.includes(name)) {
        onNamesChange?.(names.filter((aName) => aName !== name))
      } else if (namesMax === 0 || names.length < namesMax) {
        onNamesChange?.([...names, name])
      }
    }
  }

  return (
    <View
      className={classNames(prefixClassname("checkbox"), className)}
      onClick={handleClick}
      {...restProps}
    >
      <View
        className={classNames(
          prefixClassname("checkbox__icon"),
          prefixClassname(`checkbox__icon--${shape}`),
          {
            [prefixClassname("checkbox__icon--disabled")]: disabled,
            [prefixClassname("checkbox__icon--checked")]: checked,
          },
        )}
        style={{ fontSize: size ? addUnitPx(size) : "" }}
        children={icon}
      />
      {children && (
        <View
          className={classNames(prefixClassname("checkbox__label"), {
            [prefixClassname("checkbox__label--disabled")]: disabled,
          })}
          children={children}
        />
      )}
    </View>
  )
}

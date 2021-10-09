import { Success } from "@taroify/icons"
import { cloneIconElement } from "@taroify/icons/utils"
import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { ReactNode, useContext, useMemo } from "react"
import { prefixClassname } from "../styles"
import { addUnitPx } from "../utils/format/unit"
import CheckboxGroupContext from "./checkbox-group.context"

enum CheckboxShape {
  Square = "square",
  Round = "round",
}

type CheckboxShapeString = "square" | "round"

export interface CheckboxProps {
  className?: string
  name?: any
  checked?: boolean
  disabled?: boolean
  shape?: CheckboxShape | CheckboxShapeString
  icon?: ReactNode
  color?: string
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
    shape = CheckboxShape.Round,
    icon = <Success />,
    color,
    size,
    children,
    onChange,
  } = props

  const { value: names = [], max: namesMax = 0, onChange: onNamesChange } = useContext(
    CheckboxGroupContext,
  )
  const checked = checkedProp || (name && names?.includes(name))

  const iconStyle = useMemo(() => {
    if (color && checked && !disabled) {
      return {
        borderColor: color,
        backgroundColor: color,
      }
    }
    return {
      borderColor: "",
      backgroundColor: "",
    }
  }, [checked, color, disabled])

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
    <View className={classNames(prefixClassname("checkbox"), className)} onClick={handleClick}>
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
        children={cloneIconElement(icon, { style: iconStyle })}
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

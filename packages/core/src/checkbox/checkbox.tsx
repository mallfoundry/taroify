import { useUncontrolled } from "@taroify/hooks"
import { Success } from "@taroify/icons"
import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { ReactNode, useContext } from "react"
import { prefixClassname } from "../styles"
import { addUnitPx } from "../utils/format/unit"
import CheckboxGroupContext from "./checkbox-group.context"
import { CheckboxShape } from "./checkbox.shared"

export interface CheckboxProps extends ViewProps {
  name?: any
  defaultChecked?: boolean
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
    defaultChecked,
    checked: checkedProp,
    disabled,
    shape = "round",
    icon = <Success />,
    size,
    children,
    onChange: onChangeProp,
    ...restProps
  } = props

  const { value: names, max: namesMax = 0, direction, onChange: onNamesChange } = useContext(
    CheckboxGroupContext,
  )

  const { value: checked, setValue } = useUncontrolled({
    value: checkedProp ?? names?.includes(name),
    defaultValue: defaultChecked,
    onChange: onChangeProp,
  })

  function onClick() {
    if (disabled) {
      return
    }

    setValue(!checked)

    if (name) {
      if (names?.includes(name)) {
        onNamesChange?.(names.filter((aName) => aName !== name))
      } else if (namesMax === 0 || _.size(names) < namesMax) {
        onNamesChange?.([..._.toArray(names), name])
      }
    }
  }

  return (
    <View
      className={classNames(
        prefixClassname("checkbox"),
        {
          [prefixClassname("checkbox--horizontal")]: direction === "horizontal",
          [prefixClassname("checkbox--vertical")]: direction === "vertical",
        },
        className,
      )}
      onClick={onClick}
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

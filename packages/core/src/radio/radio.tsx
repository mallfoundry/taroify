import { Success } from "@taroify/icons"
import { cloneIconElement } from "@taroify/icons/utils"
import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { ReactNode, useContext, useMemo } from "react"
import { prefixClassname } from "../styles"
import { addUnitPx } from "../utils/format/unit"
import RadioGroupContext from "./radio-group.context"
import { RadioGroupDirection } from "./radio-group.shared"

enum RadioShape {
  Square = "square",
  Round = "round",
}

type RadioShapeString = "square" | "round"

export interface RadioProps {
  className?: string
  name?: any
  disabled?: boolean
  shape?: RadioShape | RadioShapeString
  icon?: ReactNode
  color?: string
  size?: number
  children?: ReactNode
}

export default function Radio(props: RadioProps) {
  const {
    className,
    name,
    disabled: disabledProp,
    shape = RadioShape.Round,
    icon = <Success />,
    color: colorProp,
    size: sizeProp,
    children,
  } = props

  const {
    value,
    direction,
    disabled: disabledGroup,
    color: colorGroup,
    size: sizeGroup,
    onChange,
  } = useContext(RadioGroupContext)

  const color = colorProp ?? colorGroup

  const size = sizeProp ?? sizeGroup

  const disabled = disabledProp || disabledGroup

  const checked = name === value

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
    if (!disabled && name !== value) {
      onChange?.(name)
    }
  }

  return (
    <View
      className={classNames(
        prefixClassname("radio"),
        {
          [prefixClassname("radio--horizontal")]: direction === RadioGroupDirection.Horizontal,
        },
        className,
      )}
      onClick={handleClick}
    >
      <View
        className={classNames(
          prefixClassname("radio__icon"),
          prefixClassname(`radio__icon--${shape}`),
          {
            [prefixClassname("radio__icon--disabled")]: disabled,
            [prefixClassname("radio__icon--checked")]: checked,
          },
        )}
        style={{ fontSize: size ? addUnitPx(size) : "" }}
        children={cloneIconElement(icon, { style: iconStyle })}
      />
      {children && (
        <View
          className={classNames(prefixClassname("radio__label"), {
            [prefixClassname("radio__label--disabled")]: disabled,
          })}
          children={children}
        />
      )}
    </View>
  )
}

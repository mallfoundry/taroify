import { Success } from "@taroify/icons"
import { type ITouchEvent, View } from "@tarojs/components"
import type { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { type ReactNode, useContext } from "react"
import { prefixClassname } from "../styles"
import { addUnitPx } from "../utils/format/unit"
import RadioGroupContext from "./radio-group.context"
import type { RadioShape } from "./radio.shared"

export interface RadioProps extends ViewProps {
  className?: string
  name?: any
  disabled?: boolean
  shape?: RadioShape
  icon?: ReactNode
  size?: number
  children?: ReactNode
}

export default function Radio(props: RadioProps) {
  const {
    className,
    name,
    disabled: disabledProp,
    shape = "round",
    icon = <Success />,
    size: sizeProp,
    children,
    onClick,
    ...restProps
  } = props

  const {
    value,
    direction,
    disabled: disabledGroup,
    size: sizeGroup,
    onChange,
  } = useContext(RadioGroupContext)

  const size = sizeProp ?? sizeGroup

  const disabled = disabledProp ?? disabledGroup

  const checked = name === value

  function handleClick(event: ITouchEvent) {
    onClick?.(event)
    if (!disabled && name !== value) {
      onChange?.(name)
    }
  }

  return (
    <View
      className={classNames(
        prefixClassname("radio"),
        {
          [prefixClassname("radio--disabled")]: disabled,
          [prefixClassname("radio--horizontal")]: direction === "horizontal",
          [prefixClassname("radio--vertical")]: direction === "vertical",
        },
        className,
      )}
      onClick={handleClick}
      {...restProps}
    >
      {shape === "button" ? (
        <View
          className={classNames(prefixClassname("radio__button"), {
            [prefixClassname("radio__button--checked")]: checked,
            [prefixClassname("radio__button--disabled")]: disabled,
          })}
          children={children}
        />
      ) : (
        <>
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
            children={icon}
          />
          {children && (
            <View
              className={classNames(prefixClassname("radio__label"), {
                [prefixClassname("radio__label--disabled")]: disabled,
              })}
              children={children}
            />
          )}
        </>
      )}
    </View>
  )
}

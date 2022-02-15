import { useUncontrolled } from "@taroify/hooks"
import { Clear } from "@taroify/icons"
import { cloneIconElement } from "@taroify/icons/utils"
import { ITouchEvent } from "@tarojs/components"
import { BaseEventOrig } from "@tarojs/components/types/common"
import { InputProps as TaroInputProps } from "@tarojs/components/types/Input"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { ReactNode, useMemo, useState } from "react"
import { prefixClassname } from "../styles"
import { preventDefault } from "../utils/dom/event"
import { InputAlign, InputClearTrigger, InputColor } from "./input.shared"
import NativeInput from "./native-input"

export function resolveOnChange<
  E extends TaroInputProps.inputEventDetail | TaroInputProps.inputValueEventDetail,
  E2 extends TaroInputProps.inputEventDetail | TaroInputProps.inputValueEventDetail
>(
  e: BaseEventOrig<E>,
  onChange: undefined | ((event: BaseEventOrig<E2>) => void),
  detailValue?: string,
) {
  if (!onChange) {
    return
  }
  if (e.type === "click" || e.type === "tap") {
    const { detail } = e
    // click clear icon
    const event = Object.assign({}, e, {
      // change target ref value cause e.detail.value should be '' when clear input
      detail: {
        ...(_.isPlainObject(detail) ? detail : {}),
        value: "",
      },
    })

    onChange((event as unknown) as BaseEventOrig<E2>)
    return
  }

  // Trigger by composition event, this means we need force change the input value
  if (detailValue !== undefined) {
    const { detail } = e
    const event = Object.assign({}, e, {
      // change target ref value cause e.detail.value should be '' when clear input
      detail: {
        ...(_.isPlainObject(detail) ? detail : {}),
        value: detailValue,
      },
    })

    onChange((event as unknown) as BaseEventOrig<E2>)
    return
  }
  onChange((e as unknown) as BaseEventOrig<E2>)
}

export interface InputProps extends TaroInputProps {
  placeholderClassName?: string
  readonly?: boolean
  align?: InputAlign
  color?: InputColor
  clearable?: boolean
  clearIcon?: ReactNode
  clearTrigger?: InputClearTrigger

  onClear?(event: ITouchEvent): void

  onChange?(event: BaseEventOrig<TaroInputProps.inputEventDetail>): void
}

function Input(props: InputProps) {
  const {
    className,
    placeholderClass,
    placeholderClassName,
    value: valueProp,
    readonly,
    disabled,
    align,
    color,
    clearable,
    clearTrigger = "focus",
    clearIcon = <Clear />,
    onInput,
    onChange,
    onFocus,
    onBlur,
    onClear,
    ...restProps
  } = props
  const { value, setValue } = useUncontrolled({ value: valueProp })
  const [focused, setFocused] = useState(false)

  const allowClear = useMemo(() => {
    if (clearable && !disabled) {
      const hasValue = !_.isEmpty(value)
      const trigger = clearTrigger === "always" || (clearTrigger === "focus" && focused)
      return hasValue && trigger
    }
    return false
  }, [clearTrigger, clearable, disabled, focused, value])

  const handleClear = (event: ITouchEvent) => {
    preventDefault(event, true)
    resolveOnChange(event, onChange, "")
    resolveOnChange(event, onInput, "")
    onClear?.(event)
    setValue("")
  }

  const handleFocus = (event: BaseEventOrig<TaroInputProps.inputForceEventDetail>) => {
    setFocused(true)
    onFocus?.(event)
  }

  const handleInput = (event: BaseEventOrig<TaroInputProps.inputEventDetail>) => {
    onInput?.(event)
    onChange?.(event)
    setValue(event.detail.value)
  }

  const handleBlur = (event: BaseEventOrig<TaroInputProps.inputValueEventDetail>) => {
    onBlur?.(event)
    // Update focused by setTimeout
    setTimeout(() => setFocused(false), 80)
  }

  return (
    <>
      <NativeInput
        className={classNames(
          prefixClassname("input"),
          {
            [prefixClassname("input--disabled")]: disabled,
            [prefixClassname("input--readonly")]: readonly,
            [prefixClassname("input--right")]: align === "right",
            [prefixClassname("input--center")]: align === "center",
            [prefixClassname("input--left")]: align === "left",
            // Color
            [prefixClassname("input--primary")]: color === "primary",
            [prefixClassname("input--info")]: color === "info",
            [prefixClassname("input--success")]: color === "success",
            [prefixClassname("input--warning")]: color === "warning",
            [prefixClassname("input--danger")]: color === "danger",
          },
          className,
        )}
        placeholderClass={classNames(
          placeholderClass,
          placeholderClassName,
          prefixClassname("input__placeholder"),
          {
            [prefixClassname("input__placeholder--readonly")]: readonly,
            // // Color
            [prefixClassname("input__placeholder--primary")]: color === "primary",
            [prefixClassname("input__placeholder--info")]: color === "info",
            [prefixClassname("input__placeholder--success")]: color === "success",
            [prefixClassname("input__placeholder--warning")]: color === "warning",
            [prefixClassname("input__placeholder--danger")]: color === "danger",
          },
        )}
        disabled={disabled || readonly}
        readonly={readonly}
        color={color}
        value={value}
        onFocus={handleFocus}
        onInput={handleInput}
        onBlur={handleBlur}
        {...restProps}
      />
      {allowClear &&
        cloneIconElement(clearIcon, {
          className: prefixClassname("input__clear"),
          onClick: handleClear,
        })}
    </>
  )
}

export default Input

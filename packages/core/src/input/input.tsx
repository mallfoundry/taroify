import { Clear } from "@taroify/icons"
import { cloneIconElement } from "@taroify/icons/utils"
import { Input as TaroInput, ITouchEvent } from "@tarojs/components"
import { BaseEventOrig } from "@tarojs/components/types/common"
import { InputProps as TaroInputProps } from "@tarojs/components/types/Input"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { ReactNode, useMemo, useState } from "react"
import { prefixClassname } from "../styles"
import raf from "../utils/raf"
import { useValue } from "../utils/state"
import { InputAlign, InputClearTrigger } from "./input.shared"

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

interface InputProps extends TaroInputProps {
  placeholderClassName?: string
  readonly?: boolean
  align?: InputAlign
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
    align = "left",
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

  const { value, setValue } = useValue({ value: valueProp })

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
    resolveOnChange(event, onChange, value)
    onBlur?.(event)

    // Update focused by raf
    raf(() => setFocused(false))
  }

  return (
    <>
      <TaroInput
        className={classNames(
          prefixClassname("input"),
          {
            [prefixClassname("input--disabled")]: disabled,
            [prefixClassname("input--readonly")]: readonly,
            [prefixClassname("input--right")]: align === "right",
            [prefixClassname("input--center")]: align === "center",
            [prefixClassname("input--left")]: align === "left",
          },
          className,
        )}
        placeholderClass={classNames(
          placeholderClass,
          placeholderClassName,
          prefixClassname("input__placeholder"),
          {
            [prefixClassname("input__placeholder--readonly")]: readonly,
          },
        )}
        disabled={disabled || readonly}
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
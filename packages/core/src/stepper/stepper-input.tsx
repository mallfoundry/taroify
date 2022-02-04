import { Input } from "@tarojs/components"
import { BaseEventOrig, CommonEventFunction, ITouchEvent } from "@tarojs/components/types/common"
import { InputProps } from "@tarojs/components/types/Input"
import * as React from "react"
import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { prefixClassname } from "../styles"
import { preventDefault } from "../utils/dom/event"
import { formatNumber } from "../utils/format/number"
import { addUnitPx } from "../utils/format/unit"
import StepperContext from "./stepper.context"

interface StepperInputProps {
  width?: number | string
  disabled?: boolean
  onFocus?: CommonEventFunction<InputProps.inputForceEventDetail>
}

function StepperInput(props: StepperInputProps) {
  const { width, disabled: disabledProp, onFocus } = props
  const { value: valueProp, size, disabled, precision = 0, formatValue, onChange } = useContext(
    StepperContext,
  )
  const digit = precision > 0

  const rootRef = useRef<HTMLElement>()

  const [value, setValue] = useState<string | number>()

  useEffect(() => setValue(valueProp), [valueProp])

  const onTouchEnd = useCallback(
    (event: ITouchEvent) => {
      // fix mobile safari page scroll down issue
      // see: https://github.com/youzan/vant/issues/7690
      if (disabledProp) {
        preventDefault(event)
      }
    },
    [disabledProp],
  )

  const handleFocus = useCallback(
    (event: BaseEventOrig<InputProps.inputForceEventDetail>) => {
      // readonly not work in legacy mobile safari
      if (disabledProp) {
        rootRef.current?.blur()
      } else {
        onFocus?.(event)
      }
    },
    [disabledProp, onFocus],
  )

  const onInput = useCallback(
    ({ detail }: BaseEventOrig<InputProps.inputEventDetail>) => {
      const { value: inputValue } = detail

      let formatted = formatNumber(String(inputValue), digit)

      // limit max decimal length
      if (precision > 0 && formatted.includes(".")) {
        const pair = formatted.split(".")
        formatted = `${pair[0]}.${pair[1].slice(0, precision)}`
      }

      // prefer number type
      const isNumeric = formatted === String(+formatted)
      setValue(isNumeric ? +formatted : formatted)
    },
    [digit, precision],
  )

  const onBlur = useCallback(
    ({ detail }: BaseEventOrig<InputProps.inputValueEventDetail>) => {
      const { value: inputValue } = detail
      const value = formatValue?.(inputValue)
      setValue(value)
      onChange?.(value)
    },
    [formatValue, onChange],
  )

  return (
    <Input
      ref={rootRef}
      className={prefixClassname("stepper__input")}
      style={{
        width: width ? addUnitPx(width) : "",
        height: size ? addUnitPx(size) : "",
      }}
      disabled={disabledProp || disabled}
      type={digit ? "digit" : "number"}
      value={(value as unknown) as string}
      onTouchEnd={onTouchEnd}
      onFocus={handleFocus}
      onInput={onInput}
      onBlur={onBlur}
    />
  )
}

export default StepperInput

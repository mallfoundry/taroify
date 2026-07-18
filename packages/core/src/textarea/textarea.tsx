import { useUncontrolled } from "@taroify/hooks"
import { View } from "@tarojs/components"
import type { BaseEventOrig } from "@tarojs/components/types/common"
import type { InputProps as TaroInputProps } from "@tarojs/components/types/Input"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { prefixClassname } from "../styles"
import NativeTextarea, { type NativeTextareaProps } from "./native-textarea"
import { getStringLength, truncateString } from "./textarea.shared"

export interface TextareaProps extends NativeTextareaProps {
  limit?: number | boolean
  readonly?: boolean

  onChange?(event: BaseEventOrig<TaroInputProps.inputEventDetail>): void
}

function Textarea(props: TextareaProps) {
  const {
    className,
    placeholderClass,
    value: valueProp,
    readonly,
    disabled,
    limit,
    maxlength: maxlengthProp,
    onInput,
    onChange,
    ...restProps
  } = props
  const maxlength = _.isNumber(limit) ? limit : maxlengthProp
  const { value, setValue } = useUncontrolled({ value: valueProp })

  const handleInput = (event: BaseEventOrig<TaroInputProps.inputEventDetail>) => {
    const inputValue = event.detail.value
    const nextValue =
      _.isNumber(limit) && limit >= 0 ? truncateString(inputValue, limit) : inputValue
    const nextEvent =
      nextValue === inputValue
        ? event
        : Object.assign({}, event, {
            detail: {
              ...event.detail,
              value: nextValue,
            },
          })

    setValue(nextValue)
    onInput?.(nextEvent)
    onChange?.(nextEvent)
  }

  return (
    <View className={prefixClassname("textarea__wrapper")}>
      <NativeTextarea
        className={classNames(
          prefixClassname("textarea"),
          {
            [prefixClassname("textarea--readonly")]: readonly,
          },
          className,
        )}
        placeholderClass={classNames(
          prefixClassname("textarea__placeholder"),
          {
            [prefixClassname("textarea__placeholder--readonly")]: readonly,
          },
          placeholderClass,
        )}
        disabled={readonly || disabled}
        readonly={readonly}
        maxlength={maxlength}
        value={value}
        onInput={handleInput}
        {...restProps}
      />
      {limit && (
        <View className={prefixClassname("textarea__limit")}>
          {getStringLength(value)}/{maxlength}
        </View>
      )}
    </View>
  )
}

export default Textarea

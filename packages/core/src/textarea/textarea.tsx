import { useUncontrolled } from "@taroify/hooks"
import { View } from "@tarojs/components"
import { BaseEventOrig } from "@tarojs/components/types/common"
import { InputProps as TaroInputProps } from "@tarojs/components/types/Input"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { prefixClassname } from "../styles"
import NativeTextarea, { NativeTextareaProps } from "./native-textarea"
import { getStringLength } from "./textarea.shared"

interface TextareaProps extends NativeTextareaProps {
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
        onInput={(e) => {
          setValue(e.detail.value)
          onInput?.(e)
          onChange?.(e)
        }}
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

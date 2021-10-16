import { Clear } from "@taroify/icons"
import { cloneIconElement } from "@taroify/icons/utils"
import { Input, ITouchEvent, View } from "@tarojs/components"
import { BaseEventOrig } from "@tarojs/components/types/common"
import { InputProps } from "@tarojs/components/types/Input"
import { nextTick } from "@tarojs/taro"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { Children, isValidElement, ReactElement, ReactNode, useMemo, useState } from "react"
import { BaseCell, CellAlign, CellAlignString } from "../cell"
import { prefixClassname } from "../styles"
import FieldButton from "./field-button"
import {
  FieldAutosize,
  FieldClearTrigger,
  FieldClearTriggerString,
  FieldConfirmType,
  FieldInputAlign,
  FieldInputAlignString,
  FieldLabelAlign,
  FieldLabelAlignString,
  FieldMessageAlign,
  FieldMessageAlignString,
  FieldType,
  FieldTypeString,
} from "./field.shared"

export function resolveOnChange<
  E extends InputProps.inputEventDetail | InputProps.inputValueEventDetail,
  E2 extends InputProps.inputEventDetail | InputProps.inputValueEventDetail
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

interface FieldChildren {
  children?: ReactNode[]
  button?: ReactNode
}

function useFieldChildren(children?: ReactNode): FieldChildren {
  const __children__: FieldChildren = {
    children: [],
  }
  Children.forEach(children, (child: ReactNode) => {
    if (!isValidElement(child)) {
      return
    }
    const element = child as ReactElement
    const elementType = element.type
    if (elementType === FieldButton) {
      __children__.button = element
    } else {
      __children__.children?.push(element)
    }
  })
  return __children__
}

type TaroInputType = "text" | "number" | "idcard" | "digit"

export interface FieldProps {
  className?: string
  name?: string
  value?: string
  maxlength?: number
  type?: FieldType | FieldTypeString
  align?: CellAlign | CellAlignString
  bordered?: boolean
  focus?: boolean
  autoFocus?: boolean
  labelAlign?: FieldLabelAlign | FieldLabelAlignString
  label?: ReactNode
  inputAlign?: FieldInputAlign | FieldInputAlignString
  icon?: ReactNode
  rightIcon?: ReactNode
  placeholder?: string
  placeholderClassName?: string
  clickable?: boolean
  required?: boolean
  readonly?: boolean
  disabled?: boolean
  error?: boolean
  messageAlign?: FieldMessageAlign | FieldMessageAlignString
  message?: ReactNode
  clearable?: boolean
  clearIcon?: ReactNode
  clearTrigger?: FieldClearTrigger | FieldClearTriggerString
  autosize?: boolean | FieldAutosize

  cursorSpacing?: number
  confirmType?: FieldConfirmType
  confirmHold?: boolean
  cursor?: number
  selectionStart?: number
  selectionEnd?: number
  adjustPosition?: boolean
  holdKeyboard?: boolean
  children?: ReactNode

  onClick?(event: ITouchEvent): void

  onClear?(event: ITouchEvent): void

  onConfirm?(event: BaseEventOrig<InputProps.inputValueEventDetail>): void

  onChange?(event: BaseEventOrig<InputProps.inputEventDetail>): void

  onFocus?(event: BaseEventOrig<InputProps.inputForceEventDetail>): void

  onBlur?(event: BaseEventOrig<InputProps.inputValueEventDetail>): void
}

function Field(props: FieldProps) {
  const {
    className,
    name,
    value: valueProp,
    maxlength = -1,
    type = FieldType.Text,
    align,
    bordered,
    focus,
    autoFocus,
    labelAlign = FieldLabelAlign.Left,
    label,
    inputAlign = FieldInputAlign.Left,
    icon,
    rightIcon,
    placeholder,
    placeholderClassName,
    clickable,
    required,
    readonly,
    disabled,
    error,
    message,
    messageAlign = FieldLabelAlign.Left,
    clearable,
    clearIcon = <Clear />,
    clearTrigger = FieldClearTrigger.Focus,
    cursorSpacing,
    confirmType,
    confirmHold,
    cursor,
    selectionStart,
    selectionEnd,
    adjustPosition,
    holdKeyboard,
    onClick,
    onClear,
    onConfirm,
    onChange,
    onFocus,
    onBlur,
  } = props
  const { children, button } = useFieldChildren(props.children)

  const [focused, setFocused] = useState(false)

  const allowClear = useMemo(() => {
    if (clearable && !readonly) {
      const hasValue = valueProp !== ""
      const trigger =
        clearTrigger === FieldClearTrigger.Always ||
        (clearTrigger === FieldClearTrigger.Focus && focused)
      return hasValue && trigger
    }
    return false
  }, [clearTrigger, clearable, focused, readonly, valueProp])

  const handleClear = (event: ITouchEvent) => {
    resolveOnChange(event, onChange, "")
    onClear?.(event)
  }

  const handleFocus = (event: BaseEventOrig<InputProps.inputForceEventDetail>) => {
    setFocused(true)
    onFocus?.(event)
  }

  const handleBlur = (event: BaseEventOrig<InputProps.inputValueEventDetail>) => {
    nextTick(() => setFocused(false))
    resolveOnChange(event, onChange, valueProp)
    onBlur?.(event)
  }

  return (
    <BaseCell
      className={classNames(
        prefixClassname("field"),
        {
          [prefixClassname("field--disabled")]: disabled,
        },
        className,
      )}
      bordered={bordered}
      align={align}
      clickable={clickable}
      titleClassName={classNames(
        prefixClassname("field__label"),
        prefixClassname(`field__label--${labelAlign}`),
      )}
      title={label}
      icon={cloneIconElement(icon, { className: prefixClassname("field__icon") })}
      rightIcon={cloneIconElement(rightIcon, { className: prefixClassname("field__right-icon") })}
      required={required}
      onClick={onClick}
    >
      <View
        className={classNames(prefixClassname("field__body"), {
          [prefixClassname("field__body--textarea")]: type === FieldType.Textarea,
        })}
      >
        {_.isEmpty(children) ? (
          <Input
            className={classNames(
              prefixClassname("field__control"),
              {
                [prefixClassname("field__control--disabled")]: disabled,
                [prefixClassname("field__control--readonly")]: readonly,
                [prefixClassname("field__control--error")]: error,
              },
              prefixClassname(`field__control--${inputAlign}`),
            )}
            placeholderClass={classNames(
              prefixClassname("field__control__placeholder"),
              {
                [prefixClassname("field__control__placeholder--readonly")]: readonly,
                [prefixClassname("field__control__placeholder--error")]: error,
              },
              placeholderClassName,
            )}
            name={name}
            value={valueProp}
            autoFocus={autoFocus}
            focus={focus}
            type={type as TaroInputType}
            password={type === FieldType.Password}
            placeholder={placeholder}
            disabled={disabled || readonly}
            maxlength={maxlength}
            cursorSpacing={cursorSpacing}
            confirmType={confirmType}
            confirmHold={confirmHold}
            cursor={cursor}
            selectionStart={selectionStart}
            selectionEnd={selectionEnd}
            adjustPosition={adjustPosition}
            holdKeyboard={holdKeyboard}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onInput={onChange}
            onConfirm={onConfirm}
          />
        ) : (
          children
        )}

        {allowClear &&
          cloneIconElement(clearIcon, {
            className: prefixClassname("field__clear"),
            onClick: handleClear,
          })}
        {button}
      </View>
      {message && (
        <View
          className={classNames(
            prefixClassname("field__message"),
            prefixClassname(`field__message--${messageAlign}`),
            {
              [prefixClassname("field__message--error")]: error,
            },
          )}
          children={message}
        />
      )}
    </BaseCell>
  )
}

export default Field

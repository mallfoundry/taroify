import { Clear } from "@taroify/icons"
import { cloneIconElement } from "@taroify/icons/utils"
import { Input, ITouchEvent, View } from "@tarojs/components"
import { BaseEventOrig } from "@tarojs/components/types/common"
import { InputProps } from "@tarojs/components/types/Input"
import { nextTick } from "@tarojs/taro"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import {
  Children,
  CSSProperties,
  forwardRef,
  ForwardRefExoticComponent,
  isValidElement,
  ReactElement,
  ReactNode,
  useCallback,
  useContext,
  useImperativeHandle,
  useMemo,
  useState,
} from "react"
import { BaseCell, CellAlign } from "../cell"
import FormContext from "../form/form.context"
import { prefixClassname } from "../styles"
import { fulfillPromise } from "../utils/promisify"
import { useValue } from "../utils/state"
import FieldButton from "./field-button"
import { validateRules } from "./field.rule"
import {
  FieldAutosize,
  FieldClearTrigger,
  FieldConfirmType,
  FieldInputAlign,
  FieldInstance,
  FieldLabelAlign,
  FieldMessageAlign,
  FieldRule,
  FieldType,
  FieldValidateTrigger,
} from "./field.shared"
import useField from "./use-field"
import useFieldValueEffect from "./use-field-value-effect"

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
  style?: CSSProperties
  name?: string
  value?: string
  maxlength?: number
  type?: FieldType
  align?: CellAlign
  bordered?: boolean
  focus?: boolean
  autoFocus?: boolean
  labelAlign?: FieldLabelAlign
  label?: ReactNode
  inputAlign?: FieldInputAlign
  icon?: ReactNode
  rightIcon?: ReactNode
  placeholder?: string
  placeholderClassName?: string
  clickable?: boolean
  required?: boolean
  readonly?: boolean
  disabled?: boolean
  error?: boolean
  messageAlign?: FieldMessageAlign
  message?: ReactNode
  clearable?: boolean
  clearIcon?: ReactNode
  clearTrigger?: FieldClearTrigger
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

  rules?: FieldRule[]

  onClick?(event: ITouchEvent): void

  onClear?(event: ITouchEvent): void

  onConfirm?(event: BaseEventOrig<InputProps.inputValueEventDetail>): void

  onChange?(event: BaseEventOrig<InputProps.inputEventDetail>): void

  onFocus?(event: BaseEventOrig<InputProps.inputForceEventDetail>): void

  onBlur?(event: BaseEventOrig<InputProps.inputValueEventDetail>): void
}

const Field: ForwardRefExoticComponent<FieldProps> = forwardRef<FieldInstance, FieldProps>(
  (props: FieldProps, ref) => {
    const {
      className,
      style,
      name,
      value: valueProp,
      maxlength,
      type = "text",
      align,
      bordered,
      focus,
      autoFocus,
      labelAlign = "left",
      label,
      inputAlign = "left",
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
      messageAlign = "left",
      clearable,
      clearIcon = <Clear />,
      clearTrigger = "focus",
      cursorSpacing,
      confirmType,
      confirmHold,
      cursor,
      selectionStart,
      selectionEnd,
      adjustPosition,
      holdKeyboard,
      children: childrenProp,
      rules: rulesProp,
      onClick,
      onClear,
      onConfirm,
      onChange,
      onFocus,
      onBlur,
    } = props

    const { children, button } = useFieldChildren(childrenProp)

    const { validateTrigger } = useContext(FormContext)

    const [focused, setFocused] = useState(false)

    const [invalidMessage, setInvalidMessage] = useState<ReactNode>()

    const resetInvalidMessage = useCallback(() => setInvalidMessage(undefined), [])

    const { value, setValue } = useValue({
      value: valueProp,
    })

    const allowClear = useMemo(() => {
      if (clearable && !readonly) {
        const hasValue = valueProp !== ""
        const trigger = clearTrigger === "always" || (clearTrigger === "focus" && focused)
        return hasValue && trigger
      }
      return false
    }, [clearTrigger, clearable, focused, readonly, valueProp])

    const validate = (rules = rulesProp) =>
      new Promise<void>((resolve, reject) => {
        if (rules) {
          resetInvalidMessage()
          validateRules(value, rules).then((result) => {
            const { invalid, message } = result
            setInvalidMessage(invalid ? message : undefined)
            if (invalid) {
              reject({
                name,
                message,
              })
            } else {
              resolve()
            }
          })
        } else {
          resolve()
        }
      })

    const validateWithTrigger = (trigger: FieldValidateTrigger) => {
      if (validateTrigger && rulesProp) {
        const defaultTrigger = validateTrigger === trigger
        const rules = rulesProp.filter((rule) => {
          if (rule.trigger) {
            return rule.trigger === trigger
          }

          return defaultTrigger
        })

        if (rules.length) {
          fulfillPromise(validate(rulesProp))
        }
      }
    }

    const handleClear = (event: ITouchEvent) => {
      resolveOnChange(event, onChange, "")
      onClear?.(event)
    }

    const handleFocus = (event: BaseEventOrig<InputProps.inputForceEventDetail>) => {
      setFocused(true)
      onFocus?.(event)
    }

    const handleInput = (event: BaseEventOrig<InputProps.inputEventDetail>) => {
      setValue(event.detail.value)
      onChange?.(event)
    }

    const handleBlur = (event: BaseEventOrig<InputProps.inputValueEventDetail>) => {
      nextTick(() => setFocused(false))
      resolveOnChange(event, onChange, valueProp)
      onBlur?.(event)
      validateWithTrigger("onBlur")
    }

    useFieldValueEffect(() => {
      resetInvalidMessage()
      validateWithTrigger("onChange")
    }, [value])

    const instance = useMemo<FieldInstance>(() => ({ name, validate }), [name, validate])

    useImperativeHandle(ref, () => instance)

    useField(name, instance)

    return (
      <BaseCell
        className={classNames(
          prefixClassname("field"),
          {
            [prefixClassname("field--disabled")]: disabled,
          },
          className,
        )}
        style={style}
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
            [prefixClassname("field__body--textarea")]: type === "textarea",
          })}
        >
          {_.isEmpty(children) ? (
            <Input
              className={classNames(
                prefixClassname("field__control"),
                {
                  [prefixClassname("field__control--disabled")]: disabled,
                  [prefixClassname("field__control--readonly")]: readonly,
                  [prefixClassname("field__control--error")]: error || invalidMessage,
                },
                prefixClassname(`field__control--${inputAlign}`),
              )}
              placeholderClass={classNames(
                prefixClassname("field__control__placeholder"),
                {
                  [prefixClassname("field__control__placeholder--readonly")]: readonly,
                  [prefixClassname("field__control__placeholder--error")]: error || invalidMessage,
                },
                placeholderClassName,
              )}
              name={name}
              value={valueProp}
              autoFocus={autoFocus}
              focus={focus}
              type={type as TaroInputType}
              password={type === "password"}
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
              onInput={handleInput}
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
        {(message || invalidMessage) && (
          <View
            className={classNames(
              prefixClassname("field__message"),
              prefixClassname(`field__message--${messageAlign}`),
              {
                [prefixClassname("field__message--error")]: error || invalidMessage,
              },
            )}
            children={message ?? invalidMessage}
          />
        )}
      </BaseCell>
    )
  },
)

export default Field

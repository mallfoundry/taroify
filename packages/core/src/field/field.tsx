import { cloneIconElement } from "@taroify/icons/utils"
import { View } from "@tarojs/components"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import {
  ForwardedRef,
  forwardRef,
  ForwardRefExoticComponent,
  ReactNode,
  useCallback,
  useContext,
  useImperativeHandle,
  useMemo,
  useState,
} from "react"
import { CellBase, CellProps } from "../cell"
import { useFormField, useFormValue } from "../form"
import FormContext from "../form/form.context"
import { prefixClassname } from "../styles"
import { fulfillPromise } from "../utils/promisify"
import { useToRef } from "../utils/state"
import FieldControl from "./field-control"
import { validateRules } from "./field.rule"
import {
  FieldInstance,
  FieldLabelAlign,
  FieldMessageAlign,
  FieldRule,
  FieldValidateTrigger,
} from "./field.shared"

import useFieldValueEffect from "./use-field-value-effect"

export interface FieldProps extends CellProps {
  name?: string
  labelAlign?: FieldLabelAlign
  label?: ReactNode
  required?: boolean
  error?: boolean
  // messageStatus?: boolean
  messageAlign?: FieldMessageAlign
  message?: ReactNode
  children?: ReactNode

  rules?: FieldRule[]
}

const Field = forwardRef<FieldInstance, FieldProps>(
  (props: FieldProps, ref: ForwardedRef<FieldInstance>) => {
    const {
      className,
      style,
      name,
      align,
      bordered,
      labelAlign = "left",
      label,
      icon,
      rightIcon,
      clickable,
      required,
      error,
      // message,
      messageAlign = "left",
      //
      children,
      //
      rules: rulesProp,
      onClick,
    } = props

    const rulesRef = useToRef(rulesProp)

    const { validateTrigger } = useContext(FormContext)

    const [invalidMessages, setInvalidMessages] = useState<ReactNode[]>()

    const { value, getValue, setValue } = useFormValue(name)

    const resetInvalidMessage = () => {
      setInvalidMessages(undefined)
    }

    const validate = useCallback(
      (rules = rulesRef.current) => {
        return new Promise<void>((resolve, reject) => {
          if (rules) {
            resetInvalidMessage()
            validateRules(getValue(), rules).then((errors) => {
              if (_.isEmpty(errors)) {
                setInvalidMessages(undefined)
                resolve()
              } else {
                setInvalidMessages(errors)
                reject({
                  name,
                  errors,
                })
              }
            })
          } else {
            resolve()
          }
        })
      },
      [getValue, name, rulesRef],
    )

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

    useFieldValueEffect(() => validateWithTrigger("onChange"), [value])

    const instance = useMemo<FieldInstance>(() => ({ name, validate }), [name, validate])

    useImperativeHandle(ref, () => instance, [instance])

    useFormField(name, instance)

    const explain = useMemo(() => error || !_.isEmpty(invalidMessages), [error, invalidMessages])

    return (
      <CellBase
        className={classNames(prefixClassname("field"), className)}
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
        <View className={classNames(prefixClassname("field__body"))}>
          <FieldControl
            name={name}
            value={value}
            onBlur={() => validateWithTrigger("onBlur")}
            onChange={setValue}
            children={children}
          />
        </View>
        {explain && (
          <View
            className={classNames(
              prefixClassname("field__explain"),
              prefixClassname(`field__explain--${messageAlign}`),
            )}
          >
            {
              //
              _.map(invalidMessages, (message, messageKey) => (
                <View
                  key={messageKey}
                  className={prefixClassname("field__explain__error")}
                  children={message}
                />
              ))
            }
          </View>
        )}
      </CellBase>
    )
  },
)

export default Field as ForwardRefExoticComponent<FieldProps>

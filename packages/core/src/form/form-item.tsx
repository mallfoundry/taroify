import { cloneIconElement } from "@taroify/icons/utils"
import { View } from "@tarojs/components"
import { InputProps } from "@tarojs/components/types/Input"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import {
  Children,
  cloneElement,
  ForwardedRef,
  forwardRef,
  ForwardRefExoticComponent,
  isValidElement,
  ReactElement,
  ReactNode,
  useCallback,
  useContext,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react"
import { CellBase, CellProps, CellValue } from "../cell"
import Form, { useFormField, useFormValue } from "../form"
import FormContext from "../form/form.context"
import { prefixClassname } from "../styles"
import { fulfillPromise } from "../utils/promisify"
import { useToRef } from "../utils/state"
import { isElementOf } from "../utils/validate"
import FormFeedback from "./form-feedback"
import FormItemContext from "./form-item.context"
import { validateRules } from "./form.rule"
import { FormItemInstance, FormRule, FormValidateStatus, FormValidateTrigger } from "./form.shared"

import useFormFieldValueEffect from "./use-form-field-value-effect"

interface FormItemChildren {
  label?: ReactElement
  control?: ReactElement
  feedbacks?: ReactElement[]
}

function useFormItemChildren(children?: ReactNode): FormItemChildren {
  return useMemo<FormItemChildren>(() => {
    const __children__: FormItemChildren = {
      feedbacks: [],
    }

    Children.forEach(children, (child: ReactNode) => {
      if (!isValidElement(child)) {
        return
      }

      const element = child as ReactElement
      const { type: elementType } = element as ReactElement<InputProps>
      if (isElementOf(element, Form.Label)) {
        __children__.label = element
      } else if (elementType === Form.Control) {
        __children__.control = element
      } else if (isElementOf(element, Form.Feedback)) {
        __children__.feedbacks?.push(element)
      }
    })
    return __children__
  }, [children])
}

export interface FormItemProps extends CellProps {
  name?: string
  defaultValue?: any
  required?: boolean

  rules?: FormRule[]

  children?: ReactNode
}

const FormItem = forwardRef<FormItemInstance, FormItemProps>(
  (props: FormItemProps, ref: ForwardedRef<FormItemInstance>) => {
    const {
      className,
      style,
      name,
      defaultValue,
      align,
      bordered,
      icon,
      rightIcon,
      clickable,
      required,
      children: childrenProp,
      rules: rulesProp,
      onClick,
    } = props

    const { label, control, feedbacks } = useFormItemChildren(childrenProp)

    const rulesRef = useToRef(rulesProp)

    const { validateTrigger } = useContext(FormContext)

    const validateStatusRef = useRef<FormValidateStatus>()
    const [invalidMessages, setInvalidMessages] = useState<ReactNode[]>()

    const { value, getValue, setValue } = useFormValue(name, { defaultValue })

    const resetInvalidMessage = () => {
      validateStatusRef.current = undefined
      setInvalidMessages(undefined)
    }

    const validate = useCallback(
      (rules = rulesRef.current) => {
        return new Promise<void>((resolve, reject) => {
          if (rules) {
            resetInvalidMessage()
            validateRules(getValue(), rules).then((errors) => {
              if (_.isEmpty(errors)) {
                validateStatusRef.current = "valid"
                setInvalidMessages(undefined)
                resolve()
              } else {
                validateStatusRef.current = "invalid"
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

    const validateWithTrigger = useCallback(
      (trigger: FormValidateTrigger) => {
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
          } else {
            validateStatusRef.current = undefined
            setInvalidMessages(undefined)
          }
        }
      },
      [rulesProp, validate, validateTrigger],
    )

    useFormFieldValueEffect(() => validateWithTrigger("onChange"), [value])

    const instance = useMemo<FormItemInstance>(
      () => ({
        name,
        validate,
        getValue,
        setValue,
      }),
      [getValue, name, setValue, validate],
    )

    useImperativeHandle(ref, () => instance, [instance])

    useFormField(name, instance)

    const explain = useMemo(
      () => !_.isEmpty(feedbacks) || !_.isEmpty(invalidMessages),
      //
      [feedbacks, invalidMessages],
    )

    const Control = useMemo(
      () =>
        control &&
        cloneElement(control, {
          name,
          value,
          onBlur: () => validateWithTrigger("onBlur"),
          onChange: setValue,
        }),
      [control, name, setValue, validateWithTrigger, value],
    )

    return (
      <FormItemContext.Provider
        value={{
          validateStatus: validateStatusRef.current,
        }}
      >
        <CellBase
          className={classNames(prefixClassname("form-item"), className)}
          style={style}
          bordered={bordered}
          align={align}
          clickable={clickable}
          icon={cloneIconElement(icon, { className: prefixClassname("form-item__icon") })}
          rightIcon={cloneIconElement(rightIcon, {
            className: prefixClassname("form-item__right-icon"),
          })}
          required={required}
          onClick={onClick}
        >
          {label}
          <CellValue alone={false}>
            {Control}
            {explain && (
              <View className={classNames(prefixClassname("form__feedbacks"))}>
                {feedbacks}
                {_.map(invalidMessages, (message, messageKey) => (
                  <FormFeedback key={messageKey} status="invalid" children={message} />
                ))}
              </View>
            )}
          </CellValue>
        </CellBase>
      </FormItemContext.Provider>
    )
  },
)

export default FormItem as ForwardRefExoticComponent<FormItemProps>

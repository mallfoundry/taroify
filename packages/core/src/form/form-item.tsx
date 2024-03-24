import { cloneIconElement } from "@taroify/icons/utils"
import { View } from "@tarojs/components"
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
import { FormItemInstance, FormRule, FormValidateTrigger } from "./form.shared"
import useFormError from "./use-form-error"
import useFormFieldValueEffect from "./use-form-field-value-effect"
import { useDependenciesChange, useShouldUpdateSignal } from "./use-form-item"

interface FormItemChildren {
  label?: ReactElement
  control?: ReactElement
  feedbacks?: ReactElement[]
  children?: ReactElement
}

function useFormItemChildren(childrenProps: FormItemProps["children"], shouldUpdateSignal: number, noStyle?: boolean): FormItemChildren {
  return useMemo<FormItemChildren>(() => {
    if (noStyle) {
      if (_.isFunction(childrenProps)) {
        const children = childrenProps()
        return {
          children: isValidElement(children) ? children : undefined
        }
      } else {
        // eslint-disable-next-line
        console.warn('[Taroify] FormItem(noStyle): "children" should be function')
        return {}
      }
    }
    const __children__: FormItemChildren = {
      feedbacks: [],
    }
    const children = _.isFunction(childrenProps) ? childrenProps() : childrenProps
    Children.forEach(children, (child: ReactNode) => {
      if (!isValidElement(child)) {
        return
      }
      if (isElementOf(child, Form.Label)) {
        __children__.label = child
      } else if (isElementOf(child, Form.Control)) {
        __children__.control = child
      } else if (isElementOf(child, Form.Feedback)) {
        __children__.feedbacks?.push(child)
      }
    })
    return __children__
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [childrenProps, shouldUpdateSignal, noStyle])
}

export interface FormItemProps extends Omit<CellProps, "children"> {
  name?: string
  defaultValue?: any
  required?: boolean
  rules?: FormRule[]
  dependencies?: string[]
  shouldUpdate?: boolean | ((prev, next) => boolean)
  noStyle?: boolean

  children?: (() => ReactNode) | ReactNode
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
      dependencies,
      shouldUpdate,
      noStyle,
      onClick,
    } = props
    const shouldUpdateSignal = useShouldUpdateSignal(shouldUpdate)

    const { label, control, feedbacks, children } = useFormItemChildren(childrenProp, shouldUpdateSignal, noStyle)

    const rulesRef = useToRef(rulesProp)

    const { validateTrigger } = useContext(FormContext)

    const { validateStatus, error, setError, resetError } = useFormError(name)

    const { value, getValue, setValue } = useFormValue(name, { defaultValue })

    const validate = useCallback(
      (rules = rulesRef.current) => {
        return new Promise<void>((resolve, reject) => {
          if (rules) {
            resetError()
            validateRules(getValue(), rules) //
              .then((errors) => {
                if (_.isEmpty(errors)) {
                  resetError()
                  resolve()
                } else {
                  setError({ errors })
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
      [getValue, name, resetError, rulesRef, setError],
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
          } else if (defaultTrigger) {
            resetError()
          }
        }
      },
      [resetError, rulesProp, validate, validateTrigger],
    )

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

    useFormFieldValueEffect(() => validateWithTrigger("onChange"), [value])

    useDependenciesChange(dependencies, () => fulfillPromise(validate()))

    const explain = useMemo(
      () => !_.isEmpty(feedbacks) || !_.isEmpty(error?.errors),
      //
      [error?.errors, feedbacks],
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

    if (noStyle) {
      return (
        <FormItemContext.Provider
          value={{
            validateStatus,
          }}
        >
          {children}
        </FormItemContext.Provider>
      )
    }

    return (
      <FormItemContext.Provider
        value={{
          validateStatus,
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
          {...(onClick && { onClick })}
        >
          {label}
          <CellValue alone={false}>
            {Control}
            {explain && (
              <View className={classNames(prefixClassname("form__feedbacks"))}>
                {feedbacks}
                {_.map(error?.errors, (message, messageKey) => (
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

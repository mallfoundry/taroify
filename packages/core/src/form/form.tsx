import { useForceUpdate } from "@taroify/hooks"
import { Form as TaroForm } from "@tarojs/components"
import { BaseEventOrig } from "@tarojs/components/types/common"
import { FormProps as TaroFormProps } from "@tarojs/components/types/Form"
import * as React from "react"
import { ForwardedRef, forwardRef, ReactNode, useEffect, useImperativeHandle } from "react"
import { useUniqueId } from "../hooks"
import { preventDefault } from "../utils/dom/event"
import FormContext from "./form.context"

import {
  FormControlAlign,
  FormInstance,
  FormLabelAlign,
  FormValidateTrigger,
  FormValidError,
} from "./form.shared"
import useForm from "./use-form"

export interface FormProps extends TaroFormProps {
  name?: string
  defaultValues?: any
  values?: any
  labelAlign?: FormLabelAlign
  controlAlign?: FormControlAlign
  validateTrigger?: FormValidateTrigger
  colon?: boolean

  children?: ReactNode

  onValidate?(errors: FormValidError[]): void

  onValuesChange?(changedValues: any, allValues: any): void
}

const Form = forwardRef<FormInstance, FormProps>(
  (props: FormProps, ref: ForwardedRef<FormInstance>) => {
    const {
      name: nameProp,
      defaultValues,
      values,
      labelAlign,
      controlAlign,
      validateTrigger = "onBlur",
      colon,
      children: childrenProp,
      onValidate,
      onValuesChange,
      onSubmit,
      onReset,
      ...restProps
    } = props

    const forceUpdate = useForceUpdate()

    const nameId = useUniqueId()
    const name = nameProp ?? nameId

    const {
      getErrors,
      setErrors,
      setValues,
      getValues,
      validate,
      reset,
      setFieldsValue,
      getFieldsValue,
      validateFields,
      addEventListener,
      removeEventListener,
    } = useForm<any>(name, {
      defaultValues,
      values,
    })

    function handleSubmit(e: BaseEventOrig<TaroFormProps.onSubmitEventDetail>) {
      validate()
        .then((values) => {
          const event = Object.assign({}, e, {
            detail: {
              ...e.detail,
              value: values,
            },
          })
          onSubmit?.(event)
        })
        .catch((errors) => onValidate?.(errors))
    }

    function handleReset(e: BaseEventOrig) {
      preventDefault(e)
      reset()
      forceUpdate()
      onReset?.(e)
    }

    useImperativeHandle(
      ref,
      () => ({
        getErrors,
        setErrors,
        setValues,
        getValues,
        validate,
        reset,
        /**
         * @deprecated
         */
        setFieldsValue,
        /**
         * @deprecated
         */
        getFieldsValue,
        /**
         * @deprecated
         */
        validateFields,
      }),
      [
        getErrors,
        getFieldsValue,
        getValues,
        reset,
        setErrors,
        setFieldsValue,
        setValues,
        validate,
        validateFields,
      ],
    )

    useEffect(() => {
      if (onValuesChange) {
        addEventListener("change", onValuesChange)
      }
      return () => {
        if (onValuesChange) {
          removeEventListener("change", onValuesChange)
        }
      }
    }, [addEventListener, onValuesChange, removeEventListener])

    return (
      <FormContext.Provider
        value={{
          name,
          colon,
          labelAlign,
          controlAlign,
          validateTrigger,
        }}
      >
        <TaroForm
          onSubmit={handleSubmit}
          onReset={handleReset}
          children={childrenProp}
          {...restProps}
        />
      </FormContext.Provider>
    )
  },
)

export default Form

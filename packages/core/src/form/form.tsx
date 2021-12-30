import { Form as TaroForm } from "@tarojs/components"
import { BaseEventOrig } from "@tarojs/components/types/common"
import { FormProps as TaroFormProps } from "@tarojs/components/types/Form"
import * as React from "react"
import { ForwardedRef, forwardRef, ReactNode, useImperativeHandle } from "react"
import { useUniqueId } from "../hooks"
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
  disabled?: boolean
  readonly?: boolean

  children?: ReactNode

  onValidate?(errors: FormValidError[]): void
}

const Form = forwardRef<FormInstance, FormProps>(
  (props: FormProps, ref: ForwardedRef<FormInstance>) => {
    const {
      defaultValues,
      values,
      name: nameProp,
      labelAlign,
      controlAlign,
      validateTrigger = "onBlur",
      children: childrenProp,
      onSubmit,
      onValidate,
    } = props

    const nameId = useUniqueId()
    const name = nameProp ?? nameId

    const { setFieldsValue, getFieldsValue, validateFields } = useForm<any>(name, {
      defaultValues,
      values,
    })

    function handleSubmit(e: BaseEventOrig<TaroFormProps.onSubmitEventDetail>) {
      validateFields()
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

    useImperativeHandle(
      ref,
      () => ({
        setFieldsValue,
        getFieldsValue,
        validateFields,
      }),
      [getFieldsValue, setFieldsValue, validateFields],
    )

    return (
      <FormContext.Provider
        value={{
          name,
          labelAlign,
          controlAlign,
          validateTrigger,
        }}
      >
        <TaroForm onSubmit={handleSubmit} children={childrenProp} />
      </FormContext.Provider>
    )
  },
)

export default Form

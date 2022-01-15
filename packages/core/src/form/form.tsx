import { Form as TaroForm } from "@tarojs/components"
import { BaseEventOrig } from "@tarojs/components/types/common"
import { FormProps as TaroFormProps } from "@tarojs/components/types/Form"
import * as React from "react"
import { ForwardedRef, forwardRef, ReactNode, useEffect, useImperativeHandle } from "react"
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
      onSubmit,
      onValidate,
      onValuesChange,
      ...restProps
    } = props

    const nameId = useUniqueId()
    const name = nameProp ?? nameId

    const {
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
        <TaroForm onSubmit={handleSubmit} children={childrenProp} {...restProps} />
      </FormContext.Provider>
    )
  },
)

export default Form

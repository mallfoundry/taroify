import { useForceUpdate } from "@taroify/hooks"
import * as _ from "lodash"
import { useCallback, useContext, useEffect, useMemo } from "react"
import { useMemoizedFn } from "../hooks"
import FormContext from "./form.context"
import useForm from "./use-form"
import formListContext from "./form-list.context"

interface UseFormValueOptions {
  defaultValue?: any
  valueChangeHandler?(values: any): void
}

export default function useFormValue(name?: string, options?: UseFormValueOptions) {
  const { defaultValue, valueChangeHandler } = options ?? {}

  const { name: formName } = useContext(FormContext)
  const { inFormList } = useContext(formListContext)

  const form = useForm(formName)

  const forceUpdate = useForceUpdate()

  const onValueChange = useMemoizedFn((values) => {
    valueChangeHandler?.(values)
    forceUpdate()
  })

  useEffect(() => {
    form?.addEventListener(`fields.${name}.value.change`, onValueChange)
    return () => form?.removeEventListener(`fields.${name}.value.change`, onValueChange)
  }, [form, name, onValueChange])

  useEffect(
    () => {
      if (name && defaultValue) {
        form?.setDefaultValues({
          [name]: defaultValue,
        }, inFormList)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const getValue = useCallback(() => {
    if (form) {
      // The mini app does not supports undefined value
      return _.get(form.getValues(name), name as string) ?? ""
    }
  }, [form, name])

  return useMemo(
    () => ({
      get value() {
        return getValue()
      },
      setValue: (value: any) => {
        if (name) {
          form?.setValues({ [name]: value })
        }
      },
      getValue,
    }),
    [form, getValue, name],
  )
}

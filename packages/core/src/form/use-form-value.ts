import { useForceUpdate } from "@taroify/hooks"
import * as _ from "lodash"
import { useCallback, useContext, useEffect, useMemo } from "react"
import FormContext from "./form.context"
import useForm from "./use-form"

interface UseFormValueOptions {
  defaultValue?: any
}

export default function useFormValue(name?: string, options?: UseFormValueOptions) {
  const { defaultValue } = options ?? {}

  const { name: formName } = useContext(FormContext)

  const form = useForm(formName)

  const forceUpdate = useForceUpdate()

  const onValueChange = useCallback(() => forceUpdate(), [forceUpdate])

  useEffect(() => {
    form?.addEventListener(`fields.${name}.value.change`, onValueChange)
    return () => form?.removeEventListener(`fields.${name}.value.change`, onValueChange)
  }, [form, name, onValueChange])

  useEffect(
    () => {
      if (name) {
        form?.setDefaultValues({
          [name]: defaultValue,
        })
        onValueChange()
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

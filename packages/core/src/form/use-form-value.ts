import * as _ from "lodash"
import { useCallback, useContext, useEffect, useMemo } from "react"
import { useUpdate } from "../hooks"
import FormContext from "./form.context"
import useForm from "./use-form"

export default function useFormValue(name?: string) {
  const { name: formName } = useContext(FormContext)
  const form = useForm(formName)
  const update = useUpdate()

  const onValueChange = useCallback(() => update(), [update])

  useEffect(() => {
    form.addListener(`values.${name}.change`, onValueChange)
    return () => form.removeListener(`values.${name}.change`, onValueChange)
  }, [form, name, onValueChange])

  return useMemo(
    () => ({
      get value() {
        return _.get(form?.getValues(), name as string)
      },
      setValue: (value: any) => {
        if (name) {
          form?.setValues({ [name]: value })
        }
      },
      getValue: () => _.get(form?.getValues(), name as string),
    }),
    [form, name],
  )
}

import { useForceUpdate } from "@taroify/hooks"
import * as _ from "lodash"
import { useCallback, useContext, useEffect, useMemo } from "react"
import { useRendered } from "../utils/state"
import FormContext from "./form.context"
import { FormValidateStatus, FormValidError } from "./form.shared"
import useForm from "./use-form"

export default function useFormError(name?: string) {
  const { name: formName } = useContext(FormContext)

  const form = useForm(formName)

  const forceUpdate = useForceUpdate()

  const onErrorChange = useCallback(() => forceUpdate(), [forceUpdate])

  useEffect(() => {
    form?.addEventListener(`fields.${name}.error.change`, onErrorChange)
    return () => form?.removeEventListener(`fields.${name}.error.change`, onErrorChange)
  }, [form, name, onErrorChange])

  const getError = useCallback(() => _.first(form?.getErrors(name)), [form, name])

  const setError = useCallback(
    (error: Omit<FormValidError, "name">) => {
      if (name) {
        form?.setErrors([
          {
            ...error,
            name,
          },
        ])
      }
    },
    [form, name],
  )

  const resetError = useCallback(() => setError({ errors: [] }), [setError])

  const validateStatus = useRendered<FormValidateStatus>(() =>
    _.isEmpty(getError()?.errors) ? "valid" : "invalid",
  )

  return useMemo(
    () => ({
      validateStatus,
      get error() {
        return getError()
      },
      getError,
      setError,
      resetError,
    }),
    [getError, resetError, setError, validateStatus],
  )
}

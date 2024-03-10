import { useContext, useEffect, useState } from "react"
import { isFunction } from "lodash"
import { useDeepCompareEffect, useMemoizedFn } from "../hooks";
import FormContext from "./form.context"
import useForm from "./use-form"

export function useDependenciesChange(dependencies: string[] | undefined, validate: () => void) {
  const { name: formName } = useContext(FormContext)
  const form = useForm(formName)
  const validateMemo = useMemoizedFn(() => validate())

  useDeepCompareEffect(() => {
    const validFields = dependencies || []
    validFields.forEach(dep => {
      form.addEventListener(`fields.${dep}.value.change`, validateMemo)
    })
    return () => {
      validFields.forEach(dep => {
        form.removeEventListener(`fields.${dep}.value.change`, validateMemo)
      })
    }
  }, [dependencies, validateMemo])
}

export function useShouldUpdateSignal(shouldUpdate: boolean | ((prev, next) => boolean) | undefined) {
  const { name: formName } = useContext(FormContext)
  const form = useForm(formName)
  const [signal, setSignal] = useState(0)
  const shouldUpdateMemo = useMemoizedFn((oldVal, newVal) => {
    if (isFunction(shouldUpdate) ? shouldUpdate(oldVal, newVal) : shouldUpdate) {
      setSignal(prev => prev + 1)
    }
  })

  useEffect(() => {
    form.addEventListener("shouldUpdate", shouldUpdateMemo)
    return () => form.removeEventListener("change", shouldUpdateMemo)
  }, [form, shouldUpdateMemo])

  return signal
}

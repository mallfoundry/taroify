import { DependencyList, EffectCallback, useCallback, useContext, useEffect, useRef } from "react"
import FormContext from "./form.context"
import useForm from "./use-form"

function useFormFieldValueEffect(effect: EffectCallback, deps?: DependencyList) {
  const { name: formName } = useContext(FormContext)
  const form = useForm(formName)

  const mountedRef = useRef(false)

  const onReset = useCallback(() => (mountedRef.current = false), [])

  useEffect(() => {
    form?.addEventListener("reset", onReset)
    return () => form?.removeEventListener("reset", onReset)
  }, [form, onReset])

  useEffect(
    () => {
      if (mountedRef.current) {
        effect?.()
      } else {
        mountedRef.current = true
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps,
  )
}

export default useFormFieldValueEffect

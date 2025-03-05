import {
  type DependencyList,
  type EffectCallback,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react"
import FormContext from "./form.context"
import useForm from "./use-form"

function useFormFieldValueEffect(effect: EffectCallback, deps?: DependencyList) {
  const { name: formName } = useContext(FormContext)
  const form = useForm(formName)

  const mountedRef = useRef(false)

  // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
  const onReset = useCallback(() => (mountedRef.current = false), [])

  useEffect(() => {
    form?.addEventListener("reset", onReset)
    return () => form?.removeEventListener("reset", onReset)
  }, [form, onReset])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (mountedRef.current) {
      effect?.()
    } else {
      mountedRef.current = true
    }
  }, deps)
}

export default useFormFieldValueEffect

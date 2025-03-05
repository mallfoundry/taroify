import { useContext, useEffect } from "react"
import FormContext from "./form.context"
import type { FormItemInstance } from "./form.shared"
import useForm from "./use-form"
import formListContext from "./form-list.context"

export default function useFormField(name?: string, field?: FormItemInstance) {
  const { name: formName } = useContext(FormContext)
  const { inFormList } = useContext(formListContext)
  const form = useForm(formName)

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    form?.linkField?.(name, field, inFormList)
    return () => {
      form?.unlinkField(name, inFormList)
    }
  }, [name, field, inFormList])
}

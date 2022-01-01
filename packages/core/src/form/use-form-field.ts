import { useContext, useEffect } from "react"
import FormContext from "./form.context"
import { FormItemInstance } from "./form.shared"
import useForm from "./use-form"

export default function useFormField(name?: string, field?: FormItemInstance) {
  const { name: formName } = useContext(FormContext)
  const form = useForm(formName)
  if (name && field) {
    form?.linkField?.(name, field)
  }

  useEffect(
    () => () => form?.unlinkField?.(name),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )
}

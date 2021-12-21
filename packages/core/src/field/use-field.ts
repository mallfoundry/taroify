import { useContext, useEffect } from "react"
import FormContext from "../form/form.context"
import useForm from "../form/use-form"
import { FieldInstance } from "./field.shared"

export default function useField(name?: string, field?: FieldInstance) {
  const { name: formName } = useContext(FormContext)
  const { linkField, unlinkField } = useForm(formName)

  if (name && field) {
    linkField?.(name, field)
  }

  useEffect(
    () => () => unlinkField(name),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )
}

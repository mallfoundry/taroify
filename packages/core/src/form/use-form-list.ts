import { useState, useMemo, useContext, useEffect } from "react"
import { map, filter, cloneDeep } from "lodash"
import { useMemoizedFn } from "../hooks"
import FormContext from "./form.context"
import useForm from "./use-form"
import useFormField from "./use-form-field"
import useFormValue from "./use-form-value"
import type { FormListInstance, FormListItemField } from "./form.shared"

interface UseFormListOptions {
  defaultValue?: any
}

let fieldKey = 0
export default function useFormList(field: string, options?: UseFormListOptions) {
  const { defaultValue } = options ?? {}
  const { name: formName } = useContext(FormContext)
  const form = useForm(formName)
  const [fields, setFields] = useState<FormListItemField[]>([])

  const valueChangeHandler = useMemoizedFn((values) => {
    if ((values || []).length !== fields.length) {
      setFields(map(values, (_, i) => ({ name: `${field}.${i}`, key: ++fieldKey })))
    }
    const formAttributes = form?.getAttributiveForm()
    if (formAttributes?.errors?.[field]) {
      // @ts-ignore
      formAttributes.errors = {
        ...formAttributes.errors,
        [field]: [],
      }
    }
  })

  const resetHandler = useMemoizedFn(() => {
    setFields(map(getValue(), (_, i) => ({ name: `${field}.${i}`, key: ++fieldKey })))
  })

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    form?.addEventListener("reset", resetHandler)
    return () => form?.removeEventListener("reset", resetHandler)
  }, [form])

  const { getValue, setValue } = useFormValue(field, { defaultValue, valueChangeHandler })
  const instance = useMemo(
    () => ({
      name: field,
      validate: () => Promise.resolve(),
      getValue,
      setValue,
    }),
    [getValue, field, setValue],
  )

  useFormField(field, instance)
  const add = useMemoizedFn((value) => {
    setFields(fields.concat([{ name: `${field}.${fields.length}`, key: ++fieldKey }]))

    form?.setValues({ [`${field}.${fields.length}`]: value })
  })

  const remove = useMemoizedFn((index) => {
    const values: any[] = form?.getValues<[]>(field)?.[field] || []
    form?.setValues(
      {
        [field]: filter(values.slice(), (_, i) => i !== index),
      },
      false,
    )

    const formAttributes = form?.getAttributiveForm()
    if (formAttributes?.errors?.[field]) {
      const errors = formAttributes.errors[field]
      // @ts-ignore
      const newErrors = cloneDeep(filter(errors.slice(), (_, i) => i !== index))
      for (let i = 0; i < newErrors.length; i++) {
        if (newErrors[i]) {
          const keys = Object.keys(newErrors[i])
          // biome-ignore lint/complexity/useLiteralKeys: <explanation>
          if (keys.includes("name") && typeof newErrors[i]["name"] === "string") {
            // biome-ignore lint/complexity/useLiteralKeys: <explanation>
            newErrors[i]["name"] = `${field}.${i}`
          } else {
            // biome-ignore lint/complexity/noForEach: <explanation>
            keys.forEach((key) => {
              // biome-ignore lint/complexity/useLiteralKeys: <explanation>
              newErrors[i][key]["name"] = `${field}.${i}.${key}`
            })
          }
        }
      }
      // @ts-ignore
      formAttributes.errors = {
        ...formAttributes.errors,
        // @ts-ignore
        [field]: newErrors,
      }
    }

    setFields(
      filter(fields, (_, i) => i !== index).map((item, i) => ({
        name: `${field}.${i}`,
        key: item.key,
      })),
    )
  })

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const operation = useMemo(() => ({ add, remove }), [])
  return [fields, operation] as [FormListItemField[], FormListInstance]
}

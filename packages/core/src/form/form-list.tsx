import * as React from "react"
import { forwardRef, useImperativeHandle } from "react"
import { isFunction } from "lodash"
import FormListContext from "./form-list.context"
import useFormList from "./use-form-list"
import { FormListItemField, FormListInstance } from "./form.shared"

export interface FormListProps {
  name: string,
  children: (fields: FormListItemField[], operation: FormListInstance) => React.ReactNode
  defaultValue?: any
}

export default forwardRef(function FormList({ name: field, children, defaultValue }: FormListProps, ref) {
  const [fields, operation] = useFormList(field, { defaultValue })

  useImperativeHandle(ref, () => operation, [operation])

  return <FormListContext.Provider value={{
    inFormList: true
  }}>
    {
      isFunction(children) && children(fields, operation)
    }
  </FormListContext.Provider>
})

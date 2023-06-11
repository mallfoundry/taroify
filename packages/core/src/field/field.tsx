import * as React from "react"
import { ReactNode } from "react"
import Form, { FormController, FormFeedbackProps, FormItemProps, FormLabelProps } from "../form"
import { createVariantElement } from "../utils/element"

export interface FieldProps extends Omit<FormItemProps, "children"> {
  label?: ReactNode | FormLabelProps
  feedback?: ReactNode | FormFeedbackProps
  children?: ReactNode | ((controller: FormController<any>) => ReactNode)
}

function Field(props: FieldProps) {
  const { label: labelProp, feedback: feedbackProp, children, ...restProps } = props
  const label = createVariantElement(Form.Label, labelProp as ReactNode)
  const feedback = createVariantElement(Form.Feedback, feedbackProp as ReactNode)

  return (
    <Form.Item {...restProps}>
      {label}
      {children && <Form.Control children={children} />}
      {feedback}
    </Form.Item>
  )
}

export default Field

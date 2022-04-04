import * as React from "react"
import { ReactElement, ReactNode, ReactText } from "react"
import Form, { FormController, FormFeedbackProps, FormItemProps, FormLabelProps } from "../form"
import { createVariantElement } from "../utils/element"

export interface FieldProps extends FormItemProps {
  label?: ReactText | FormLabelProps | ReactElement
  feedback?: ReactText | FormFeedbackProps | ReactElement
  children?: ReactNode | ((controller: FormController<any>) => ReactNode)
}

function Field(props: FieldProps) {
  const { label: labelProp, feedback: feedbackProp, children, ...restProps } = props
  const label = createVariantElement(Form.Label, labelProp)
  const feedback = createVariantElement(Form.Feedback, feedbackProp)

  return (
    <Form.Item {...restProps}>
      {label}
      {children && <Form.Control children={children} />}
      {feedback}
    </Form.Item>
  )
}

export default Field

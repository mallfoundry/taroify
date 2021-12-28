import * as React from "react"
import { ReactNode } from "react"
import Form, { FormItemProps, FormLabelAlign } from "../form"
import { FormFeedbackAlign, FormFeedbackStatus } from "../form/form.shared"

export interface FieldProps extends FormItemProps {
  label?: ReactNode
  labelAlign?: FormLabelAlign
  feedback?: ReactNode
  feedbackAlign?: FormFeedbackAlign
  feedbackStatus?: FormFeedbackStatus
}

function Field(props: FieldProps) {
  const {
    label,
    labelAlign,
    //
    feedback,
    feedbackAlign,
    feedbackStatus,
    //
    children,
    //
    rules,
    ...restProps
  } = props

  return (
    <Form.Item {...restProps}>
      <Form.Label align={labelAlign} children={label} />
      <Form.Control children={children} />
      <Form.Feedback align={feedbackAlign} status={feedbackStatus} children={feedback} />
    </Form.Item>
  )
}

export default Field

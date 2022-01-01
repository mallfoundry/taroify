import * as React from "react"
import { ReactNode } from "react"
import Form, { FormController, FormItemProps, FormLabelAlign } from "../form"
import { FormFeedbackAlign, FormFeedbackStatus } from "../form"

export interface FieldProps extends FormItemProps {
  label?: ReactNode
  labelAlign?: FormLabelAlign
  feedback?: ReactNode
  feedbackAlign?: FormFeedbackAlign
  feedbackStatus?: FormFeedbackStatus
  children?: ReactNode | ((controller: FormController<any>) => ReactNode)
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
      {label && <Form.Label align={labelAlign} children={label} />}
      {children && <Form.Control children={children} />}
      {feedback && (
        <Form.Feedback align={feedbackAlign} status={feedbackStatus} children={feedback} />
      )}
    </Form.Item>
  )
}

export default Field

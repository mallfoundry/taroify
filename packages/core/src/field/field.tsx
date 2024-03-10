import * as React from "react"
import { ReactNode, useRef, useImperativeHandle, forwardRef } from "react"
import Form, { FormController, FormFeedbackProps, FormItemInstance, FormItemProps, FormLabelProps } from "../form"
import { createVariantElement } from "../utils/element"

export interface FieldProps extends Omit<FormItemProps, "children"> {
  label?: ReactNode | FormLabelProps
  feedback?: ReactNode | FormFeedbackProps
  children?: ReactNode | ((controller: FormController<any>) => ReactNode)
}

function _Field(props: FieldProps, ref) {
  const { label: labelProp, feedback: feedbackProp, children, ...restProps } = props
  const label = createVariantElement(Form.Label, labelProp as ReactNode)
  const feedback = createVariantElement(Form.Feedback, feedbackProp as ReactNode)
  const formItemRef = useRef<FormItemInstance>()

  useImperativeHandle(ref, () => formItemRef.current, [formItemRef])

  if ("noStyle" in restProps || "shouldUpdate" in restProps) {
   // eslint-disable-next-line
   console.warn('[Taroify] Field: not support noStyle & shouldUpdate property')
  }

  return (
    <Form.Item {...restProps} ref={formItemRef}>
      {label}
      {children && <Form.Control children={children} />}
      {feedback}
    </Form.Item>
  )
}

const Field = forwardRef<FormItemInstance, FieldProps>(_Field)

export default Field

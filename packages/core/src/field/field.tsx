import * as React from "react"
import { createElement as createReactElement, isValidElement, ReactNode} from "react"
import Form, {FormController, FormFeedbackAlign, FormFeedbackStatus, FormItemProps, FormLabelAlign} from "../form"

function createElement(type: any, node: any): any {
  if (isValidElement(node)) {
    return node
  } else if (typeof node === "string") {
    return createReactElement(type, {children: node})
  } else {
    return createReactElement(type, node)
  }
}


function createComponent(type: any, node: any) {
  const Component = () => createElement(type, node)
  Component.displayName = "FormLabel"
  return Component
}


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

  const FormLabel = createComponent(Form.Label, label)

  return (
    <Form.Item {...restProps} rules={rules}>
      <FormLabel></FormLabel>
      {children && <Form.Control children={children}/>}
      {feedback && (
        <Form.Feedback align={feedbackAlign} status={feedbackStatus} children={feedback}/>
      )}
    </Form.Item>
  )
}

export default Field

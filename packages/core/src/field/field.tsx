import * as React from "react"
import {
  ComponentClass,
  createElement,
  FunctionComponent,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  ReactText,
} from "react"
import { isFragment } from "react-is"
import Form, {
  FormController,
  FormFeedbackAlign,
  FormFeedbackStatus,
  FormItemProps,
  FormLabelAlign,
  FormLabelProps,
} from "../form"
import { isObjectElement, isTextElement } from "../utils/validate"

function createUnknownElement(
  type: FunctionComponent<PropsWithChildren<any>> | ComponentClass<PropsWithChildren<any>>,
  node?: ReactNode,
): JSX.Element {
  if (isTextElement(node)) {
    return createElement(type, { children: node })
  } else if (isObjectElement(node)) {
    return createElement(type, node)
  }
  return node as JSX.Element
}

export interface FieldProps extends FormItemProps {
  label?: ReactText | FormLabelProps | ReactElement<FormLabelProps>
  labelAlign?: FormLabelAlign
  feedback?: ReactNode
  feedbackAlign?: FormFeedbackAlign
  feedbackStatus?: FormFeedbackStatus
  children?: ReactNode | ((controller: FormController<any>) => ReactNode)
}

function Field(props: FieldProps) {
  const {
    label: labelProp,
    // labelAlign,
    //
    feedback,
    // feedbackAlign,
    // feedbackStatus,
    //
    children,
    //
    ...restProps
  } = props
  const label = createUnknownElement(Form.Label, labelProp)

  console.log(isFragment(feedback))
  return (
    <Form.Item {...restProps}>
      {label}
      {children && <Form.Control children={children} />}
      {feedback}
      {/*{feedback && (*/}
      {/*  <Form.Feedback align={feedbackAlign} status={feedbackStatus} children={feedback} />*/}
      {/*)}*/}
    </Form.Item>
  )
}

export default Field

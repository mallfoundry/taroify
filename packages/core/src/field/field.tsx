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
  node?: ReactNode | ReactNode[],
): JSX.Element | JSX.Element[] {
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
  feedback?: any //ReactNode | ReactElement<FormFeedbackProps> | FormFeedbackProps
  feedbackAlign?: FormFeedbackAlign
  feedbackStatus?: FormFeedbackStatus
  children?: ReactNode | ((controller: FormController<any>) => ReactNode)
}

function Field(props: FieldProps) {
  const {
    label: labelProp,
    // labelAlign,
    //
    feedback: feedbackProp,
    // feedbackAlign,
    //feedbackStatus,
    //
    children,
    //
    ...restProps
  } = props
  const label = createUnknownElement(Form.Label, labelProp)
  const {
    props: { children: feedbackPropChildren },
  } = feedbackProp
  const feedback = createUnknownElement(Form.Feedback, feedbackPropChildren)
  return (
    <Form.Item {...restProps}>
      {label}
      {children && <Form.Control children={children} />}
      {feedback}
    </Form.Item>
  )
}

export default Field

import * as React from "react"
import {
  ComponentClass,
  createElement,
  FunctionComponent,
  isValidElement,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  ReactText,
} from "react"
import Form, {
  FormController,
  FormFeedbackAlign,
  FormFeedbackProps,
  FormFeedbackStatus,
  FormItemProps,
  FormLabelAlign,
  FormLabelProps,
} from "../form"

import { isObjectElement, isTextElement } from "../utils/validate"

function createUnknownComponentWrapper(children: ReactNode, displayName?: string) {
  const Component = () => children as JSX.Element
  Component.displayName = displayName
  return Component
}

function createUnknownElement(
  type: FunctionComponent<PropsWithChildren<any>> | ComponentClass<PropsWithChildren<any>>,
  node?: ReactNode | ReactNode[],
): JSX.Element | JSX.Element[] {
  if (isTextElement(node)) {
    return createElement(type, { children: node })
  }
  if (isObjectElement(node)) {
    return createElement(type, node)
  }
  if (isValidElement(node)) {
    const ComponentWrapper = createUnknownComponentWrapper(node, type.displayName)
    return createElement(ComponentWrapper)
  }
  return node as JSX.Element
}

export interface FieldProps extends FormItemProps {
  label?: ReactText | FormLabelProps | ReactElement<FormLabelProps>
  labelAlign?: FormLabelAlign
  feedback?: ReactText | FormFeedbackProps | ReactElement<FormFeedbackProps> | ReactElement
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
  const feedback = createUnknownElement(Form.Feedback, feedbackProp)

  return (
    <Form.Item {...restProps}>
      {label}
      {children && <Form.Control children={children} />}
      {feedback}
    </Form.Item>
  )
}

export default Field

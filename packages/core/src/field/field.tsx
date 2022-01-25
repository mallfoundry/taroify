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
import Form, { FormController, FormFeedbackProps, FormItemProps, FormLabelProps } from "../form"

import { isObjectElement, isTextElement } from "../utils/validate"

function createVariantComponentWrapper(children: ReactNode, displayName?: string) {
  const Component = () => children as JSX.Element
  Component.displayName = displayName
  return Component
}

function createVariantElement(
  type: FunctionComponent<PropsWithChildren<any>> | ComponentClass<PropsWithChildren<any>>,
  node?: ReactNode | ReactNode[],
): JSX.Element {
  if (isTextElement(node)) {
    return createElement(type, { children: node })
  }
  if (isObjectElement(node)) {
    return createElement(type, node)
  }
  if (isValidElement(node)) {
    const ComponentWrapper = createVariantComponentWrapper(node, type.displayName)
    return createElement(ComponentWrapper)
  }
  return node as JSX.Element
}

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

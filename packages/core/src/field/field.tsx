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
  useMemo,
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

function useUnknownElement(
  type: FunctionComponent<PropsWithChildren<any>> | ComponentClass<PropsWithChildren<any>>,
  node?: ReactNode | ReactNode[],
) {
  return useMemo(() => createUnknownElement(type, node), [node, type])
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
  const label = useUnknownElement(Form.Label, labelProp)
  const feedback = useUnknownElement(Form.Feedback, feedbackProp)

  return (
    <Form.Item {...restProps}>
      {label}
      {children && <Form.Control children={children} />}
      {feedback}
    </Form.Item>
  )
}

export default Field

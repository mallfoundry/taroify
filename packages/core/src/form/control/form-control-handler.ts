import { ReactElement, ReactNode } from "react"
import { FormController } from "../form.shared"

export default interface FormControlHandler<P> {
  doControlRender(element: ReactElement<P>, controller: FormController<any>): ReactNode

  supportsControlType(elementType: any): boolean
}

const CONTROL_HANDLERS: FormControlHandler<any>[] = []

export function doFormControlHandler(
  element: ReactElement,
  controller: FormController<any>,
): ReactNode {
  const { type } = element

  for (const handler of CONTROL_HANDLERS) {
    if (handler.supportsControlType(type)) {
      return handler.doControlRender(element, controller)
    }
  }

  return element
}

export function registerFormControlHandler(handler: FormControlHandler<any>) {
  CONTROL_HANDLERS.push(handler)
}

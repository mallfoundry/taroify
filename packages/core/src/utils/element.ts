import {
  ComponentClass,
  createElement,
  FunctionComponent,
  isValidElement,
  PropsWithChildren,
  ReactNode,
} from "react"
import { isObjectElement, isTextElement } from "./validate"

function createVariantComponentWrapper(children: ReactNode, displayName?: string) {
  const Component = () => children as JSX.Element
  Component.displayName = displayName
  return Component
}

export function createVariantElement(
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

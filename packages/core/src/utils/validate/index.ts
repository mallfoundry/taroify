import * as _ from "lodash"
import { isValidElement, JSXElementConstructor, ReactElement, ReactNode } from "react"
import Backdrop from "../../backdrop"

export function isElementOf(node?: ReactNode, type?: JSXElementConstructor<any>) {
  if (isValidElement(node)) {
    const element = node as ReactElement
    if (element.type === Backdrop) {
      return true
    }
    if (_.isFunction(element.type) && _.endsWith(element.type.name, type?.name)) {
      return true
    }
  }
  return false
}

import * as _ from "lodash"
import { isValidElement, JSXElementConstructor, ReactElement, ReactNode } from "react"

export function isTextElement(node: ReactNode) {
  return !isValidElement(node) && !_.isArray(node)
}

export function isElementOf(node?: ReactNode, type?: JSXElementConstructor<any>) {
  if (isValidElement(node)) {
    const element = node as ReactElement
    if (element.type === type) {
      return true
    }
    const displayName = _.get(element.type, "displayName")
    if (
      _.isFunction(element.type) &&
      !_.isEmpty(displayName) &&
      _.endsWith(displayName, _.get(type, "displayName"))
    ) {
      return true
    }
  }
  return false
}

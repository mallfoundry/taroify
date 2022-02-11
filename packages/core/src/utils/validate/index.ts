import * as _ from "lodash"
import { isValidElement, JSXElementConstructor, ReactElement, ReactNode } from "react"

export function isNoneElement(node: ReactNode) {
  return _.isUndefined(node) || _.isNull(node)
}

export function isTextElement(node: ReactNode) {
  return _.isNumber(node) || _.isString(node)
}

export function isObjectElement(node?: ReactNode) {
  return !isValidElement(node) && _.isObject(node) && !_.isArray(node)
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

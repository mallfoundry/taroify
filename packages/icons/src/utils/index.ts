import classNames from "classnames"
import * as _ from "lodash"
import { cloneElement, isValidElement, ReactElement, ReactNode } from "react"
import { ICON_TYPE, IconProps } from "../shared"

export function isIconElement(node?: ReactNode): boolean {
  // Is`t not ReactElement
  if (!isValidElement(node)) {
    return false
  }
  const element = node as ReactElement
  return _.hasIn(element.type, ICON_TYPE)
}

export function cloneIconElement(node: ReactNode, props: IconProps): ReactNode {
  if (!isIconElement(node)) {
    return isValidElement(node) ? cloneElement(node, props) : node
  }
  const { className, ...restProps } = props
  const element = node as ReactElement
  const { props: oldProps } = element
  const newProps: IconProps = {
    ...oldProps,
    className: classNames(oldProps.className, className),
    ...restProps,
  }
  return cloneElement(element, newProps)
}

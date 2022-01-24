import * as _ from "lodash"
import { Children as ReactChildren, ReactNode } from "react"
import { isObjectElement } from "./validate"

function isObjectChildren(children?: ReactNode) {
  if (!_.isArray(children)) {
    return false
  }
  const node = _.first(children)
  return isObjectElement(node)
}

function forEachChildren<C>(children: C | C[], fn: (child: C, index: number) => void) {
  const objectified = isObjectChildren(children)
  const forEach = objectified ? _.forEach : ReactChildren.forEach
  return forEach(children, fn)
}

function mapChildren<T, C>(
  children: C | C[],
  fn: (child: C, index: number) => T,
): C extends null | undefined ? C : Array<Exclude<T, boolean | null | undefined>> {
  const objectified = isObjectChildren(children)
  const map = objectified ? _.map : ReactChildren.map
  return map(children, fn)
}

const Children = {
  toArray: ReactChildren.toArray,
  forEach: forEachChildren,
  map: mapChildren,
}

export default Children

import * as _ from "lodash"
import { Children, isValidElement, ReactElement, ReactNode } from "react"

export function findChildren(children: ReactNode, type: any): ReactNode[] {
  const nodes: ReactNode[] = Children.toArray(children)
  return _.filter(nodes, (node) => {
    if (!isValidElement(node)) {
      return false
    }
    const element = node as ReactElement
    return element.type === type
  })
}

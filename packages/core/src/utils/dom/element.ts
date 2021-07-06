import { createSelectorQuery } from "@tarojs/taro"

export const ELEMENT_NODE_TYPE = 1

export function isWindow(val: unknown): val is Window {
  return val === window
}

export interface TaroElement extends HTMLElement {
  uid: string
}

export function elementUnref(elementOrRef: any): TaroElement {
  if (elementOrRef === undefined || elementOrRef === null) {
    return elementOrRef
  }
  if ("current" in elementOrRef) {
    return elementOrRef.current
  }
  return elementOrRef
}

export function isRootElement(node: TaroElement) {
  return node.nodeType === ELEMENT_NODE_TYPE && node.tagName === "ROOT"
}

export function createNodesRef(element: TaroElement) {
  return isRootElement(element)
    ? createSelectorQuery().selectViewport()
    : createSelectorQuery().select("#" + element.uid)
}

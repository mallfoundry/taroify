import type { TaroElement } from "@tarojs/runtime"
import { createSelectorQuery } from "@tarojs/taro"
import * as _ from "lodash"
import { inWechat } from "../base"

export const ELEMENT_NODE_TYPE = 1

export function isWindow(val: unknown): val is Window {
  return val === window
}

export function isBodyElement(val: unknown): boolean {
  return val === document.body
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

export function isRootElement(node?: TaroElement) {
  return node?.nodeType === ELEMENT_NODE_TYPE && node?.tagName === "ROOT"
}

export function matchSelector(aSelector?: string, bSelector?: string) {
  return _.replace(aSelector as string, "#", "") === bSelector
}

export function createNodesRef(elementOrRef: any) {
  if (_.isString(elementOrRef)) {
    return createSelectorQuery().select("#" + elementOrRef)
  }

  const element = elementUnref(elementOrRef)

  if (isRootElement(element)) {
    return createSelectorQuery().selectViewport()
  }

  if (inWechat) {
    let parentNode = element;
    while (parentNode.parentNode && !isRootElement(parentNode.parentNode)) {
      parentNode = parentNode.parentNode
    }

    if (parentNode && parentNode !== element) {
      return createSelectorQuery().select(`#${parentNode.uid}>>>#${element.uid}`)
    }
  }

  return  createSelectorQuery().select("#" + element.uid)
}

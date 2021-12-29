import { TaroElement } from "@tarojs/runtime"
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

// Fix nested in CustomWrapper is undefined
// See: https://github.com/mallfoundry/taroify/pull/143
function ancestorCustomWrapper(element: TaroElement) {
  if (inWechat) {
    let ancestor = element
    while (ancestor.parentNode && !isRootElement(ancestor.parentNode as TaroElement)) {
      ancestor = ancestor.parentNode as TaroElement
    }

    if (ancestor && ancestor !== element) {
      return ancestor
    }
  }
}

export function queryNodesRef(element: TaroElement) {
  if (isRootElement(element)) {
    return createSelectorQuery().selectViewport()
  }

  const ancestor = ancestorCustomWrapper(element)
  if (ancestor) {
    return createSelectorQuery().select(`#${ancestor.uid}>>>#${element.uid}`)
  }

  return createSelectorQuery().select("#" + element.uid)
}

export function queryAllNodesRef(element: TaroElement, selector?: string) {
  if (isRootElement(element)) {
    return createSelectorQuery().selectViewport()
  }

  const ancestor = ancestorCustomWrapper(element)
  if (ancestor) {
    return createSelectorQuery().selectAll(`#${ancestor.uid}>>>#${element.uid}${selector}`)
  }

  return createSelectorQuery().selectAll("#" + element.uid + selector)
}

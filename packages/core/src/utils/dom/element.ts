import { TaroElement } from "@tarojs/runtime"
import { createSelectorQuery, getCurrentInstance, useRouter } from "@tarojs/taro"
import * as _ from "lodash"
import { inWechat } from "../base"

export const ELEMENT_NODE_TYPE = 1

export function isWindow(val: unknown): val is Window {
  return val === window
}

export function isBodyElement(val: unknown): boolean {
  return val === document.body
}

export function isRootElement(node?: TaroElement) {
  return node?.nodeType === ELEMENT_NODE_TYPE && node?.tagName === "ROOT"
}

export function isBlockElement(node?: TaroElement) {
  return node?.nodeType === ELEMENT_NODE_TYPE && node?.tagName === "BLOCK"
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

export function matchSelector(aSelector?: string, bSelector?: string) {
  return aSelector === bSelector
}

export function getElementSelector(id?: string, className?: string) {
  const selectors: string[] = []
  if (!_.isEmpty(id)) {
    selectors.push(`#${id}`)
  }
  if (!_.isEmpty(className)) {
    selectors.push(_.split(className, " ").join("."))
  }
  return selectors.join(".")
}

export function prependPageSelector(selector?: string) {
  const path = getCurrentInstance().router?.path
  return path ? `${path}__${selector}` : selector
}

export function usePrependPageSelector(selector?: string) {
  const { path } = useRouter()
  return path ? `${path}__${selector}` : selector
}

// Fix nested in CustomWrapper is undefined
// See: https://github.com/mallfoundry/taroify/pull/143
// Fix nested in a Block element does not query elements
// See: https://github.com/mallfoundry/taroify/pull/370
function getAncestorWrapper(element: TaroElement) {
  if (inWechat) {
    let ancestor = element

    for (let cursor = element; !_.isEmpty(cursor.parentNode); ) {
      if (isRootElement(cursor.parentNode as TaroElement)) {
        break
      }

      if (!isBlockElement(cursor.parentNode as TaroElement)) {
        ancestor = cursor.parentNode as TaroElement
      }

      cursor = cursor.parentNode as TaroElement
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

  const ancestor = getAncestorWrapper(element)
  if (ancestor) {
    return createSelectorQuery().select(`#${ancestor.uid}>>>#${element.uid}`)
  }

  return createSelectorQuery().select("#" + element.uid)
}

export function queryAllNodesRef(element: TaroElement, selector?: string) {
  if (isRootElement(element)) {
    return createSelectorQuery().selectViewport()
  }

  const ancestor = getAncestorWrapper(element)
  if (ancestor) {
    return createSelectorQuery().selectAll(`#${ancestor.uid}>>>#${element.uid}${selector}`)
  }

  return createSelectorQuery().selectAll("#" + element.uid + selector)
}

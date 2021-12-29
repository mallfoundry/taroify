import { TaroElement } from "@tarojs/runtime"
import { createSelectorQuery } from "@tarojs/taro"
import { inBrowser } from "../base"
import { getComputedStyle } from "./computed-style"
import { elementUnref, isRootElement, queryNodesRef } from "./element"

const defaultRoot: HTMLElement | undefined = inBrowser
  ? ((window as unknown) as HTMLElement)
  : undefined

const ELEMENT_NODE_TYPE = 1

const overflowScrollReg = /scroll|auto/i

function isElementNode(node: Element) {
  return node.tagName !== "HTML" && node.tagName !== "BODY" && node.nodeType === ELEMENT_NODE_TYPE
}

// https://github.com/youzan/vant/issues/3823
export async function getScrollParent(
  elementOrRef?: any,
  root: HTMLElement | undefined = defaultRoot,
) {
  let node: HTMLElement = (elementUnref(elementOrRef) as unknown) as HTMLElement

  while (node && node !== root && isElementNode(node)) {
    const { overflowY } = await getComputedStyle(node, ["overflowY"])
    if (overflowScrollReg.test(overflowY)) {
      return node
    }
    // Is root element
    if (isRootElement((node as unknown) as TaroElement)) {
      return node
    }
    node = node.parentNode as HTMLElement
  }

  return root
}

interface ScrollOffset {
  scrollLeft: number
  scrollTop: number
}

export function getRootScrollTop(): Promise<number> {
  return new Promise((resolve) => {
    if (inBrowser) {
      resolve(
        window.pageYOffset || //
          document.documentElement.scrollTop ||
          document.body.scrollTop ||
          0,
      )
    } else {
      createSelectorQuery()
        .selectViewport()
        .scrollOffset(({ scrollTop }) => resolve(scrollTop))
        .exec()
    }
  })
}

function makeScrollOffset() {
  return {
    scrollTop: 0,
    scrollLeft: 0,
  }
}

export function getScrollOffset(elementOrRef: any): Promise<ScrollOffset> {
  const element = elementUnref(elementOrRef)
  if (element) {
    if (inBrowser) {
      const $element = element as any

      const top = "scrollTop" in element ? $element.scrollTop : $element["pageYOffset"]
      const left = "scrollLeft" in element ? $element.scrollLeft : $element["pageXOffset"]
      return Promise.resolve({
        scrollTop: Math.max(top, 0),
        scrollLeft: Math.max(left, 0),
      } as ScrollOffset)
    } else {
      return new Promise<ScrollOffset>((resolve) => {
        queryNodesRef(element).scrollOffset(resolve).exec()
      })
    }
  }
  return Promise.resolve(makeScrollOffset())
}

export function getScrollTop(elementOrRef: any): Promise<number> {
  return getScrollOffset(elementOrRef).then(({ scrollTop }) => scrollTop)
}

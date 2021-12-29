import { inBrowser } from "../base"
import { elementUnref, queryNodesRef } from "./element"

export function getComputedStyle(
  elementOrRef: any,
  computedStyle: string[],
): Promise<CSSStyleDeclaration> {
  const element = elementUnref(elementOrRef)
  if (element) {
    if (inBrowser) {
      return Promise.resolve(window.getComputedStyle(element as any))
    } else {
      return new Promise<CSSStyleDeclaration>((resolve) => {
        queryNodesRef(element)
          .fields(
            {
              computedStyle,
            },
            (result) => resolve(result as CSSStyleDeclaration),
          )
          .exec()
      })
    }
  }

  return Promise.resolve({} as CSSStyleDeclaration)
}

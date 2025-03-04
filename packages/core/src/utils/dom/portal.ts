import { getCurrentPages } from "@tarojs/taro"
import { render, unmountComponentAtNode } from "@tarojs/react"
import { document, type TaroNode } from "@tarojs/runtime"

export function getPagePath() {
  const currentPages = getCurrentPages()
  const currentPage = currentPages[currentPages.length - 1]
  const path = currentPage.$taroPath
  return path
}

const portalViewMap: Map<string, TaroNode> = new Map()

export function mountPortal(children: TaroNode, dom?: TaroNode) {
  const view = dom || document.createElement("view")
  const path = getPagePath()
  const pageElement = document.getElementById(path)
  if (pageElement) {
    if (!portalViewMap.has(path)) {
      const portalView = document.createElement("view")
      pageElement.appendChild(portalView)
      portalViewMap.set(path, portalView)
    }
    render(children, view)
    portalViewMap.get(path)?.appendChild(view)
  } else {
    console.error("[Taroify] cannot find page element")
  }
  return view
}

export function unmountPortal(dom: TaroNode) {
  const path = getPagePath()
  const pageElement = document.getElementById(path)
  unmountComponentAtNode(dom)
  if (pageElement) {
    dom.parentElement?.removeChild(dom)
  } else {
    console.error("[Taroify] cannot find page element")
  }
}

import { getCurrentPages, getCurrentInstance } from "@tarojs/taro"
import { render, unmountComponentAtNode } from "@tarojs/react"
import { document, type TaroNode } from "@tarojs/runtime"

export function getPagePath() {
  const currentPages = getCurrentPages()
  const currentPage = currentPages[currentPages.length - 1]
  return currentPage?.$taroPath || currentPage?.route || getCurrentInstance()?.router?.path || ""
}

const portalViewMap: Map<string, TaroNode> = new Map()

export function mountPortal(children: TaroNode, dom?: TaroNode) {
  const view = dom || document.createElement("view")
  const path = getPagePath()
  const portalKey = path || "__app__"
  const pageElement = (path && document.getElementById(path)) || document.body
  if (pageElement) {
    if (!portalViewMap.has(portalKey)) {
      const portalView = document.createElement("view")
      pageElement.appendChild(portalView)
      portalViewMap.set(portalKey, portalView)
    }
    render(children, view)
    portalViewMap.get(portalKey)?.appendChild(view)
  } else {
    console.error("[Taroify] cannot find page element or app root element")
  }
  return view
}

export function unmountPortal(dom: TaroNode) {
  unmountComponentAtNode(dom)
  dom.parentElement?.removeChild(dom)
}

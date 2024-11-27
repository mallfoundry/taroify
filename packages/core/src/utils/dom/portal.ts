import { getCurrentPages } from "@tarojs/taro"
import { render, unmountComponentAtNode } from "@tarojs/react"
import { document, TaroNode } from "@tarojs/runtime"

export function getPagePath() {
  const currentPages = getCurrentPages();
  const currentPage = currentPages[currentPages.length - 1];
  const path = currentPage.$taroPath;
  return path
}

export function mountPortal(children: TaroNode, dom?: TaroNode) {
  const view = dom || document.createElement("view")
  const path = getPagePath();
  const pageElement = document.getElementById(path);
  if (pageElement) {
    render(children, view)
    pageElement.appendChild(view)
  } else {
    // eslint-disable-next-line
    console.error("[Taroify] cannot find page element")
  }
  return view
}

export function unmountPortal(dom: TaroNode) {
  const path = getPagePath();
  const pageElement = document.getElementById(path);
  unmountComponentAtNode(dom);
  if (pageElement) {
    pageElement.removeChild(dom)
  } else {
    // eslint-disable-next-line
    console.error("[Taroify] cannot find page element")
  }
}

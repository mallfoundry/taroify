import { cloneIconElement } from "@taroify/icons/utils"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"

interface NoticeBarActionProps {
  children?: ReactNode
}

export function NoticeBarAction(props: NoticeBarActionProps): JSX.Element {
  const { children } = props
  return cloneIconElement(children, {
    className: prefixClassname("notice-bar__action"),
  }) as JSX.Element
}

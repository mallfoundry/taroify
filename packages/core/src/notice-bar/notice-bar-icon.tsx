import { cloneIconElement } from "@taroify/icons/utils"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"

interface NoticeBarIconProps {
  children?: ReactNode
}

export function NoticeBarIcon(props: NoticeBarIconProps): JSX.Element {
  const { children } = props
  return cloneIconElement(children, {
    className: prefixClassname("notice-bar__icon"),
  }) as JSX.Element
}

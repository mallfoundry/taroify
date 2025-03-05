import { cloneIconElement } from "@taroify/icons/utils"
import type { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import type { ReactNode } from "react"
import { prefixClassname } from "../styles"

interface NoticeBarActionProps extends ViewProps {
  children?: ReactNode
}

export function NoticeBarAction(props: NoticeBarActionProps): JSX.Element {
  const { className, children, onClick, ...restProps } = props
  // @ts-ignore
  return cloneIconElement(children, {
    className: classNames(prefixClassname("notice-bar__action"), className),
    onClick(e) {
      e.stopPropagation()
      onClick?.(e)
    },
    ...restProps,
  }) as JSX.Element
}

import { cloneIconElement } from "@taroify/icons/utils"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"

interface NoticeBarActionProps extends ViewProps {
  children?: ReactNode
}

export function NoticeBarAction(props: NoticeBarActionProps): JSX.Element {
  const { className, children, ...restProps } = props
  // @ts-ignore
  return cloneIconElement(children, {
    className: classNames(prefixClassname("notice-bar__action"), className),
    ...restProps,
  }) as JSX.Element
}

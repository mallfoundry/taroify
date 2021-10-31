import { cloneIconElement } from "@taroify/icons/utils"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"

interface NoticeBarIconProps extends ViewProps {
  children?: ReactNode
}

export function NoticeBarIcon(props: NoticeBarIconProps): JSX.Element {
  const { className, children, ...restProps } = props

  // @ts-ignore
  return cloneIconElement(children, {
    className: classNames(prefixClassname("notice-bar__icon"), className),
    ...restProps,
  }) as JSX.Element
}

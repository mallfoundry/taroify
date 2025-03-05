import { View } from "@tarojs/components"
import type { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import type { ReactNode } from "react"
import { prefixClassname } from "../styles"

interface NavBarTitleProps extends ViewProps {
  className?: string
  children?: ReactNode
}

export function NavBarTitle(props: NavBarTitleProps) {
  const { className, ...restProps } = props
  return <View className={classNames(prefixClassname("navbar__title"), className)} {...restProps} />
}

export default NavBarTitle

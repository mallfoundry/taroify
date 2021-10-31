import { cloneIconElement } from "@taroify/icons/utils"
import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { isValidElement, ReactNode } from "react"
import { prefixClassname } from "../styles"

interface NavBarRightProps extends ViewProps {
  icon?: ReactNode
  children?: ReactNode
}

export function NavBarRight(props: NavBarRightProps) {
  const { className, icon, children, ...restProps } = props

  return (
    <View className={classNames(prefixClassname("navbar__right"), className)} {...restProps}>
      {icon && cloneIconElement(icon, { className: prefixClassname("navbar__icon") })}
      {isValidElement(children) ? (
        children
      ) : (
        <View className={prefixClassname("navbar__text")} children={children} />
      )}
    </View>
  )
}

export default NavBarRight

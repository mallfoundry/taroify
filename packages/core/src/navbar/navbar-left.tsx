import { ArrowLeft } from "@taroify/icons"
import { cloneIconElement } from "@taroify/icons/utils"
import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { isValidElement, ReactNode } from "react"
import { prefixClassname } from "../styles"

interface NavBarLeftProps extends ViewProps {
  icon?: ReactNode
  children?: ReactNode
}

export function NavBarLeft(props: NavBarLeftProps) {
  const { className, icon = <ArrowLeft />, children, ...restProps } = props
  return (
    <View className={classNames(prefixClassname("navbar__left"), className)} {...restProps}>
      {icon && cloneIconElement(icon, { className: prefixClassname("navbar__icon") })}
      {isValidElement(children) ? (
        children
      ) : (
        <View className={prefixClassname("navbar__text")} children={children} />
      )}
    </View>
  )
}

export default NavBarLeft

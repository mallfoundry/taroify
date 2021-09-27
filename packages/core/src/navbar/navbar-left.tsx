import { ArrowLeft } from "@taroify/icons"
import { cloneIconElement } from "@taroify/icons/utils"
import { ITouchEvent, View } from "@tarojs/components"
import * as React from "react"
import { isValidElement, ReactNode } from "react"
import { prefixClassname } from "../styles"

interface NavBarLeftProps {
  icon?: ReactNode
  children?: ReactNode

  onClick?(event: ITouchEvent): void
}

export function NavBarLeft(props: NavBarLeftProps) {
  const { icon = <ArrowLeft />, children, onClick } = props
  return (
    <View className={prefixClassname("navbar__left")} onClick={onClick}>
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

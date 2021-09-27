import { cloneIconElement } from "@taroify/icons/utils"
import { ITouchEvent, View } from "@tarojs/components"
import * as React from "react"
import { isValidElement, ReactNode } from "react"
import { prefixClassname } from "../styles"

interface NavBarRightProps {
  icon?: ReactNode
  children?: ReactNode

  onClick?(event: ITouchEvent): void
}

export function NavBarRight(props: NavBarRightProps) {
  const { icon, children, onClick } = props

  return (
    <View className={prefixClassname("navbar__right")} onClick={onClick}>
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

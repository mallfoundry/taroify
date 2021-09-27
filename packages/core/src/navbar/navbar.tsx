import { ArrowLeft } from "@taroify/icons"
import { cloneIconElement } from "@taroify/icons/utils"
import { ITouchEvent, View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { Children, isValidElement, ReactElement, ReactNode, useMemo } from "react"
import { prefixClassname } from "../styles"
import { HAIRLINE_BORDER_BOTTOM } from "../styles/hairline"
import NavBarLeft from "./navbar-left"
import NavBarRight from "./navbar-right"

interface NavbarChildren {
  left?: ReactNode
  right?: ReactNode
}

function useNavbarChildren(children?: ReactNode): NavbarChildren {
  return useMemo(() => {
    const __children__: NavbarChildren = {
      left: undefined,
      right: undefined,
    }

    Children.forEach(children, (child: ReactNode) => {
      if (isValidElement(child)) {
        const element = child as ReactElement

        const { type } = element
        if (type === NavBarLeft) {
          __children__.left = element
        } else if (type === NavBarRight) {
          __children__.right = element
        }
      }
    })
    return __children__
  }, [children])
}

export interface NavbarProps {
  className?: boolean
  bordered?: boolean
  fixed?: boolean
  title?: ReactNode
  children?: ReactNode
}

function Navbar(props: NavbarProps) {
  const { className, bordered, title } = props
  const { left, right } = useNavbarChildren(props.children)
  return (
    <View
      className={classNames(
        prefixClassname("navbar"),
        {
          [HAIRLINE_BORDER_BOTTOM]: bordered,
        },
        className,
      )}
    >
      <View className={classNames(prefixClassname("navbar__content"))}>
        {left}
        <View className={classNames(prefixClassname("navbar__title"))} children={title} />
        {right}
      </View>
    </View>
  )
}

namespace Navbar {
  interface NavLeftProps {
    icon?: ReactNode
    children?: ReactNode

    onClick?(event: ITouchEvent): void
  }

  export function NavLeft(props: NavLeftProps) {
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

  interface NavRightProps {
    icon?: ReactNode
    children?: ReactNode

    onClick?(event: ITouchEvent): void
  }

  export function NavRight(props: NavRightProps) {
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
}

export default Navbar

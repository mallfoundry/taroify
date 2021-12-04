import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { Children, isValidElement, ReactElement, ReactNode, useMemo, useRef } from "react"
import { usePlaceholder } from "../hooks"
import { prefixClassname } from "../styles"
import { HAIRLINE_BORDER_BOTTOM } from "../styles/hairline"
import NavBarLeft from "./navbar-left"
import NavBarRight from "./navbar-right"
import NavBarTitle from "./navbar-title"

interface NavbarChildren {
  left?: ReactNode
  right?: ReactNode
  title?: ReactNode
}

function useNavbarChildren(children?: ReactNode): NavbarChildren {
  return useMemo(() => {
    const __children__: NavbarChildren = {
      left: undefined,
      right: undefined,
      title: undefined,
    }

    Children.forEach(children, (child: ReactNode) => {
      if (isValidElement(child)) {
        const element = child as ReactElement

        const { type } = element
        if (type === NavBarLeft) {
          __children__.left = element
        } else if (type === NavBarRight) {
          __children__.right = element
        } else if (type === NavBarTitle) {
          __children__.title = element
        }
      }
    })
    return __children__
  }, [children])
}

export interface NavbarProps extends ViewProps {
  bordered?: boolean
  placeholder?: boolean
  fixed?: boolean
  title?: ReactNode
  children?: ReactNode
}

function Navbar(props: NavbarProps) {
  const {
    className,
    bordered,
    fixed,
    placeholder,
    title: titleProp,
    children: childrenProp,
    ...restProps
  } = props
  const { left, title, right } = useNavbarChildren(childrenProp)
  const rootRef = useRef()

  const Placeholder = usePlaceholder(rootRef, { className: "navbar__placeholder" })

  const Content = useMemo(
    () => (
      <View
        ref={rootRef}
        className={classNames(
          prefixClassname("navbar"),
          {
            [HAIRLINE_BORDER_BOTTOM]: bordered,
            [prefixClassname("navbar--fixed")]: fixed,
          },
          className,
        )}
        {...restProps}
      >
        <View className={classNames(prefixClassname("navbar__content"))}>
          {left}
          {title ?? (
            <View className={classNames(prefixClassname("navbar__title"))} children={titleProp} />
          )}
          {right}
        </View>
      </View>
    ),
    [bordered, className, fixed, left, restProps, right, title, titleProp],
  )

  if (fixed && placeholder) {
    return <Placeholder children={Content} />
  }

  return Content
}

export default Navbar

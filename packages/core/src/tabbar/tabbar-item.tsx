import { View } from "@tarojs/components"
import type { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { type ReactElement, type ReactNode, cloneElement, isValidElement, useContext } from "react"
import Badge from "../badge"
import { prefixClassname } from "../styles"
import TabbarContext from "./tabbar.context"

interface TabbarItemProps extends ViewProps {
  className?: string
  value?: any
  icon?: ReactNode
  badge?: boolean | string | number | ReactNode
  children?: ReactNode
}

export default function TabbarItem(props: TabbarItemProps) {
  const {
    className,
    icon: iconProp,
    value: valueProp,
    badge,
    children,
    onClick,
    ...restProps
  } = props
  const { value, onItemClick } = useContext(TabbarContext)
  const active = value === valueProp
  const icon = isValidElement(iconProp)
    ? cloneElement(iconProp as any, {
        className: classNames(
          (iconProp as ReactElement).props.className,
          prefixClassname("tabbar-item__icon"),
        ),
      })
    : iconProp

  return (
    <View
      className={classNames(
        prefixClassname("tabbar-item"),
        {
          [prefixClassname("tabbar-item--active")]: active,
        },
        className,
      )}
      onClick={(event) => {
        onClick?.(event)
        onItemClick?.(valueProp)
      }}
      {...restProps}
    >
      {icon && <Badge content={badge} children={icon} />}
      <View className={prefixClassname("tabbar-item__label")} children={children} />
    </View>
  )
}

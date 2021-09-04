import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { Key, ReactNode, useContext } from "react"
import { useBadge } from "../badge"
import { prefixClassname } from "../styles"
import TabbarContext from "./tabbar.context"

interface TabbarItemProps {
  __dataKey__?: Key
  className?: string
  icon?: ReactNode
  badge?: boolean | string | number | ReactNode
  children?: ReactNode
}

export default function TabbarItem(props: TabbarItemProps) {
  const { __dataKey__, className, icon, badge, children } = props
  const { value, onItemClick } = useContext(TabbarContext)
  const active = value === __dataKey__
  const Badge = useBadge(badge, {
    className: prefixClassname("tabbar-item__icon"),
  })

  return (
    <View
      className={classNames(
        prefixClassname("tabbar-item"),
        {
          [prefixClassname("tabbar-item--active")]: active,
        },
        className,
      )}
      onClick={(event) => onItemClick?.(event, __dataKey__)}
    >
      <Badge children={icon} />
      <View className={prefixClassname("tabbar-item__label")} children={children} />
    </View>
  )
}

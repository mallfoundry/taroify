import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { ReactNode, useContext } from "react"
import { useBadge, useBadgeWrapper } from "../badge"
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
  const { className, icon, value: valueProp, badge, children, onClick, ...restProps } = props
  const { value, onItemClick } = useContext(TabbarContext)
  const active = value === valueProp

  const IconBadgeWrapper = useBadgeWrapper(icon)
  const Badge = useBadge(badge)

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
      {icon && (
        <IconBadgeWrapper className={classNames(prefixClassname("tabbar-item__icon"))}>
          <Badge />
        </IconBadgeWrapper>
      )}
      <View className={prefixClassname("tabbar-item__label")} children={children} />
    </View>
  )
}

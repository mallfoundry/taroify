import { ITouchEvent, View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { CSSProperties, ReactNode, useCallback, useContext } from "react"
import { useBadge } from "../badge"
import SidebarContext from "../sidebar/sidebar.context"
import { prefixClassname } from "../styles"

interface SidebarTabContentProps {
  badge?: boolean | string | number | ReactNode
  children: ReactNode
}

function SidebarTabContent(props: SidebarTabContentProps) {
  const { badge, children } = props
  const Badge = useBadge(badge, {
    className: prefixClassname("sidebar-tab__content"),
  })

  return <Badge children={children} />
}

interface SidebarTabProps {
  className?: string
  style?: CSSProperties
  value?: any
  disabled?: boolean
  badge?: boolean | string | number | ReactNode
  children?: ReactNode

  onClick?(event: ITouchEvent): void
}

function SidebarTab(props: SidebarTabProps) {
  const { value, className, style, disabled, badge, children, onClick } = props
  const { value: activeValue, onTabClick } = useContext(SidebarContext)
  const active = activeValue === value

  const handleClick = useCallback(
    (event: ITouchEvent) => {
      onClick?.(event)
      onTabClick?.({ value, disabled, children })
    },
    [children, disabled, onClick, onTabClick, value],
  )

  return (
    <View
      className={classNames(
        prefixClassname("sidebar-tab"),
        {
          [prefixClassname("sidebar-tab--active")]: active,
          [prefixClassname("sidebar-tab--disabled")]: disabled,
        },
        className,
      )}
      style={style}
      onClick={handleClick}
    >
      <SidebarTabContent badge={badge} children={children} />
    </View>
  )
}

export default SidebarTab

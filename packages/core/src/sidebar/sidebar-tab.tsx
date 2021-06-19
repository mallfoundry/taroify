import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { CSSProperties, ReactNode, useCallback, useContext } from "react"
import SidebarContext from "../sidebar/sidebar.context"
import { prefixClassname } from "../styles"
import { SidebarTabEvent, SidebarTabKey } from "./sidebar-tab.shared"

interface SidebarTabProps {
  __dataKey__?: SidebarTabKey
  __dataIndex__?: number
  className?: string
  style?: CSSProperties
  active?: boolean
  disabled?: boolean
  dot?: boolean
  badge?: ReactNode
  children?: ReactNode
  onClick?: (event: SidebarTabEvent) => void
}

function SidebarTab(props: SidebarTabProps) {
  const {
    __dataKey__: key,
    __dataIndex__: index,
    className,
    style,
    active: activeProp,
    disabled,
    children,
    onClick,
  } = props

  const { isTabActive, changeTab } = useContext(SidebarContext)

  const active = activeProp || isTabActive?.(key)

  const handleClick = useCallback(() => {
    const event = {
      key,
      index,
      active,
      disabled,
      title: children,
    }
    onClick?.(event)
    if (active && !disabled) {
      changeTab?.(event)
    }
  }, [active, changeTab, children, disabled, index, key, onClick])

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
      {children && <View className={prefixClassname("sidebar-tab__content")} children={children} />}
    </View>
  )
}

export default SidebarTab

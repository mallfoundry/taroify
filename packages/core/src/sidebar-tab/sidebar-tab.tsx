import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { ReactNode, useContext } from "react"
import SidebarContext from "../sidebar/sidebar.context"
import { prefixClassname } from "../styles"
import { SidebarTabEvent, SidebarTabKey } from "./sidebar-tab.shared"

interface SidebarTabProps {
  __dataKey__?: SidebarTabKey
  __dataIndex__?: number
  active?: boolean
  disabled?: boolean
  dot?: boolean
  badge?: ReactNode
  children?: ReactNode
  onClick?: (event: SidebarTabEvent) => void
}

function SidebarTab(props: SidebarTabProps) {
  const { __dataKey__, __dataIndex__, active, disabled, children, onClick } = props
  const { activeKey, emitClick } = useContext(SidebarContext)
  const __active__ = active || __dataKey__ === activeKey

  function handleClick() {
    const event = {
      key: __dataKey__,
      index: __dataIndex__,
      active: __active__,
      disabled,
      title: children,
    }
    onClick?.(event)
    emitClick?.(event)
  }

  return (
    <View
      className={classNames(prefixClassname("sidebar-tab"), {
        [prefixClassname("sidebar-tab--active")]: __active__,
        [prefixClassname("sidebar-tab--disabled")]: disabled,
      })}
      onClick={handleClick}
    >
      {children && <View className={prefixClassname("sidebar-tab__content")} children={children} />}
    </View>
  )
}

export default SidebarTab

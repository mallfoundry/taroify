import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import {
  cloneElement,
  CSSProperties,
  isValidElement,
  ReactElement,
  ReactNode,
  useCallback,
  useContext,
} from "react"
import Badge from "../badge"
import SidebarContext from "../sidebar/sidebar.context"
import { prefixClassname } from "../styles"
import { SidebarTabEvent, SidebarTabKey } from "./sidebar-tab.shared"

interface SidebarTabContentProps {
  dot?: boolean
  badge: ReactNode
  children: ReactNode
}

function SidebarTabContent(props: SidebarTabContentProps) {
  const { dot, badge, children } = props
  if (isValidElement(badge)) {
    const element = badge as ReactElement
    if (element.type === Badge) {
      const { className } = element.props
      return cloneElement(element, {
        className: classNames(className, prefixClassname("sidebar-tab__content")),
        children,
      })
    }
  }
  return (
    <Badge
      className={prefixClassname("sidebar-tab__content")}
      dot={dot}
      content={badge}
      children={children}
    />
  )
}

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
    dot,
    badge,
    children,
    onClick,
  } = props

  const { isTabActive, changeTab } = useContext(SidebarContext)

  const active = activeProp || isTabActive?.(key)

  const handleClick = useCallback(() => {
    const event = {
      key,
      index,
      active: !active,
      disabled,
      title: children,
    }
    onClick?.(event)
    if (!disabled) {
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
      <SidebarTabContent dot={dot} badge={badge} children={children} />
    </View>
  )
}

export default SidebarTab

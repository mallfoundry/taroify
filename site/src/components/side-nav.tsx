import classNames from "classnames"
import { navigate } from "gatsby"
import * as _ from "lodash"
import * as React from "react"
import { ReactNode } from "react"
import useScroll from "../hooks/useScroll"
import menus from "../utils/menus"

import "./side-nav.scss"

function MenuItemGroup({ title = "", children }: { title: string; children?: ReactNode }) {
  return (
    <div className="vant-side-nav-item-group">
      <div className="vant-side-nav-item-group-title" children={title} />
      {children}
    </div>
  )
}

interface MenuItemProps {
  title?: string
  to: string
  active?: boolean
}

function MenuItem({ title, to, active }: MenuItemProps) {
  return (
    <div
      className={classNames("vant-side-nav-item", {
        "vant-side-nav-item-active": active,
      })}
      onClick={() => navigate(to)}
    >
      <span>{title}</span>
    </div>
  )
}

interface SideNavProps {
  slug?: string
}

export default function SideNav(props: SideNavProps) {
  const { slug } = props
  const {
    position: { y: positionY },
  } = useScroll()
  const top = positionY > 64 ? 0 : 64 - positionY
  return (
    <nav className="vant-side-nav" style={{ top: `${top}px` }}>
      {_.map(menus, (group) => (
        <MenuItemGroup key={group.title} title={group.title}>
          {_.map(group.children, (item) => (
            <MenuItem key={item.to} title={item.title} to={item.to} active={item.to === slug} />
          ))}
        </MenuItemGroup>
      ))}
    </nav>
  )
}

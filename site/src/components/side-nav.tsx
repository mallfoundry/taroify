import { Link } from "gatsby"
import * as React from "react"
import { ReactNode } from "react"
import classNames from "classnames"
import useScroll from "../hooks/useScroll"
import * as _ from "lodash"
import menus from "./menus"

import "./side-nav.scss"

function MenuItemGroup({ title = "", children }: { title: string, children?: ReactNode }) {
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
    <div className={classNames("vant-side-nav-item", {
      ["vant-side-nav-item-active"]: active,
    })}>
      <Link to={to} children={title} />
    </div>
  )
}

interface SideNavProps {
  slug?: string
}

export default function SideNav(props: SideNavProps) {
  const { slug } = props
  const { position: { y: positionY } } = useScroll()
  const top = positionY > 64 ? 0 : 64 - positionY
  return (
    <nav className="vant-side-nav" style={{ top: `${top}px` }}>
      {
        _.map(menus, group => (
          <MenuItemGroup key={group.title} title={group.title}>
            {
              _.map(group.children, item => (
                <MenuItem key={item.to} title={item.title} to={item.to} active={item.to === slug} />
              ))
            }
          </MenuItemGroup>
        ))
      }
    </nav>
  )
}

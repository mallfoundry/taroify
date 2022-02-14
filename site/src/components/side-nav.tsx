import classNames from "classnames"
import { Link } from "gatsby"
import * as _ from "lodash"
import * as React from "react"
import { ReactNode, useCallback, useEffect, useRef } from "react"
import useScroll from "../hooks/useScroll"
import { prefixClassname } from "../styles/prefix"
import menus from "../utils/menus"

import "./side-nav.scss"

function MenuItemGroup({ title = "", children }: { title: string; children?: ReactNode }) {
  return (
    <div className={prefixClassname("side-nav-item-group")}>
      <div className={prefixClassname("side-nav-item-group-title")} children={title} />
      {children}
    </div>
  )
}

interface MenuItemProps {
  title?: string
  to: string
  active?: boolean

  onClick(): void

  onRouted(): void
}

function MenuItem({ title, to, active, onClick, onRouted }: MenuItemProps) {
  useEffect(() => {
    if (active) {
      onRouted()
    }
  }, [active, onRouted])
  return (
    <Link
      className={classNames(prefixClassname("side-nav-item"), {
        [prefixClassname("side-nav-item-active")]: active,
      })}
      to={to}
      onClick={onClick}
    >
      <span>{title}</span>
    </Link>
  )
}

interface SideNavProps {
  slug?: string
}

export default function SideNav(props: SideNavProps) {
  const { slug } = props
  const { y: positionY } = useScroll()
  const top = positionY > 64 ? 0 : 64 - positionY
  const rootRef = useRef<HTMLElement>(null)

  const onRouted = useCallback(
    () =>
      rootRef.current?.scrollTo({
        top: _.toNumber(localStorage.getItem("sideNav.scrollTop")),
      }),
    [],
  )

  return (
    <nav ref={rootRef} className={prefixClassname("side-nav")} style={{ top: `${top}px` }}>
      {
        //
        _.map(menus, (group) => (
          <MenuItemGroup key={group.title} title={group.title}>
            {
              //
              _.map(group.children, (item) => (
                <MenuItem
                  key={item.to}
                  title={item.title}
                  to={item.to}
                  active={item.to === slug}
                  onClick={() =>
                    localStorage.setItem(
                      "sideNav.scrollTop",
                      (rootRef.current?.scrollTop ?? 0)?.toString(),
                    )
                  }
                  onRouted={onRouted}
                />
              ))
            }
          </MenuItemGroup>
        ))
      }
    </nav>
  )
}

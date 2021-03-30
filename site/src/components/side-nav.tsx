import { Link } from "gatsby"
import * as React from "react"
import { ReactNode } from "react"
import classNames from "classnames"

import "./side-nav.scss"
import useScroll from "../hooks/useScroll"


function MenuItemGroup({ title = "", children }: { title: string, children?: ReactNode }) {
  return (
    <div className="vant-side-nav-item-group">
      <div className="vant-side-nav-item-group-title" children={title} />
      {children}
    </div>
  )
}

function MenuItem({ className, children }: { className?: string, children?: ReactNode }) {
  //
  return (
    <div className={classNames("vant-side-nav-item", className)}>
      {children}
    </div>
  )
}

export default function SideNav() {
  const { position: { y: positionY } } = useScroll()
  const top = positionY > 64 ? 0 : 64 - positionY
  return (
    <nav className="vant-side-nav" style={{ top: `${top}px` }}>
      <MenuItemGroup title="开发指南">
        <MenuItem
          children={<Link to="/introduce" children="介绍" />}
        />
        <MenuItem
          children={<Link to="/quickstart" children="快速上手" />}
        />
        <MenuItem
          children={<Link to="/changelog" children="更新日志" />}
        />
      </MenuItemGroup>
      <MenuItemGroup title="基础组件">
        <MenuItem
          children={<Link to="/components/button" children="Button 按钮" />}
        />
        <MenuItem
          children={<Link to="/components/cell" children="Cell 单元格" />}
        />
        <MenuItem
          children={<Link to="/components/icon" children="Icon 图标" />}
        />
        <MenuItem
          children={<Link to="/components/image" children="Image 图片" />}
        />
        <MenuItem
          children={<Link to="/components/layout" children="Layout 布局" />}
        />
        <MenuItem
          children={<Link to="/components/popup" children="Popup 弹出层" />}
        />
        <MenuItem
          children={<Link to="/components/style" children="Style 内置样式" />}
        />
        <MenuItem
          children={<Link to="/components/toast" children="Toast 轻提示" />}
        />
      </MenuItemGroup>
    </nav>
  )
}

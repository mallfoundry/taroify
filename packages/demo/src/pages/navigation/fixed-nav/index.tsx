import { useState } from "react"
import { FixedNav } from "@taroify/core"
import {
  WapHomeOutlined,
  AppsOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  GiftOutlined,
} from "@taroify/icons"
import Page from "../../../components/page"
import "./index.scss"

const CustomerFixedNav = () => {
  const [open, setOpen] = useState(false)

  return (
    <FixedNav
      open={open}
      onChange={setOpen}
      type="left"
      backdrop={false}
      position={{ top: "400px" }}
      content={
        <>
          <GiftOutlined color="#FFF" />
          <span className="fixed-nav-text">{open ? "开" : "关"}</span>
        </>
      }
    >
      <ul className="taroify-fixed-nav_content customer">
        <li className="taroify-fixed-nav_content_item">我</li>
        <li className="taroify-fixed-nav_content_item">是</li>
        <li className="taroify-fixed-nav_content_item">自</li>
        <li className="taroify-fixed-nav_content_item">定</li>
        <li className="taroify-fixed-nav_content_item">义</li>
      </ul>
    </FixedNav>
  )
}

export default function BackTopDemo() {
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const list = [
    {
      id: 1,
      text: "首页",
      icon: <WapHomeOutlined />,
    },
    {
      id: 2,
      text: "分类",
      icon: <AppsOutlined />,
    },
    {
      id: 3,
      text: "购物车",
      icon: <ShoppingCartOutlined />,
    },
    {
      id: 4,
      text: "我的",
      icon: <UserOutlined />,
    },
  ]
  return (
    <Page title="FixedNav 悬浮导航" className="fixed-nav-demo">
      <FixedNav open={open} onChange={setOpen} data={list} position={{ top: "150px" }} />
      <FixedNav
        open={open2}
        onChange={setOpen2}
        data={list}
        type="left"
        backdrop={false}
        position={{ top: "300px" }}
      />
      <CustomerFixedNav />
    </Page>
  )
}

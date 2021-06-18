import { Grid, Sidebar, SidebarTab, Toast } from "@taroify/core"
import { SidebarTabEvent, SidebarTabKey } from "@taroify/core/sidebar-tab"
import * as React from "react"
import { ReactNode, useState } from "react"
import Block from "../../components/block"
import Page from "../../components/page"
import "./index.scss"

function BasicSidebar() {
  const [activeKey, setActiveKey] = useState<SidebarTabKey>(0)
  return (
    <Block title="基础用法">
      <Sidebar activeKey={activeKey} onChange={({ key }) => setActiveKey(key)}>
        <SidebarTab>标签名</SidebarTab>
        <SidebarTab>标签名</SidebarTab>
        <SidebarTab>标签名</SidebarTab>
      </Sidebar>
    </Block>
  )
}

function DisableSidebar() {
  const [activeKey, setActiveKey] = useState<SidebarTabKey>(0)
  return (
    <Block title="禁用选项">
      <Sidebar activeKey={activeKey} onChange={({ key }) => setActiveKey(key)}>
        <SidebarTab>标签名</SidebarTab>
        <SidebarTab disabled>标签名</SidebarTab>
        <SidebarTab>标签名</SidebarTab>
      </Sidebar>
    </Block>
  )
}

function BadgeSidebar() {
  const [activeKey, setActiveKey] = useState<SidebarTabKey>(0)
  return (
    <Block title="徽标提示">
      <Sidebar activeKey={activeKey} onChange={({ key }) => setActiveKey(key)}>
        <SidebarTab dot>标签名</SidebarTab>
        <SidebarTab badge="5">标签名</SidebarTab>
        <SidebarTab badge="20">标签名</SidebarTab>
      </Sidebar>
    </Block>
  )
}

function EventSidebar() {
  const [activeKey, setActiveKey] = useState<SidebarTabKey>(0)
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState<ReactNode>()

  function handleChange(event: SidebarTabEvent) {
    setActiveKey(event.key)
    setOpen(true)
    setMessage(event.title)
  }

  return (
    <Block title="监听切换事件">
      <Sidebar activeKey={activeKey} onChange={handleChange}>
        <SidebarTab>标签名 1</SidebarTab>
        <SidebarTab>标签名 2</SidebarTab>
        <SidebarTab>标签名 3</SidebarTab>
      </Sidebar>
      <Toast open={open} children={message} onClose={() => setOpen(false)} />
    </Block>
  )
}

export default function SidebarDemo() {
  return (
    <Page title="Sidebar 侧边导航" className="sidebar-demo">
      <Grid columns={2} centered bordered={false}>
        <Grid.Item>
          <BasicSidebar />
        </Grid.Item>
        <Grid.Item>
          <BadgeSidebar />
        </Grid.Item>
        <Grid.Item>
          <DisableSidebar />
        </Grid.Item>
        <Grid.Item>
          <EventSidebar />
        </Grid.Item>
      </Grid>
    </Page>
  )
}

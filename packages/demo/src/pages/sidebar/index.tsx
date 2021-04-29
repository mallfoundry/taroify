import { Grid, Sidebar, Toast } from "@taroify/core"
import * as React from "react"
import { ReactNode, useState } from "react"
import Block from "../../components/block"
import Page from "../../components/page"
import "./index.scss"

function BasicSidebar() {
  const [activeKey, setActiveKey] = useState<Sidebar.TabKey>(0)
  return (
    <Block title="基础用法">
      <Sidebar activeKey={activeKey} onChange={({ key }) => setActiveKey(key)}>
        <Sidebar.Tab>标签名</Sidebar.Tab>
        <Sidebar.Tab>标签名</Sidebar.Tab>
        <Sidebar.Tab>标签名</Sidebar.Tab>
      </Sidebar>
    </Block>
  )
}

function DisableSidebar() {
  const [activeKey, setActiveKey] = useState<Sidebar.TabKey>(0)
  return (
    <Block title="禁用选项">
      <Sidebar activeKey={activeKey} onChange={({ key }) => setActiveKey(key)}>
        <Sidebar.Tab>标签名</Sidebar.Tab>
        <Sidebar.Tab disabled>标签名</Sidebar.Tab>
        <Sidebar.Tab>标签名</Sidebar.Tab>
      </Sidebar>
    </Block>
  )
}

function BadgeSidebar() {
  const [activeKey, setActiveKey] = useState<Sidebar.TabKey>(0)
  return (
    <Block title="徽标提示">
      <Sidebar activeKey={activeKey} onChange={({ key }) => setActiveKey(key)}>
        <Sidebar.Tab dot>标签名</Sidebar.Tab>
        <Sidebar.Tab badge="5">标签名</Sidebar.Tab>
        <Sidebar.Tab badge="20">标签名</Sidebar.Tab>
      </Sidebar>
    </Block>
  )
}

function EventSidebar() {
  const [activeKey, setActiveKey] = useState<Sidebar.TabKey>(0)
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState<ReactNode>()

  function handleChange(event: Sidebar.TabEvent) {
    setActiveKey(event.key)
    setOpen(true)
    setMessage(event.title)
  }

  return (
    <Block title="监听切换事件">
      <Sidebar activeKey={activeKey} onChange={handleChange}>
        <Sidebar.Tab>标签名 1</Sidebar.Tab>
        <Sidebar.Tab>标签名 2</Sidebar.Tab>
        <Sidebar.Tab>标签名 3</Sidebar.Tab>
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

import { Grid, Sidebar, Toast } from "@taroify/core"
import * as React from "react"
import { ReactNode, useState } from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

function BasicSidebar() {
  const [value, setValue] = useState(0)
  return (
    <Sidebar value={value} onChange={setValue}>
      <Sidebar.Tab>标签名</Sidebar.Tab>
      <Sidebar.Tab>标签名</Sidebar.Tab>
      <Sidebar.Tab>标签名</Sidebar.Tab>
    </Sidebar>
  )
}

function DisableSidebar() {
  const [value, setValue] = useState(0)
  return (
    <Sidebar value={value} onChange={setValue}>
      <Sidebar.Tab>标签名</Sidebar.Tab>
      <Sidebar.Tab disabled>标签名</Sidebar.Tab>
      <Sidebar.Tab>标签名</Sidebar.Tab>
    </Sidebar>
  )
}

function BadgeSidebar() {
  const [value, setValue] = useState(0)
  return (
    <Sidebar value={value} onChange={setValue}>
      <Sidebar.Tab badge>标签名</Sidebar.Tab>
      <Sidebar.Tab badge="5">标签名</Sidebar.Tab>
      <Sidebar.Tab badge="20">标签名</Sidebar.Tab>
    </Sidebar>
  )
}

function EventSidebar() {
  const [value, setValue] = useState(0)
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState<ReactNode>()

  function onChange(newValue: any, { children }: Sidebar.TabObject) {
    setValue(newValue)
    setOpen(true)
    setMessage(children)
  }

  return (
    <>
      <Sidebar value={value} onChange={onChange}>
        <Sidebar.Tab>标签名 1</Sidebar.Tab>
        <Sidebar.Tab>标签名 2</Sidebar.Tab>
        <Sidebar.Tab>标签名 3</Sidebar.Tab>
      </Sidebar>
      <Toast open={open} children={message} onClose={() => setOpen(false)} />
    </>
  )
}

export default function SidebarDemo() {
  return (
    <Page title="Sidebar 侧边导航" className="sidebar-demo">
      <Grid columns={2} centered bordered={false}>
        <Grid.Item>
          <Block title="基础用法">
            <BasicSidebar />
          </Block>
        </Grid.Item>
        <Grid.Item>
          <Block title="徽标提示">
            <BadgeSidebar />
          </Block>
        </Grid.Item>
        <Grid.Item>
          <Block title="禁用选项">
            <DisableSidebar />
          </Block>
        </Grid.Item>
        <Grid.Item>
          <Block title="监听切换事件">
            <EventSidebar />
          </Block>
        </Grid.Item>
      </Grid>
    </Page>
  )
}

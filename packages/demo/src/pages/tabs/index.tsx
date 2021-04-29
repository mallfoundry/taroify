import { Tabs, Toast } from "@taroify/core"
import { MoreOutlined } from "@taroify/icons"
import * as React from "react"
import { ReactNode, useState } from "react"
import Block from "../../components/block"
import Page from "../../components/page"
import "./index.scss"

function BasicTabs() {
  const [activeKey, setActiveKey] = useState<Tabs.TabKey>(0)
  return (
    <Block title="基础用法">
      <Tabs activeKey={activeKey} onChange={({ key }) => setActiveKey(key)}>
        <Tabs.TabPane title="标签 1">内容 1</Tabs.TabPane>
        <Tabs.TabPane title="标签 2">内容 2</Tabs.TabPane>
        <Tabs.TabPane title="标签 3">内容 3</Tabs.TabPane>
        <Tabs.TabPane title="标签 4">内容 4</Tabs.TabPane>
      </Tabs>
    </Block>
  )
}

function KeyedTabs() {
  const [activeKey, setActiveKey] = useState<Tabs.TabKey>("a")
  return (
    <Block title="通过标识匹配">
      <Tabs activeKey={activeKey} onChange={({ key }) => setActiveKey(key)}>
        <Tabs.TabPane key="a" title="标签 1">
          内容 1
        </Tabs.TabPane>
        <Tabs.TabPane key="b" title="标签 2">
          内容 2
        </Tabs.TabPane>
        <Tabs.TabPane key="c" title="标签 3">
          内容 3
        </Tabs.TabPane>
        <Tabs.TabPane key="d" title="标签 4">
          内容 4
        </Tabs.TabPane>
      </Tabs>
    </Block>
  )
}

function ScrollTabs() {
  const [activeKey, setActiveKey] = useState<Tabs.TabKey>(0)

  return (
    <Block title="标签栏滚动">
      <Tabs activeKey={activeKey} onChange={({ key }) => setActiveKey(key)}>
        <Tabs.TabPane title="标签 1">内容 1</Tabs.TabPane>
        <Tabs.TabPane title="标签 2">内容 2</Tabs.TabPane>
        <Tabs.TabPane title="标签 3">内容 3</Tabs.TabPane>
        <Tabs.TabPane title="标签 4">内容 4</Tabs.TabPane>
        <Tabs.TabPane title="标签 5">内容 5</Tabs.TabPane>
        <Tabs.TabPane title="标签 6">内容 6</Tabs.TabPane>
        <Tabs.TabPane title="标签 7">内容 7</Tabs.TabPane>
      </Tabs>
    </Block>
  )
}

function DisableTabs() {
  const [activeKey, setActiveKey] = useState<Tabs.TabKey>(0)
  return (
    <Block title="禁用标签">
      <Tabs activeKey={activeKey} onChange={({ key }) => setActiveKey(key)}>
        <Tabs.TabPane title="标签 1">内容 1</Tabs.TabPane>
        <Tabs.TabPane title="标签 2" disabled>
          内容 2
        </Tabs.TabPane>
        <Tabs.TabPane title="标签 3">内容 3</Tabs.TabPane>
      </Tabs>
    </Block>
  )
}

function CardTabs() {
  const [activeKey, setActiveKey] = useState<Tabs.TabKey>(0)

  return (
    <Block title="样式风格">
      <Tabs activeKey={activeKey} theme="card" onChange={({ key }) => setActiveKey(key)}>
        <Tabs.TabPane title="标签 1">内容 1</Tabs.TabPane>
        <Tabs.TabPane title="标签 2">内容 2</Tabs.TabPane>
        <Tabs.TabPane title="标签 3">内容 3</Tabs.TabPane>
      </Tabs>
    </Block>
  )
}

function ClickTabs() {
  const [activeKey, setActiveKey] = useState<Tabs.TabKey>(0)
  const [message, setMessage] = useState<ReactNode>("")
  const [open, setOpen] = useState(false)

  function handleClick(event: Tabs.TabEvent) {
    setOpen(true)
    setMessage(event.title)
  }

  return (
    <Block title="点击事件">
      <Tabs activeKey={activeKey} onClick={handleClick} onChange={({ key }) => setActiveKey(key)}>
        <Tabs.TabPane title="标签 1">内容 1</Tabs.TabPane>
        <Tabs.TabPane title="标签 2">内容 2</Tabs.TabPane>
        <Tabs.TabPane title="标签 3">内容 3</Tabs.TabPane>
      </Tabs>
      <Toast open={open} onClose={() => setOpen(false)}>
        {message}
      </Toast>
    </Block>
  )
}

function CustomTitleTabs() {
  const [activeKey, setActiveKey] = useState<Tabs.TabKey>(0)

  return (
    <Block title="自定义标签">
      <Tabs activeKey={activeKey} onChange={({ key }) => setActiveKey(key)}>
        <Tabs.TabPane
          title={
            <>
              <MoreOutlined /> 标签 1
            </>
          }
        >
          内容 1
        </Tabs.TabPane>
        <Tabs.TabPane
          title={
            <>
              <MoreOutlined /> 标签 2
            </>
          }
        >
          内容 2
        </Tabs.TabPane>
        <Tabs.TabPane
          title={
            <>
              <MoreOutlined /> 标签 3
            </>
          }
        >
          内容 3
        </Tabs.TabPane>
      </Tabs>
    </Block>
  )
}

export default function TabsDemo() {
  return (
    <Page title="Tabs 标签页" className="tabs-demo">
      <BasicTabs />
      <KeyedTabs />
      <ScrollTabs />
      <DisableTabs />
      <CardTabs />
      <ClickTabs />
      <CustomTitleTabs />
    </Page>
  )
}

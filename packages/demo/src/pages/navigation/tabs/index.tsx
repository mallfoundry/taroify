import { Tabs, Toast } from "@taroify/core"
import { MoreOutlined } from "@taroify/icons"
import * as React from "react"
import { ReactNode, useState } from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

function BasicTabs() {
  const [value, setValue] = useState(0)
  return (
    <Tabs value={value} onChange={setValue}>
      <Tabs.TabPane title="标签 1">内容 1</Tabs.TabPane>
      <Tabs.TabPane title="标签 2">内容 2</Tabs.TabPane>
      <Tabs.TabPane title="标签 3">内容 3</Tabs.TabPane>
      <Tabs.TabPane title="标签 4">内容 4</Tabs.TabPane>
    </Tabs>
  )
}

function KeyedTabs() {
  const [value, setValue] = useState("a")
  return (
    <Tabs value={value} onChange={setValue}>
      <Tabs.TabPane value="a" title="标签 1">
        内容 1
      </Tabs.TabPane>
      <Tabs.TabPane value="b" title="标签 2">
        内容 2
      </Tabs.TabPane>
      <Tabs.TabPane value="c" title="标签 3">
        内容 3
      </Tabs.TabPane>
      <Tabs.TabPane value="d" title="标签 4">
        内容 4
      </Tabs.TabPane>
    </Tabs>
  )
}

function ScrollTabs() {
  const [value, setValue] = useState(0)
  return (
    <Tabs value={value} onChange={setValue}>
      <Tabs.TabPane title="标签 1">内容 1</Tabs.TabPane>
      <Tabs.TabPane title="标签 2">内容 2</Tabs.TabPane>
      <Tabs.TabPane title="标签 3">内容 3</Tabs.TabPane>
      <Tabs.TabPane title="标签 4">内容 4</Tabs.TabPane>
      <Tabs.TabPane title="标签 5">内容 5</Tabs.TabPane>
      <Tabs.TabPane title="标签 6">内容 6</Tabs.TabPane>
      <Tabs.TabPane title="标签 7">内容 7</Tabs.TabPane>
    </Tabs>
  )
}

function DisableTabs() {
  const [value, setValue] = useState(0)
  return (
    <Tabs value={value} onChange={setValue}>
      <Tabs.TabPane title="标签 1">内容 1</Tabs.TabPane>
      <Tabs.TabPane title="标签 2" disabled>
        内容 2
      </Tabs.TabPane>
      <Tabs.TabPane title="标签 3">内容 3</Tabs.TabPane>
    </Tabs>
  )
}

function CardTabs() {
  const [value, setValue] = useState(0)
  return (
    <Tabs value={value} theme="card" onChange={setValue}>
      <Tabs.TabPane title="标签 1">内容 1</Tabs.TabPane>
      <Tabs.TabPane title="标签 2">内容 2</Tabs.TabPane>
      <Tabs.TabPane title="标签 3">内容 3</Tabs.TabPane>
    </Tabs>
  )
}

function TabsWithTabClick() {
  const [value, setValue] = useState(0)
  const [message, setMessage] = useState<ReactNode>("")
  const [open, setOpen] = useState(false)

  return (
    <>
      <Tabs
        value={value}
        onChange={setValue}
        onTabClick={({ title }) => {
          setOpen(true)
          setMessage(title)
        }}
      >
        <Tabs.TabPane title="标签 1">内容 1</Tabs.TabPane>
        <Tabs.TabPane title="标签 2">内容 2</Tabs.TabPane>
        <Tabs.TabPane title="标签 3">内容 3</Tabs.TabPane>
      </Tabs>
      <Toast open={open} onClose={() => setOpen(false)}>
        {message}
      </Toast>
    </>
  )
}

function StickyTabs() {
  const [value, setValue] = useState(0)
  return (
    <Tabs value={value} sticky onChange={(tab) => setValue(tab.value)}>
      <Tabs.TabPane title="标签 1">内容 1</Tabs.TabPane>
      <Tabs.TabPane title="标签 2">内容 2</Tabs.TabPane>
      <Tabs.TabPane title="标签 3">内容 3</Tabs.TabPane>
      <Tabs.TabPane title="标签 4">内容 4</Tabs.TabPane>
    </Tabs>
  )
}

function TabsWithCustomTitle() {
  const [value, setValue] = useState(0)
  return (
    <Tabs value={value} onChange={(tab) => setValue(tab.value)}>
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
  )
}

function AnimatedTabs() {
  const [value, setValue] = useState(0)
  return (
    <Tabs value={value} animated onChange={setValue}>
      <Tabs.TabPane title="标签 1">内容 1</Tabs.TabPane>
      <Tabs.TabPane title="标签 2">内容 2</Tabs.TabPane>
      <Tabs.TabPane title="标签 3">内容 3</Tabs.TabPane>
      <Tabs.TabPane title="标签 4">内容 4</Tabs.TabPane>
    </Tabs>
  )
}

function SwipeableTabs() {
  const [value, setValue] = useState(0)
  return (
    <Tabs value={value} animated swipeable onChange={setValue}>
      <Tabs.TabPane title="标签 1">内容 1</Tabs.TabPane>
      <Tabs.TabPane title="标签 2">内容 2</Tabs.TabPane>
      <Tabs.TabPane title="标签 3">内容 3</Tabs.TabPane>
      <Tabs.TabPane title="标签 4">内容 4</Tabs.TabPane>
    </Tabs>
  )
}

export default function TabsDemo() {
  return (
    <Page title="Tabs 标签页" className="tabs-demo">
      <Block title="基础用法">
        <BasicTabs />
      </Block>
      <Block title="通过标识匹配">
        <KeyedTabs />
      </Block>
      <Block title="标签栏滚动">
        <ScrollTabs />
      </Block>
      <Block title="禁用标签">
        <DisableTabs />
      </Block>
      <Block title="样式风格">
        <CardTabs />
      </Block>
      <Block title="点击事件">
        <TabsWithTabClick />
      </Block>
      <Block title="粘性布局">
        <StickyTabs />
      </Block>
      <Block title="自定义标签">
        <TabsWithCustomTitle />
      </Block>
      <Block title="切换动画">
        <AnimatedTabs />
      </Block>
      <Block title="滑动切换">
        <SwipeableTabs />
      </Block>
    </Page>
  )
}

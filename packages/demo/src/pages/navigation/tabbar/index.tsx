import { Badge, Tabbar, Toast } from "@taroify/core"
import { FriendsOutlined, HomeOutlined, Search, SettingOutlined } from "@taroify/icons"
import { ITouchEvent } from "@tarojs/components"
import * as React from "react"
import { useState } from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

function BasicTabbar() {
  const [value, setValue] = useState(0)
  return (
    <Tabbar value={value} onChange={(_, newValue) => setValue(newValue)}>
      <Tabbar.Item icon={<HomeOutlined />}>标签</Tabbar.Item>
      <Tabbar.Item icon={<Search />}>标签</Tabbar.Item>
      <Tabbar.Item icon={<FriendsOutlined />}>标签</Tabbar.Item>
      <Tabbar.Item icon={<SettingOutlined />}>标签</Tabbar.Item>
    </Tabbar>
  )
}

function KeyTabbar() {
  const [value, setValue] = useState("1")
  return (
    <Tabbar value={value} onChange={(_, newValue) => setValue(newValue)}>
      <Tabbar.Item key="1" icon={<HomeOutlined />}>
        标签
      </Tabbar.Item>
      <Tabbar.Item key="2" icon={<Search />}>
        标签
      </Tabbar.Item>
      <Tabbar.Item key="3" icon={<FriendsOutlined />}>
        标签
      </Tabbar.Item>
      <Tabbar.Item key="4" icon={<SettingOutlined />}>
        标签
      </Tabbar.Item>
    </Tabbar>
  )
}

function BadgeTabbar() {
  const [value, setValue] = useState(0)
  return (
    <Tabbar value={value} onChange={(_, newValue) => setValue(newValue)}>
      <Tabbar.Item icon={<HomeOutlined />}>标签</Tabbar.Item>
      <Tabbar.Item badge icon={<Search />}>
        标签
      </Tabbar.Item>
      <Tabbar.Item badge="5" icon={<FriendsOutlined />}>
        标签
      </Tabbar.Item>
      <Tabbar.Item badge={<Badge content={100} max={99} />} icon={<SettingOutlined />}>
        标签
      </Tabbar.Item>
    </Tabbar>
  )
}

function TabbarWithCustomColor() {
  const [value, setValue] = useState(0)
  return (
    <Tabbar className="custom-color" value={value} onChange={(_, newValue) => setValue(newValue)}>
      <Tabbar.Item icon={<HomeOutlined />}>标签</Tabbar.Item>
      <Tabbar.Item icon={<Search />}>标签</Tabbar.Item>
      <Tabbar.Item icon={<FriendsOutlined />}>标签</Tabbar.Item>
      <Tabbar.Item icon={<SettingOutlined />}>标签</Tabbar.Item>
    </Tabbar>
  )
}

function EventTabbar() {
  const [value, setValue] = useState(0)
  const [open, setOpen] = useState<boolean>(false)

  function handleChange(event: ITouchEvent, activeKey: any) {
    setValue(activeKey)
    setOpen(true)
  }

  return (
    <>
      <Tabbar value={value} onChange={handleChange}>
        <Tabbar.Item icon={<HomeOutlined />}>标签</Tabbar.Item>
        <Tabbar.Item icon={<Search />}>标签</Tabbar.Item>
        <Tabbar.Item icon={<FriendsOutlined />}>标签</Tabbar.Item>
        <Tabbar.Item icon={<SettingOutlined />}>标签</Tabbar.Item>
      </Tabbar>
      <Toast open={open} onClose={() => setOpen(false)} children={`标签${Number(value) + 1}`} />
    </>
  )
}

export default function TabbarDemo() {
  return (
    <Page title="Tabbar 标签栏" className="tabbar-demo">
      <Block title="基础用法">
        <BasicTabbar />
      </Block>
      <Block title="通过标识匹配">
        <KeyTabbar />
      </Block>
      <Block title="徽标提示">
        <BadgeTabbar />
      </Block>
      <Block title="自定义颜色">
        <TabbarWithCustomColor />
      </Block>
      <Block title="监听切换事件">
        <EventTabbar />
      </Block>
    </Page>
  )
}

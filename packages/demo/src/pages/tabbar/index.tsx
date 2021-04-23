import { Tabbar } from "@taroify/core"
import { FriendsOutlined, HomeOutlined, Search, SettingOutlined } from "@taroify/icons"
import * as React from "react"
import { useState } from "react"
import Block from "../../components/block"
import Page from "../../components/page"
import classes from "./index.module.scss"

function BasicTabbar() {
  const [activeKey, setActiveKey] = useState<Tabbar.Key>(0)
  return (
    <Block title="基础用法">
      <Tabbar activeKey={activeKey} onChange={setActiveKey}>
        <Tabbar.TabItem icon={<HomeOutlined />} label="标签" />
        <Tabbar.TabItem icon={<Search />} label="标签" />
        <Tabbar.TabItem icon={<FriendsOutlined />} label="标签" />
        <Tabbar.TabItem icon={<SettingOutlined />} label="标签" />
      </Tabbar>
    </Block>
  )
}

function KeyTabbar() {
  const [activeKey, setActiveKey] = useState<Tabbar.Key>("1")
  return (
    <Block title="通过标识匹配">
      <Tabbar activeKey={activeKey} onChange={setActiveKey}>
        <Tabbar.TabItem key="1" icon={<HomeOutlined />} label="标签" />
        <Tabbar.TabItem key="2" icon={<Search />} label="标签" />
        <Tabbar.TabItem key="3" icon={<FriendsOutlined />} label="标签" />
        <Tabbar.TabItem key="4" icon={<SettingOutlined />} label="标签" />
      </Tabbar>
    </Block>
  )
}

function CustomColorTabbar() {
  const [activeKey, setActiveKey] = useState<Tabbar.Key>("1")
  return (
    <Block title="自定义颜色">
      <Tabbar activeKey={activeKey} activeColor="#ee0a24" onChange={setActiveKey}>
        <Tabbar.TabItem key="1" icon={<HomeOutlined />} label="标签" />
        <Tabbar.TabItem key="2" icon={<Search />} label="标签" />
        <Tabbar.TabItem key="3" icon={<FriendsOutlined />} label="标签" />
        <Tabbar.TabItem key="4" icon={<SettingOutlined />} label="标签" />
      </Tabbar>
    </Block>
  )
}

export default function TabbarDemo() {
  return (
    <Page title="Tabbar 标签栏" className={classes.TabbarDemo}>
      <BasicTabbar />
      <KeyTabbar />
      <CustomColorTabbar />
    </Page>
  )
}

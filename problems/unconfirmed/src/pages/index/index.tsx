import { FixedView, Tabbar } from "@taroify/core"
import { FriendsOutlined, HomeOutlined, Search, SettingOutlined } from "@taroify/icons"
import * as React from "react"
import "./index.scss"

function Index() {
  return (
    <>
      <FixedView placeholder>Test</FixedView>
      <Tabbar fixed placeholder>
        <Tabbar.TabItem icon={<HomeOutlined />}>标签</Tabbar.TabItem>
        <Tabbar.TabItem icon={<Search />}>标签</Tabbar.TabItem>
        <Tabbar.TabItem icon={<FriendsOutlined />}>标签</Tabbar.TabItem>
        <Tabbar.TabItem icon={<SettingOutlined />}>标签</Tabbar.TabItem>
      </Tabbar>
    </>
  )
}

export default Index

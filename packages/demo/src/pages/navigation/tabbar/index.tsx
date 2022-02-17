import { Badge, Tabbar, Toast } from "@taroify/core"
import { FriendsOutlined, HomeOutlined, Search, SettingOutlined } from "@taroify/icons"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

function BasicTabbar() {
  return (
    <Tabbar>
      <Tabbar.TabItem icon={<HomeOutlined />}>标签</Tabbar.TabItem>
      <Tabbar.TabItem icon={<Search />}>标签</Tabbar.TabItem>
      <Tabbar.TabItem icon={<FriendsOutlined />}>标签</Tabbar.TabItem>
      <Tabbar.TabItem icon={<SettingOutlined />}>标签</Tabbar.TabItem>
    </Tabbar>
  )
}

function KeyTabbar() {
  return (
    <Tabbar defaultValue="1">
      <Tabbar.TabItem value="1" icon={<HomeOutlined />}>
        标签
      </Tabbar.TabItem>
      <Tabbar.TabItem value="2" icon={<Search />}>
        标签
      </Tabbar.TabItem>
      <Tabbar.TabItem value="3" icon={<FriendsOutlined />}>
        标签
      </Tabbar.TabItem>
      <Tabbar.TabItem value="4" icon={<SettingOutlined />}>
        标签
      </Tabbar.TabItem>
    </Tabbar>
  )
}

function BadgeTabbar() {
  return (
    <Tabbar>
      <Tabbar.TabItem icon={<HomeOutlined />}>标签</Tabbar.TabItem>
      <Tabbar.TabItem badge icon={<Search />}>
        标签
      </Tabbar.TabItem>
      <Tabbar.TabItem badge="5" icon={<FriendsOutlined />}>
        标签
      </Tabbar.TabItem>
      <Tabbar.TabItem badge={<Badge content={100} max={99} />} icon={<SettingOutlined />}>
        标签
      </Tabbar.TabItem>
    </Tabbar>
  )
}

function TabbarWithCustomColor() {
  return (
    <Tabbar className="custom-color">
      <Tabbar.TabItem icon={<HomeOutlined />}>标签</Tabbar.TabItem>
      <Tabbar.TabItem icon={<Search />}>标签</Tabbar.TabItem>
      <Tabbar.TabItem icon={<FriendsOutlined />}>标签</Tabbar.TabItem>
      <Tabbar.TabItem icon={<SettingOutlined />}>标签</Tabbar.TabItem>
    </Tabbar>
  )
}

function EventTabbar() {
  return (
    <>
      <Toast id="toast" />
      <Tabbar onChange={(value) => Toast.open(`标签 ${Number(value) + 1}`)}>
        <Tabbar.TabItem icon={<HomeOutlined />}>标签</Tabbar.TabItem>
        <Tabbar.TabItem icon={<Search />}>标签</Tabbar.TabItem>
        <Tabbar.TabItem icon={<FriendsOutlined />}>标签</Tabbar.TabItem>
        <Tabbar.TabItem icon={<SettingOutlined />}>标签</Tabbar.TabItem>
      </Tabbar>
    </>
  )
}

export default function TabbarDemo() {
  return (
    <Page title="Tabbar 标签栏" className="tabbar-demo">
      <Block title="基础用法">
        <BasicTabbar />
      </Block>
      <Block title="通过 value 匹配">
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

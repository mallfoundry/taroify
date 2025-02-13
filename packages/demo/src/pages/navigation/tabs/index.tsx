import { Tabs, Toast } from "@taroify/core"
import { MoreOutlined, Success } from "@taroify/icons"
import Block from "../../../components/block"
import CustomWrapper from "../../../components/custom-wrapper"
import Page from "../../../components/page"
import "./index.scss"

function BasicTabs() {
  return (
    <Tabs>
      <Tabs.TabPane title="标签 1">内容 1</Tabs.TabPane>
      <Tabs.TabPane title="标签 2">内容 2</Tabs.TabPane>
      <Tabs.TabPane title="标签 3">内容 3</Tabs.TabPane>
      <Tabs.TabPane title="标签 4">内容 4</Tabs.TabPane>
    </Tabs>
  )
}

function BadgeTabs() {
  return (
    <Tabs>
      <Tabs.TabPane title="标签 1" dot>内容 1</Tabs.TabPane>
      <Tabs.TabPane title="标签 2" badge={8}>内容 2</Tabs.TabPane>
      <Tabs.TabPane title="标签 3" badge="Hot">内容 3</Tabs.TabPane>
      <Tabs.TabPane title="标签 4" badge={<Success className="badge-icon" />}>内容 4</Tabs.TabPane>
    </Tabs>
  )
}

function KeyedTabs() {
  return (
    <Tabs defaultValue="a">
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
  return (
    <Tabs>
      <Tabs.TabPane title="标签 1内容 1内容 1内容 1内容 1内容 1">内容 1</Tabs.TabPane>
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
  return (
    <Tabs>
      <Tabs.TabPane title="标签 1">内容 1</Tabs.TabPane>
      <Tabs.TabPane title="标签 2" disabled>
        内容 2
      </Tabs.TabPane>
      <Tabs.TabPane title="标签 3">内容 3</Tabs.TabPane>
    </Tabs>
  )
}

function CardTabs() {
  return (
    <Tabs theme="card">
      <Tabs.TabPane title="标签 1">内容 1</Tabs.TabPane>
      <Tabs.TabPane title="标签 2">内容 2</Tabs.TabPane>
      <Tabs.TabPane title="标签 3">内容 3</Tabs.TabPane>
    </Tabs>
  )
}

function TabsWithTabClick() {
  return (
    <>
      <Toast id="toast" />
      <Tabs onTabClick={({ title }) => Toast.open(title)}>
        <Tabs.TabPane title="标签 1">内容 1</Tabs.TabPane>
        <Tabs.TabPane title="标签 2">内容 2</Tabs.TabPane>
        <Tabs.TabPane title="标签 3">内容 3</Tabs.TabPane>
      </Tabs>
      <Toast id="toast" />
    </>
  )
}

function StickyTabs() {
  return (
    <Tabs sticky>
      <Tabs.TabPane title="标签 1">内容 1</Tabs.TabPane>
      <Tabs.TabPane title="标签 2">内容 2</Tabs.TabPane>
      <Tabs.TabPane title="标签 3">内容 3</Tabs.TabPane>
      <Tabs.TabPane title="标签 4">内容 4</Tabs.TabPane>
    </Tabs>
  )
}

function ShrinkTabs() {
  return (
    <>
    <Tabs shrink>
      <Tabs.TabPane title="标签 1">内容 1</Tabs.TabPane>
      <Tabs.TabPane title="标签 2">内容 2</Tabs.TabPane>
      <Tabs.TabPane title="标签 3">内容 3</Tabs.TabPane>
      <Tabs.TabPane title="标签 4">内容 4</Tabs.TabPane>
    </Tabs>
    <Tabs shrink theme="card">
      <Tabs.TabPane title="标签 1">内容 1</Tabs.TabPane>
      <Tabs.TabPane title="标签 2">内容 2</Tabs.TabPane>
      <Tabs.TabPane title="标签 3">内容 3</Tabs.TabPane>
      <Tabs.TabPane title="标签 4">内容 4</Tabs.TabPane>
    </Tabs>
    </>
  )
}

function TabsWithCustomTitle() {
  return (
    <Tabs>
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
  return (
    <Tabs animated>
      <Tabs.TabPane title="标签 1">内容 1</Tabs.TabPane>
      <Tabs.TabPane title="标签 2">内容 2</Tabs.TabPane>
      <Tabs.TabPane title="标签 3">内容 3</Tabs.TabPane>
      <Tabs.TabPane title="标签 4">内容 4</Tabs.TabPane>
    </Tabs>
  )
}

function SwipeableTabs() {
  return (
    <Tabs animated swipeable>
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
      <Block title="徽标用法">
        <BadgeTabs />
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
      <Block title="收缩布局">
        <ShrinkTabs />
      </Block>
      <Block title="粘性布局">
        <StickyTabs />
      </Block>
      <Block title="自定义标签">
        <TabsWithCustomTitle />
      </Block>
      <Block title="切换动画">
        <CustomWrapper>
          <AnimatedTabs />
        </CustomWrapper>
      </Block>
      <Block title="滑动切换">
        <CustomWrapper>
          <SwipeableTabs />
        </CustomWrapper>
      </Block>
    </Page>
  )
}

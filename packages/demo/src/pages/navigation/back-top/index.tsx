import { BackTop, Cell, Tabs } from "@taroify/core"
import { useState } from "react"
import { View } from "@tarojs/components";
import Page from "../../../components/page"
import "./index.scss"

function BasicBackTop() {
  const list = [...Array(50).keys()];

  return (
    <View>
      <Cell.Group>
        {list.map(v => {
          return (
            <Cell key={v}>{v}</Cell>
          )
        })}
      </Cell.Group>
      <BackTop />
    </View>
  )
}

function CustomLocation() {
  const list = [...Array(50).keys()];

  return (
    <View>
      <Cell.Group>
        {list.map((v) => {
          return (
            <Cell key={v}>{v}</Cell>
          )
        })}
      </Cell.Group>
      <BackTop right={100} bottom={200} />
    </View>
  )
}

function CustomContent() {
  const list = [...Array(50).keys()];

  return (
    <View>
      <Cell.Group>
        {list.map((v) => {
          return (
            <Cell key={v}>{v}</Cell>
          )
        })}
      </Cell.Group>
      <BackTop className="custom-back-top">返回顶部</BackTop>
    </View>
  )
}

function SetImmediate() {
  const list = [...Array(50).keys()];

  return (
    <View>
      <Cell.Group>
        {list.map((v) => {
          return (
            <Cell key={v}>{v}</Cell>
          )
        })}
      </Cell.Group>
      <BackTop immediate />
    </View>
  )
}

export default function BackTopDemo() {
  const [value, setValue] = useState(0)
  
  return (
    <Page title="BackTop 回到顶部" className="back-top-demo">
      <Tabs value={value} onChange={setValue}>
        <Tabs.TabPane title="基础用法">
          <BasicBackTop />
        </Tabs.TabPane>
        <Tabs.TabPane title="自定义位置">
          <CustomLocation />
        </Tabs.TabPane>
        <Tabs.TabPane title="自定义内容">
          <CustomContent />
        </Tabs.TabPane>
        <Tabs.TabPane title="瞬间滚动">
          <SetImmediate />
        </Tabs.TabPane>
      </Tabs>
    </Page>
  )
}

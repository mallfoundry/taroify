import { Cell, IndexBar, Tabs } from "@taroify/core"
import * as _ from "lodash"
import * as React from "react"
import { Fragment, useState } from "react"
import Page from "../../../components/page"
import "./index.scss"

function BasicIndexBar() {
  const indexList: string[] = []
  const charCodeOfA = "A".charCodeAt(0)

  for (let i = 0; i < 26; i++) {
    indexList.push(String.fromCharCode(charCodeOfA + i))
  }

  return (
    <IndexBar>
      {_.map(indexList, (index) => {
        return (
          <Fragment key={index}>
            <IndexBar.Anchor index={index} />
            <Cell title="文本" />
            <Cell title="文本" />
            <Cell title="文本" />
          </Fragment>
        )
      })}
    </IndexBar>
  )
}

function CustomIndexBar() {
  const customIndexList = [1, 2, 3, 4, 5, 6, 8, 9, 10]

  return (
    <IndexBar>
      {_.map(customIndexList, (index) => {
        return (
          <Fragment key={index}>
            <IndexBar.Anchor index={index}>标题{index}</IndexBar.Anchor>
            <Cell title="文本" />
            <Cell title="文本" />
            <Cell title="文本" />
          </Fragment>
        )
      })}
    </IndexBar>
  )
}

export default function IndexBarDemo() {
  const [activeKey, setActiveKey] = useState<Tabs.TabKey>(0)
  return (
    <Page title="IndexBar 索引栏" className="index-bar-demo">
      <Tabs activeKey={activeKey} onChange={({ key }) => setActiveKey(key)}>
        <Tabs.TabPane title="基础用法">
          <BasicIndexBar />
        </Tabs.TabPane>
        <Tabs.TabPane title="自定义索引列表">
          <CustomIndexBar />
        </Tabs.TabPane>
      </Tabs>
    </Page>
  )
}

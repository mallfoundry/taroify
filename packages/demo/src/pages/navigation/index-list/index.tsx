import { Cell, IndexList, Tabs, Popup, Button } from "@taroify/core"
import * as _ from "lodash"
import { Fragment, useState } from "react"
import { View } from "@tarojs/components"
import Page from "../../../components/page"
import "./index.scss"

function BasicIndexBar() {
  const indexList: string[] = []
  const charCodeOfA = "A".charCodeAt(0)

  for (let i = 0; i < 26; i++) {
    indexList.push(String.fromCharCode(charCodeOfA + i))
  }

  return (
    <IndexList>
      {_.map(indexList, (index) => {
        return (
          <Fragment key={index}>
            <IndexList.Anchor index={index} />
            <Cell title="文本" />
            <Cell title="文本" />
            <Cell title="文本" />
          </Fragment>
        )
      })}
    </IndexList>
  )
}

function CustomIndexBar() {
  const customIndexList = [1, 2, 3, 4, 5, 6, 8, 9, 10]

  return (
    <IndexList>
      {_.map(customIndexList, (index) => {
        return (
          <Fragment key={index}>
            <IndexList.Anchor index={index}>标题{index}</IndexList.Anchor>
            <Cell title="文本" />
            <Cell title="文本" />
            <Cell title="文本" />
          </Fragment>
        )
      })}
    </IndexList>
  )
}

function PopupIndexBar() {
  const [open, setOpen] = useState(false)

  const indexList: string[] = []
  const charCodeOfA = "A".charCodeAt(0)

  for (let i = 0; i < 26; i++) {
    indexList.push(String.fromCharCode(charCodeOfA + i))
  }

  return (
    <>
      <Button block color="primary" className="index-list-demo_btn" onClick={() => setOpen(true)}>
        打开弹窗
      </Button>
      <Popup
        open={open}
        style={{ height: "80%" }}
        placement="bottom"
        rounded
        onClose={() => setOpen(false)}
      >
        <Popup.Close />
        <View className="index-list-demo_wrap">
          <IndexList inner delay={300} sticky={false}>
            {_.map(indexList, (index) => {
              return (
                <Fragment key={index}>
                  <IndexList.Anchor index={index} />
                  <Cell title="文本" />
                  <Cell title="文本" />
                  <Cell title="文本" />
                </Fragment>
              )
            })}
          </IndexList>
        </View>
      </Popup>
    </>
  )
}

export default function IndexBarDemo() {
  const [tab, setTab] = useState(0)
  return (
    <Page title="IndexList 索引栏" className="index-list-demo">
      <Tabs value={tab} onChange={setTab}>
        <Tabs.TabPane title="基础用法">
          <BasicIndexBar />
        </Tabs.TabPane>
        <Tabs.TabPane title="自定义索引列表">
          <CustomIndexBar />
        </Tabs.TabPane>
        <Tabs.TabPane title="配合弹窗使用">
          <PopupIndexBar />
        </Tabs.TabPane>
      </Tabs>
    </Page>
  )
}

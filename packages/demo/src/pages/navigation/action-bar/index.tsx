import { ActionBar } from "@taroify/core"
import { ChatOutlined } from "@taroify/icons"
import * as React from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

export default function ActionSheetDemo() {
  return (
    <Page title="ActionBar 动作栏" className="action-sheet-demo">
      <Block variant="card" title="基础用法">
        <ActionBar>
          <ActionBar.Icon icon={<ChatOutlined />} badge={{ dot: true }} text="客服" />
          <ActionBar.Icon icon={<ChatOutlined />} badge={{ content: 12 }} text="购物车" />
          <ActionBar.Icon icon={<ChatOutlined />} badge={{ content: 13 }} text="店铺" />
          <ActionBar.Button type="danger" text="立即购买" />
        </ActionBar>
      </Block>
    </Page>
  )
}

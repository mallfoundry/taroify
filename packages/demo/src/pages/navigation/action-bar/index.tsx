import { ActionBar } from "@taroify/commerce"
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
          <ActionBar.Button type="warning" text="立即购买" />
          <ActionBar.IconButton icon={<ChatOutlined />} badge="dot" text="客服" />
          <ActionBar.IconButton icon={<ChatOutlined />} badge="hot" text="购物车" />
          <ActionBar.Button type="danger" text="立即购买" />
          <ActionBar.IconButton icon={<ChatOutlined />} badge={13} text="店铺" />
        </ActionBar>
      </Block>
    </Page>
  )
}

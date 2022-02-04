import { ActionBar } from "@taroify/commerce"
import { ChatOutlined } from "@taroify/icons"
import { Text } from "@tarojs/components"
import * as React from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

export default function ActionSheetDemo() {
  return (
    <Page title="ActionBar 动作栏" className="action-sheet-demo">
      <Block variant="card" title="基础用法">
        <ActionBar>
          <ActionBar.ButtonGroup shape="border-round" flex={14}>
            <ActionBar.Button style={{ marginRight: "5px" }} type="danger">
              加入购物车
            </ActionBar.Button>
            <ActionBar.Button style={{ marginLeft: "5px" }} type="warning">
              立即购买
            </ActionBar.Button>
          </ActionBar.ButtonGroup>
          <ActionBar.IconButton badge={1}>
            <ChatOutlined />
            <Text>客服</Text>
          </ActionBar.IconButton>
          <ActionBar.IconButton badge="dot">
            <ChatOutlined />
            <Text>店铺</Text>
          </ActionBar.IconButton>
          <ActionBar.IconButton badge="hot">
            <ChatOutlined />
            <Text>店铺</Text>
          </ActionBar.IconButton>
        </ActionBar>
      </Block>
    </Page>
  )
}

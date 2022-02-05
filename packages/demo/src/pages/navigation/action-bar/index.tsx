import { ActionBar } from "@taroify/commerce"
import { ChatOutlined } from "@taroify/icons"
import { Text } from "@tarojs/components"
import * as React from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

function ActionBarBase() {
  return (
    <ActionBar>
      <ActionBar.ButtonGroup shape="round" flex={14}>
        <ActionBar.Button color="danger">加入购物车</ActionBar.Button>
        <ActionBar.Button color="warning">立即购买</ActionBar.Button>
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
  )
}

function ActionBarGroup() {
  return (
    <ActionBar>
      <ActionBar.ButtonGroup shape="square" flex={14}>
        <ActionBar.Button color="danger">加入购物车</ActionBar.Button>
        <ActionBar.Button color="warning">立即购买</ActionBar.Button>
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
  )
}

function ActionBarShape() {
  return (
    <ActionBar>
      <ActionBar.Button color="warning" shape="round">
        立即购买
      </ActionBar.Button>
      <ActionBar.Button color="danger" shape="round">
        加入购物车
      </ActionBar.Button>
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
  )
}

function ActionBarBottom() {
  return (
    <ActionBar fixed placeholder>
      <ActionBar.ButtonGroup shape="round" flex={14}>
        <ActionBar.Button color="danger">我是浮空得</ActionBar.Button>
        <ActionBar.Button color="warning">立即购买</ActionBar.Button>
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
  )
}

export default function ActionSheetDemo() {
  return (
    <Page title="ActionBar 动作栏" className="action-sheet-demo">
      <Block variant="card" title="基础用法">
        <ActionBarBase />
      </Block>
      <Block variant="card" title="形状">
        <ActionBarShape />
      </Block>
      <Block variant="card" title="组合">
        <ActionBarGroup />
      </Block>
      <Block variant="card" title="置底">
        <ActionBarBottom />
      </Block>
    </Page>
  )
}

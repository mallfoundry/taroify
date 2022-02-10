import { ActionBar } from "@taroify/commerce"
import { CartOutlined, ChatOutlined, ShopOutlined, Star } from "@taroify/icons"
import { Text } from "@tarojs/components"
import * as React from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

function BasicActionBar() {
  return (
    <ActionBar>
      <ActionBar.IconButton>
        <ChatOutlined />
        <Text>客服</Text>
      </ActionBar.IconButton>
      <ActionBar.IconButton>
        <CartOutlined />
        <Text>购物车</Text>
      </ActionBar.IconButton>
      <ActionBar.IconButton>
        <ShopOutlined />
        <Text>店铺</Text>
      </ActionBar.IconButton>
      <ActionBar.Button>立即购买</ActionBar.Button>
    </ActionBar>
  )
}

function ActionBarWithBadges() {
  return (
    <ActionBar>
      <ActionBar.IconButton badge>
        <ChatOutlined />
        <Text>客服</Text>
      </ActionBar.IconButton>
      <ActionBar.IconButton badge="5">
        <CartOutlined />
        <Text>购物车</Text>
      </ActionBar.IconButton>
      <ActionBar.IconButton badge="12">
        <ShopOutlined />
        <Text>店铺</Text>
      </ActionBar.IconButton>
      <ActionBar.ButtonGroup>
        <ActionBar.Button color="warning">加入购物车</ActionBar.Button>
        <ActionBar.Button color="danger">立即购买</ActionBar.Button>
      </ActionBar.ButtonGroup>
    </ActionBar>
  )
}

function ActionBarWithCustomIconButton() {
  return (
    <ActionBar>
      <ActionBar.IconButton>
        <ChatOutlined color="#ee0a24" />
        <Text>客服</Text>
      </ActionBar.IconButton>
      <ActionBar.IconButton>
        <CartOutlined />
        <Text>购物车</Text>
      </ActionBar.IconButton>
      <ActionBar.IconButton>
        <Star color="#ff5000" />
        <Text>已收藏</Text>
      </ActionBar.IconButton>
      <ActionBar.ButtonGroup>
        <ActionBar.Button color="danger">加入购物车</ActionBar.Button>
        <ActionBar.Button color="warning">立即购买</ActionBar.Button>
      </ActionBar.ButtonGroup>
    </ActionBar>
  )
}

function ActionBarWithCustomButton() {
  return (
    <ActionBar>
      <ActionBar.IconButton>
        <ChatOutlined />
        <Text>客服</Text>
      </ActionBar.IconButton>
      <ActionBar.IconButton>
        <CartOutlined />
        <Text>购物车</Text>
      </ActionBar.IconButton>
      <ActionBar.ButtonGroup>
        <ActionBar.Button style={{ background: "#be99ff" }}>加入购物车</ActionBar.Button>
        <ActionBar.Button style={{ background: "#7232dd" }}>立即购买</ActionBar.Button>
      </ActionBar.ButtonGroup>
    </ActionBar>
  )
}

export default function ActionBarDemo() {
  return (
    <Page title="ActionBar 动作栏" className="action-bar-demo">
      <Block title="基础用法">
        <BasicActionBar />
      </Block>
      <Block title="徽标提示">
        <ActionBarWithBadges />
      </Block>
      <Block title="自定义图标按钮颜色">
        <ActionBarWithCustomIconButton />
      </Block>
      <Block title="自定义按钮颜色">
        <ActionBarWithCustomButton />
      </Block>
    </Page>
  )
}

import { Button, Cell, DropdownMenu } from "@taroify/core"
import { View } from "@tarojs/components"
import * as React from "react"
import { useState } from "react"
import Block from "../../components/block"
import Page from "../../components/page"

import "./index.scss"

function BasicDropdownMenu() {
  const [activeKey, setActiveKey] = useState<DropdownMenu.Key>()
  const [option1, setOption1] = useState<DropdownMenu.Value>()
  const [option2, setOption2] = useState<DropdownMenu.Value>()
  return (
    <DropdownMenu activeKey={activeKey} onChange={setActiveKey}>
      <DropdownMenu.Item value={option1} onChange={setOption1}>
        <DropdownMenu.Option value={0}>全部商品</DropdownMenu.Option>
        <DropdownMenu.Option value={1}>新款商品</DropdownMenu.Option>
        <DropdownMenu.Option value={2}>活动商品</DropdownMenu.Option>
      </DropdownMenu.Item>
      <DropdownMenu.Item value={option2} onChange={setOption2}>
        <DropdownMenu.Option value={0}>默认排序</DropdownMenu.Option>
        <DropdownMenu.Option value={1}>好评排序</DropdownMenu.Option>
        <DropdownMenu.Option value={2}>销量排序</DropdownMenu.Option>
      </DropdownMenu.Item>
    </DropdownMenu>
  )
}

function DropdownMenuWithCustomContent() {
  const [activeKey, setActiveKey] = useState<DropdownMenu.Key>()
  const [option1, setOption1] = useState<DropdownMenu.Value>()
  return (
    <DropdownMenu activeKey={activeKey} onChange={setActiveKey}>
      <DropdownMenu.Item value={option1} onChange={setOption1}>
        <DropdownMenu.Option value={0}>全部商品</DropdownMenu.Option>
        <DropdownMenu.Option value={1}>新款商品</DropdownMenu.Option>
        <DropdownMenu.Option value={2}>活动商品</DropdownMenu.Option>
      </DropdownMenu.Item>
      <DropdownMenu.Item title="筛选">
        <Cell title="包邮" align="center">
          switch
        </Cell>
        <Cell title="团购" align="center">
          switch
        </Cell>
        <View style="padding: 5px 16px;">
          <Button color="danger" block shape="round" onClick={() => setActiveKey(undefined)}>
            确认
          </Button>
        </View>
      </DropdownMenu.Item>
    </DropdownMenu>
  )
}

function DropdownMenuWithCustomColor() {
  const [activeKey, setActiveKey] = useState<DropdownMenu.Key>()
  const [option1, setOption1] = useState<DropdownMenu.Value>()
  const [option2, setOption2] = useState<DropdownMenu.Value>()
  return (
    <DropdownMenu activeKey={activeKey} activeColor="#1989fa" onChange={setActiveKey}>
      <DropdownMenu.Item value={option1} onChange={setOption1}>
        <DropdownMenu.Option value={0}>全部商品</DropdownMenu.Option>
        <DropdownMenu.Option value={1}>新款商品</DropdownMenu.Option>
        <DropdownMenu.Option value={2}>活动商品</DropdownMenu.Option>
      </DropdownMenu.Item>
      <DropdownMenu.Item value={option2} onChange={setOption2}>
        <DropdownMenu.Option value={0}>默认排序</DropdownMenu.Option>
        <DropdownMenu.Option value={1}>好评排序</DropdownMenu.Option>
        <DropdownMenu.Option value={2}>销量排序</DropdownMenu.Option>
      </DropdownMenu.Item>
    </DropdownMenu>
  )
}

function DisabledDropdownMenu() {
  const [activeKey, setActiveKey] = useState<DropdownMenu.Key>()
  return (
    <DropdownMenu activeKey={activeKey} onChange={setActiveKey}>
      <DropdownMenu.Item disabled>
        <DropdownMenu.Option value={0}>全部商品</DropdownMenu.Option>
        <DropdownMenu.Option value={1}>新款商品</DropdownMenu.Option>
        <DropdownMenu.Option value={2}>活动商品</DropdownMenu.Option>
      </DropdownMenu.Item>
      <DropdownMenu.Item disabled>
        <DropdownMenu.Option value={0}>默认排序</DropdownMenu.Option>
        <DropdownMenu.Option value={1}>好评排序</DropdownMenu.Option>
        <DropdownMenu.Option value={2}>销量排序</DropdownMenu.Option>
      </DropdownMenu.Item>
    </DropdownMenu>
  )
}

function UpDropdownMenu() {
  const [activeKey, setActiveKey] = useState<DropdownMenu.Key>()
  const [option1, setOption1] = useState<DropdownMenu.Value>()
  const [option2, setOption2] = useState<DropdownMenu.Value>()
  return (
    <DropdownMenu activeKey={activeKey} direction="up" onChange={setActiveKey}>
      <DropdownMenu.Item value={option1} onChange={setOption1}>
        <DropdownMenu.Option value={0}>全部商品</DropdownMenu.Option>
        <DropdownMenu.Option value={1}>新款商品</DropdownMenu.Option>
        <DropdownMenu.Option value={2}>活动商品</DropdownMenu.Option>
      </DropdownMenu.Item>
      <DropdownMenu.Item value={option2} onChange={setOption2}>
        <DropdownMenu.Option value={0}>默认排序</DropdownMenu.Option>
        <DropdownMenu.Option value={1}>好评排序</DropdownMenu.Option>
        <DropdownMenu.Option value={2}>销量排序</DropdownMenu.Option>
      </DropdownMenu.Item>
    </DropdownMenu>
  )
}

export default function DropdownMenuDemo() {
  return (
    <Page className="dropdown-menu-demo" title="DropdownMenu 下拉菜单">
      <Block title="基础用法">
        <BasicDropdownMenu />
      </Block>
      <Block title="自定义菜单内容">
        <DropdownMenuWithCustomContent />
      </Block>
      <Block title="自定义选中态颜色">
        <DropdownMenuWithCustomColor />
      </Block>
      <Block title="向上展开">
        <UpDropdownMenu />
      </Block>
      <Block title="禁用菜单">
        <DisabledDropdownMenu />
      </Block>
    </Page>
  )
}

import { Button, Cell, DropdownMenu, Switch } from "@taroify/core"
import { View } from "@tarojs/components"
import { Key, useState } from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"

import "./index.scss"

function BasicDropdownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenu.Item>
        <DropdownMenu.Option value={0}>全部商品</DropdownMenu.Option>
        <DropdownMenu.Option value={1}>新款商品</DropdownMenu.Option>
        <DropdownMenu.Option value={2}>活动商品</DropdownMenu.Option>
        <DropdownMenu.Option value={3}>活动商品2</DropdownMenu.Option>
        <DropdownMenu.Option value={4}>活动商品3</DropdownMenu.Option>
        <DropdownMenu.Option value={5}>活动商品4</DropdownMenu.Option>
        <DropdownMenu.Option value={6}>活动商品5</DropdownMenu.Option>
        <DropdownMenu.Option value={7}>活动商品6</DropdownMenu.Option>
        <DropdownMenu.Option value={8}>活动商品7</DropdownMenu.Option>
        <DropdownMenu.Option value={9}>活动商品8</DropdownMenu.Option>
        <DropdownMenu.Option value={10}>活动商品9</DropdownMenu.Option>
        <DropdownMenu.Option value={11}>活动商品10</DropdownMenu.Option>
      </DropdownMenu.Item>
      <DropdownMenu.Item>
        <DropdownMenu.Option value={0}>默认排序</DropdownMenu.Option>
        <DropdownMenu.Option value={1}>好评排序</DropdownMenu.Option>
        <DropdownMenu.Option value={2}>销量排序</DropdownMenu.Option>
      </DropdownMenu.Item>
    </DropdownMenu>
  )
}

function DropdownMenuWithCustomContent() {
  const [value, setValue] = useState<Key | false>()
  const [option1, setOption1] = useState()
  const [switch1, setSwitch1] = useState(true)
  const [switch2, setSwitch2] = useState(false)
  return (
    <DropdownMenu value={value} onChange={setValue}>
      <DropdownMenu.Item value={option1} onChange={setOption1}>
        <DropdownMenu.Option value={0}>全部商品</DropdownMenu.Option>
        <DropdownMenu.Option value={1}>新款商品</DropdownMenu.Option>
        <DropdownMenu.Option value={2}>活动商品</DropdownMenu.Option>
      </DropdownMenu.Item>
      <DropdownMenu.Item title="筛选">
        <Cell title="包邮" align="center">
          <Switch size="24" checked={switch1} onChange={setSwitch1} />
        </Cell>
        <Cell title="团购" align="center">
          <Switch size="24" checked={switch2} onChange={setSwitch2} />
        </Cell>
        <View style="padding: 5px 16px;">
          <Button color="primary" block shape="round" onClick={() => setValue(false)}>
            确认
          </Button>
        </View>
      </DropdownMenu.Item>
    </DropdownMenu>
  )
}

function DropdownMenuWithCustomColor() {
  return (
    <DropdownMenu className="custom-color">
      <DropdownMenu.Item>
        <DropdownMenu.Option value={0}>全部商品</DropdownMenu.Option>
        <DropdownMenu.Option value={1}>新款商品</DropdownMenu.Option>
        <DropdownMenu.Option value={2}>活动商品</DropdownMenu.Option>
      </DropdownMenu.Item>
      <DropdownMenu.Item>
        <DropdownMenu.Option value={0}>默认排序</DropdownMenu.Option>
        <DropdownMenu.Option value={1}>好评排序</DropdownMenu.Option>
        <DropdownMenu.Option value={2}>销量排序</DropdownMenu.Option>
      </DropdownMenu.Item>
    </DropdownMenu>
  )
}

function UpDropdownMenu() {
  return (
    <DropdownMenu direction="up">
      <DropdownMenu.Item>
        <DropdownMenu.Option value={0}>全部商品</DropdownMenu.Option>
        <DropdownMenu.Option value={1}>新款商品</DropdownMenu.Option>
        <DropdownMenu.Option value={2}>活动商品</DropdownMenu.Option>
      </DropdownMenu.Item>
      <DropdownMenu.Item>
        <DropdownMenu.Option value={0}>默认排序</DropdownMenu.Option>
        <DropdownMenu.Option value={1}>好评排序</DropdownMenu.Option>
        <DropdownMenu.Option value={2}>销量排序</DropdownMenu.Option>
      </DropdownMenu.Item>
    </DropdownMenu>
  )
}

function DisabledDropdownMenu() {
  return (
    <DropdownMenu>
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

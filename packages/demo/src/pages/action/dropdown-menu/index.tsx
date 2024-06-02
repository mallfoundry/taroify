import { Button, Cell, DropdownMenu, Switch } from "@taroify/core"
import { View, PageMeta } from "@tarojs/components"
import { Key, useCallback, useState } from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"

import "./index.scss"

function BasicDropdownMenu() {
  const [options] = useState(
    [
      { title: "默认排序", value: 0 },
      { title: "好评排序", value: 1 },
      { title: "销量排序", value: 2 },
    ].concat(Array.from({ length: 20 }, (_, i) => ({ title: "选项" + i, value: 3 + i }))),
  )
  const [opened, setOpened] = useState(false)
  const getScrollHeight = useCallback((len) => {
    return len < 5 ? len * 46 : 5 * 46
  }, [])
  return (
    <>
      <PageMeta pageStyle={opened ? "overflow: hidden;" : ""} />
      <DropdownMenu>
        {/* @ts-ignore */}
        <DropdownMenu.Item
          style={{ "--dropdown-menu-item-content-max-height": getScrollHeight(23) + "px" }}
          options={options}
          lock
          onOpen={() => setOpened(true)}
          onClose={() => setOpened(false)}
        />
        {/* @ts-ignore */}
        <DropdownMenu.Item
          style={{ "--dropdown-menu-item-content-max-height": getScrollHeight(4) + "px" }}
          lock
          onOpen={() => setOpened(true)}
          onClose={() => setOpened(false)}
        >
          <DropdownMenu.Option value={0}>全部商品</DropdownMenu.Option>
          <DropdownMenu.Option value={1}>新款商品</DropdownMenu.Option>
          <DropdownMenu.Option value={2}>活动商品</DropdownMenu.Option>
          <DropdownMenu.Option value={3}>活动商品2</DropdownMenu.Option>
        </DropdownMenu.Item>
      </DropdownMenu>
    </>
  )
}

function DropdownMenuWithCustomContent() {
  const [value, setValue] = useState<Key | false>()
  const [option1, setOption1] = useState(0)
  const [switch1, setSwitch1] = useState(true)
  const [switch2, setSwitch2] = useState(false)
  const [options] = useState([
    {
      title: (
        <View>
          默认<View>排序</View>
        </View>
      ),
      value: 0,
    },
    { title: "好评排序", value: 1 },
    { title: "销量排序", value: 2 },
  ])
  return (
    <DropdownMenu value={value} onChange={setValue}>
      <DropdownMenu.Item
        value={option1}
        onChange={setOption1}
        options={options}
      ></DropdownMenu.Item>
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
function BackDropDropdownMenu() {
  return (
    <DropdownMenu backdropType="outer">
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
      <Block title="背景板位置">
        <BackDropDropdownMenu />
      </Block>
      <Block title="禁用菜单">
        <DisabledDropdownMenu />
      </Block>
      <View style={{ height: "400px", background: "transparent", width: "100vw" }}></View>
    </Page>
  )
}

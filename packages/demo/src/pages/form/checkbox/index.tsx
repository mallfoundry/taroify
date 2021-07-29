import { Cell, Checkbox, Image, Space } from "@taroify/core"
import * as React from "react"
import { useState } from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

function BasicCheckbox() {
  const [value, setValue] = useState(false)
  return (
    <Checkbox checked={value} onChange={setValue}>
      复选框
    </Checkbox>
  )
}

function SquareCheckbox() {
  const [value, setValue] = useState(false)
  return (
    <Checkbox shape="square" checked={value} onChange={setValue}>
      自定义形状
    </Checkbox>
  )
}

function CheckboxWithCustomColor() {
  const [value, setValue] = useState(false)
  return (
    <Checkbox color="#ee0a24" checked={value} onChange={setValue}>
      自定义颜色
    </Checkbox>
  )
}

function CheckboxWithCustomSize() {
  const [value, setValue] = useState(false)

  return (
    <Checkbox size={24} checked={value} onChange={setValue}>
      自定义大小
    </Checkbox>
  )
}

function CheckboxWithCustomIcon() {
  const [value, setValue] = useState(false)

  return (
    <Checkbox
      icon={
        <Image
          src={`https://img.yzcdn.cn/vant/user-${value ? "active" : "inactive"}.png`}
          style={{
            width: "25px",
            height: "20px",
          }}
        />
      }
      checked={value}
      onChange={setValue}
    >
      自定义图标
    </Checkbox>
  )
}

function BasicCheckboxGroup() {
  const [value, setValue] = useState(["a", "b"])

  return (
    <Checkbox.Group value={value} onChange={setValue}>
      <Checkbox name="a">复选框 a</Checkbox>
      <Checkbox name="b">复选框 b</Checkbox>
    </Checkbox.Group>
  )
}

function HorizontalCheckboxGroup() {
  const [value, setValue] = useState<string[]>([])

  return (
    <Checkbox.Group direction="horizontal" value={value} onChange={setValue}>
      <Checkbox name="a">复选框 a</Checkbox>
      <Checkbox name="b">复选框 b</Checkbox>
    </Checkbox.Group>
  )
}

function MaxCheckboxGroup() {
  const [value, setValue] = useState<string[]>([])

  return (
    <Checkbox.Group max={2} value={value} onChange={setValue}>
      <Checkbox name="a">复选框 a</Checkbox>
      <Checkbox name="b">复选框 b</Checkbox>
      <Checkbox name="c">复选框 c</Checkbox>
    </Checkbox.Group>
  )
}

function CheckboxCellGroup() {
  const [value, setValue] = useState<string[]>([])

  return (
    <Checkbox.Group max={2} value={value} onChange={setValue}>
      <Cell.Group clickable>
        <Cell title="复选框 a">
          <Checkbox name="a" />
        </Cell>
        <Cell title="复选框 b">
          <Checkbox name="b" />
        </Cell>
      </Cell.Group>
    </Checkbox.Group>
  )
}

export default function CheckboxDemo() {
  return (
    <Page title="Checkbox 复选框" className="checkbox-demo">
      <Block title="基础用法">
        <BasicCheckbox />
      </Block>
      <Block title="禁用状态">
        <Space direction="vertical">
          <Checkbox disabled checked={false}>
            复选框
          </Checkbox>
          <Checkbox disabled checked>
            复选框
          </Checkbox>
        </Space>
      </Block>
      <Block title="自定义形状">
        <SquareCheckbox />
      </Block>
      <Block title="自定义颜色">
        <CheckboxWithCustomColor />
      </Block>
      <Block title="自定义大小">
        <CheckboxWithCustomSize />
      </Block>
      <Block title="自定义图标">
        <CheckboxWithCustomIcon />
      </Block>
      <Block title="复选框组" className="basic-checkbox-group">
        <BasicCheckboxGroup />
      </Block>
      <Block title="水平排列" className="horizontal-checkbox-group">
        <HorizontalCheckboxGroup />
      </Block>
      <Block title="水平排列" className="basic-checkbox-group">
        <MaxCheckboxGroup />
      </Block>
      <Block title="搭配单元格组件使用" className="checkbox-cell-group">
        <CheckboxCellGroup />
      </Block>
    </Page>
  )
}

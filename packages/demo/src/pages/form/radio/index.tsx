import { Cell, Image, Radio } from "@taroify/core"
import * as React from "react"
import { useState } from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

function BasicRadio() {
  const [value, setValue] = useState("1")
  return (
    <Radio.Group value={value} onChange={setValue}>
      <Radio name="1">单选框 1</Radio>
      <Radio name="2">单选框 2</Radio>
    </Radio.Group>
  )
}

function HorizontalRadio() {
  const [value, setValue] = useState("1")
  return (
    <Radio.Group direction="horizontal" value={value} onChange={setValue}>
      <Radio name="1">单选框 1</Radio>
      <Radio name="2">单选框 2</Radio>
    </Radio.Group>
  )
}

function DisabledRadio() {
  const [value, setValue] = useState("1")
  return (
    <Radio.Group disabled value={value} onChange={setValue}>
      <Radio name="1">单选框 1</Radio>
      <Radio name="2">单选框 2</Radio>
    </Radio.Group>
  )
}

function SquareRadio() {
  const [value, setValue] = useState("1")
  return (
    <Radio.Group value={value} onChange={setValue}>
      <Radio name="1" shape="square">
        单选框 1
      </Radio>
      <Radio name="2" shape="square">
        单选框 2
      </Radio>
    </Radio.Group>
  )
}

function CustomColorRadio() {
  const [value, setValue] = useState("1")
  return (
    <Radio.Group className="custom-color" value={value} onChange={setValue}>
      <Radio name="1">单选框 1</Radio>
      <Radio name="2">单选框 2</Radio>
    </Radio.Group>
  )
}

function CustomSizeRadio() {
  const [value, setValue] = useState("1")
  return (
    <Radio.Group size={24} value={value} onChange={setValue}>
      <Radio name="1">单选框 1</Radio>
      <Radio name="2">单选框 2</Radio>
    </Radio.Group>
  )
}

function CustomIconRadio() {
  const [value, setValue] = useState("1")
  return (
    <Radio.Group value={value} onChange={setValue}>
      <Radio
        name="1"
        icon={
          <Image
            src={`https://img.yzcdn.cn/vant/user-${value === "1" ? "active" : "inactive"}.png`}
            style={{
              width: "25px",
              height: "20px",
            }}
          />
        }
      >
        单选框 1
      </Radio>
      <Radio
        name="2"
        icon={
          <Image
            src={`https://img.yzcdn.cn/vant/user-${value === "2" ? "active" : "inactive"}.png`}
            style={{
              width: "25px",
              height: "20px",
            }}
          />
        }
      >
        单选框 1
      </Radio>
    </Radio.Group>
  )
}

function RadioCellGroup() {
  const [value, setValue] = useState("1")

  return (
    <Radio.Group value={value} onChange={setValue}>
      <Cell.Group clickable>
        <Cell title="单选框 1">
          <Radio name="1" />
        </Cell>
        <Cell title="单选框 2">
          <Radio name="2" />
        </Cell>
      </Cell.Group>
    </Radio.Group>
  )
}

export default function RadioDemo() {
  return (
    <Page title="Radio 单选框" className="radio-demo">
      <Block title="基础用法">
        <BasicRadio />
      </Block>
      <Block title="水平排列">
        <HorizontalRadio />
      </Block>
      <Block title="禁用状态">
        <DisabledRadio />
      </Block>
      <Block title="自定义形状">
        <SquareRadio />
      </Block>
      <Block title="自定义颜色">
        <CustomColorRadio />
      </Block>
      <Block title="自定义大小">
        <CustomSizeRadio />
      </Block>
      <Block title="自定义图标">
        <CustomIconRadio />
      </Block>
      <Block title="与 Cell 组件一起使用" className="radio-cell-group">
        <RadioCellGroup />
      </Block>
    </Page>
  )
}

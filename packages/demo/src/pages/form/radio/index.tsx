import { Cell, Image, Radio } from "@taroify/core"
import { useState } from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

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

export default function RadioDemo() {
  return (
    <Page title="Radio 单选框" className="radio-demo">
      <Block title="基础用法">
        <Radio.Group defaultValue="1">
          <Radio name="1">单选框 1</Radio>
          <Radio name="2">单选框 2</Radio>
        </Radio.Group>
      </Block>
      <Block title="水平排列">
        <Radio.Group defaultValue="1" direction="horizontal">
          <Radio name="1">单选框 1</Radio>
          <Radio name="2">单选框 2</Radio>
        </Radio.Group>
      </Block>
      <Block title="禁用状态">
        <Radio.Group defaultValue="1" disabled>
          <Radio name="1">单选框 1</Radio>
          <Radio name="2">单选框 2</Radio>
        </Radio.Group>
      </Block>
      <Block title="自定义形状">
        <Radio.Group defaultValue="1">
          <Radio name="1" shape="square">
            单选框 1
          </Radio>
          <Radio name="2" shape="square">
            单选框 2
          </Radio>
        </Radio.Group>
      </Block>
      <Block title="自定义颜色">
        <Radio.Group className="custom-color" defaultValue="1">
          <Radio name="1">单选框 1</Radio>
          <Radio name="2">单选框 2</Radio>
        </Radio.Group>
      </Block>
      <Block title="自定义大小">
        <Radio.Group defaultValue="1" size={24}>
          <Radio name="1">单选框 1</Radio>
          <Radio name="2">单选框 2</Radio>
        </Radio.Group>
      </Block>
      <Block title="自定义图标">
        <CustomIconRadio />
      </Block>
      <Block title="与 Cell 组件一起使用" className="radio-cell-group">
        <Radio.Group defaultValue="1">
          <Cell.Group clickable>
            <Cell title="单选框 1">
              <Radio name="1" />
            </Cell>
            <Cell title="单选框 2">
              <Radio name="2" />
            </Cell>
          </Cell.Group>
        </Radio.Group>
      </Block>
    </Page>
  )
}

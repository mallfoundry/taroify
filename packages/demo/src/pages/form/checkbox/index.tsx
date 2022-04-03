import { Cell, Checkbox, Image, Space } from "@taroify/core"
import { useState } from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

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

export default function CheckboxDemo() {
  return (
    <Page title="Checkbox 复选框" className="checkbox-demo">
      <Block title="基础用法">
        <Checkbox defaultChecked>复选框</Checkbox>
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
        <Checkbox shape="square">自定义形状</Checkbox>
      </Block>
      <Block title="自定义颜色">
        <Checkbox className="custom-color">自定义颜色</Checkbox>
      </Block>
      <Block title="自定义大小">
        <Checkbox size={24}>自定义大小</Checkbox>
      </Block>
      <Block title="自定义图标">
        <CheckboxWithCustomIcon />
      </Block>
      <Block title="复选框组">
        <Checkbox.Group>
          <Checkbox name="a">复选框 a</Checkbox>
          <Checkbox name="b">复选框 b</Checkbox>
        </Checkbox.Group>
      </Block>
      <Block title="水平排列">
        <Checkbox.Group direction="horizontal">
          <Checkbox name="a">复选框 a</Checkbox>
          <Checkbox name="b">复选框 b</Checkbox>
        </Checkbox.Group>
      </Block>
      <Block title="限制最大可选数">
        <Checkbox.Group max={4}>
          <Checkbox name="a">复选框 a</Checkbox>
          <Checkbox name="b">复选框 b</Checkbox>
          <Checkbox name="c">复选框 c</Checkbox>
          <Checkbox name="d">复选框 d</Checkbox>
          <Checkbox name="e">复选框 e</Checkbox>
          <Checkbox name="f">复选框 f</Checkbox>
          <Checkbox name="g">复选框 g</Checkbox>
        </Checkbox.Group>
      </Block>
      <Block title="搭配单元格组件使用" className="checkbox-cell-group">
        <Checkbox.Group max={2}>
          <Cell.Group clickable>
            <Cell title="复选框 a">
              <Checkbox name="a" />
            </Cell>
            <Cell title="复选框 b">
              <Checkbox name="b" />
            </Cell>
          </Cell.Group>
        </Checkbox.Group>
      </Block>
    </Page>
  )
}

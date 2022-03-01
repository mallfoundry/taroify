import { Collapse } from "@taroify/core"
import { QuestionOutlined, ShopOutlined } from "@taroify/icons"
import { useState } from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

function BasicCollapse() {
  const [value, setValue] = useState([0])
  return (
    <Collapse value={value} onChange={setValue}>
      <Collapse.Item title="标题1">代码是写出来给人看的，附带能在机器上运行</Collapse.Item>
      <Collapse.Item title="标题2">代码是写出来给人看的，附带能在机器上运行</Collapse.Item>
      <Collapse.Item title="标题3">代码是写出来给人看的，附带能在机器上运行</Collapse.Item>
    </Collapse>
  )
}

function AccordionCollapse() {
  return (
    <Collapse accordion defaultValue={0}>
      <Collapse.Item title="标题1">代码是写出来给人看的，附带能在机器上运行</Collapse.Item>
      <Collapse.Item title="标题2">代码是写出来给人看的，附带能在机器上运行</Collapse.Item>
      <Collapse.Item title="标题3">代码是写出来给人看的，附带能在机器上运行</Collapse.Item>
    </Collapse>
  )
}

function CollapseWithDisabledWithReadonly() {
  return (
    <Collapse defaultValue={[0]}>
      <Collapse.Item title="正常状态">代码是写出来给人看的，附带能在机器上运行</Collapse.Item>
      <Collapse.Item title="只读状态" clickable={false}>
        代码是写出来给人看的，附带能在机器上运行
      </Collapse.Item>
      <Collapse.Item title="禁用状态" disabled>
        代码是写出来给人看的，附带能在机器上运行
      </Collapse.Item>
    </Collapse>
  )
}

function CustomCollapse() {
  return (
    <Collapse defaultValue={[0]}>
      <Collapse.Item
        className="custom-collapse-item1"
        title={
          <>
            标题1
            <QuestionOutlined />
          </>
        }
      >
        代码是写出来给人看的，附带能在机器上运行
      </Collapse.Item>
      <Collapse.Item icon={<ShopOutlined />} title="标题2" extra="内容" clickable={false}>
        代码是写出来给人看的，附带能在机器上运行
      </Collapse.Item>
    </Collapse>
  )
}

export default function CollapseDemo() {
  return (
    <Page title="Collapse 折叠面板" className="collapse-demo">
      <Block title="基础用法">
        <BasicCollapse />
      </Block>
      <Block title="手风琴">
        <AccordionCollapse />
      </Block>
      <Block title="只读状态和禁用状态">
        <CollapseWithDisabledWithReadonly />
      </Block>
      <Block title="自定义标题内容">
        <CustomCollapse />
      </Block>
    </Page>
  )
}

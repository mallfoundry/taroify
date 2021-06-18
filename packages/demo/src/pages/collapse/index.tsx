import { Collapse, CollapseItem } from "@taroify/core"
import { QuestionOutlined, ShopOutlined } from "@taroify/icons"
import * as React from "react"
import { useState } from "react"
import Block from "../../components/block"
import Page from "../../components/page"
import "./index.scss"

function BasicCollapse() {
  const [activeKey, setActiveKey] = useState<number | number[] | string | string[]>([0])
  return (
    <Block title="基础用法">
      <Collapse activeKey={activeKey} onChange={setActiveKey}>
        <CollapseItem title="标题1">代码是写出来给人看的，附带能在机器上运行</CollapseItem>
        <CollapseItem title="标题2">代码是写出来给人看的，附带能在机器上运行</CollapseItem>
        <CollapseItem title="标题3">代码是写出来给人看的，附带能在机器上运行</CollapseItem>
      </Collapse>
    </Block>
  )
}

function AccordionCollapse() {
  const [activeKey, setActiveKey] = useState<number | number[] | string | string[]>(0)
  return (
    <Block title="手风琴">
      <Collapse accordion activeKey={activeKey} onChange={setActiveKey}>
        <CollapseItem title="标题1">代码是写出来给人看的，附带能在机器上运行</CollapseItem>
        <CollapseItem title="标题2">代码是写出来给人看的，附带能在机器上运行</CollapseItem>
        <CollapseItem title="标题3">代码是写出来给人看的，附带能在机器上运行</CollapseItem>
      </Collapse>
    </Block>
  )
}

function CollapseWithDisabledWithReadonly() {
  const [activeKey, setActiveKey] = useState<number | number[] | string | string[]>([0])
  return (
    <Block title="只读状态和禁用状态">
      <Collapse activeKey={activeKey} onChange={setActiveKey}>
        <CollapseItem title="正常状态">代码是写出来给人看的，附带能在机器上运行</CollapseItem>
        <CollapseItem title="只读状态" clickable={false}>
          代码是写出来给人看的，附带能在机器上运行
        </CollapseItem>
        <CollapseItem title="禁用状态" disabled>
          代码是写出来给人看的，附带能在机器上运行
        </CollapseItem>
      </Collapse>
    </Block>
  )
}

function CustomCollapse() {
  const [activeKey, setActiveKey] = useState<number | number[] | string | string[]>([0])
  return (
    <Block title="自定义标题内容">
      <Collapse activeKey={activeKey} onChange={setActiveKey}>
        <CollapseItem
          className="custom-collapse-item1"
          title={
            <>
              标题1
              <QuestionOutlined />
            </>
          }
        >
          代码是写出来给人看的，附带能在机器上运行
        </CollapseItem>
        <CollapseItem icon={<ShopOutlined />} title="标题2" extra="内容" clickable={false}>
          代码是写出来给人看的，附带能在机器上运行
        </CollapseItem>
      </Collapse>
    </Block>
  )
}

export default function CollapseDemo() {
  return (
    <Page title="Collapse 折叠面板" className="collapse-demo">
      <BasicCollapse />
      <AccordionCollapse />
      <CollapseWithDisabledWithReadonly />
      <CustomCollapse />
    </Page>
  )
}

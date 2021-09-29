import { Cascader, Field, Popup } from "@taroify/core"
import * as React from "react"
import { useState } from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

function BasicCascader() {
  const [popupOpen, setPopupOpen] = useState(false)
  const [value, setValue] = useState<string[]>([])
  return (
    <>
      <Field label="选项值" onClick={() => setPopupOpen(true)} />
      <Popup open={popupOpen} rounded placement="bottom" onClose={setPopupOpen}>
        <Cascader
          title="请选择所在地区"
          value={value}
          onClose={() => setPopupOpen(false)}
          onChange={setValue}
        >
          <Cascader.Tab>
            <Cascader.Option value="330101">浙江省</Cascader.Option>
            <Cascader.Option value="330102">江苏省</Cascader.Option>
          </Cascader.Tab>
          <Cascader.Tab>
            <Cascader.Option value="330101">绿藤市</Cascader.Option>
            <Cascader.Option value="330102">绿藤市1</Cascader.Option>
          </Cascader.Tab>
          <Cascader.Tab>
            <Cascader.Option value="330101">淮阴市</Cascader.Option>
            <Cascader.Option value="330102">淮阴市1</Cascader.Option>
          </Cascader.Tab>
          <Cascader.Tab>
            <Cascader.Option value="330101">淄博市</Cascader.Option>
            <Cascader.Option value="330102">淄博市1</Cascader.Option>
          </Cascader.Tab>
        </Cascader>
      </Popup>
    </>
  )
}

export default function CascaderDemo() {
  return (
    <Page title="Cascader 级联选择" className="cascader-demo">
      <Block title="基础用法">
        <BasicCascader />
      </Block>
    </Page>
  )
}

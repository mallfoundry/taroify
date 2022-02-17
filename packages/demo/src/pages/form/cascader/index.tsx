import { Cascader, Field, Input, Popup } from "@taroify/core"
import { useCascader } from "@taroify/hooks"
import { ArrowRight } from "@taroify/icons"
import * as _ from "lodash"
import { useState } from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"
import area from "./area"
import "./index.scss"

function BasicCascader() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<string[]>([])
  const [fieldValue, setFieldValue] = useState("")
  const { columns } = useCascader({ value, depth: 3, options: area })
  return (
    <>
      <Field label="选项值" rightIcon={<ArrowRight />} onClick={() => setOpen(true)}>
        <Input readonly placeholder="请选择地区" value={fieldValue} />
      </Field>
      <Popup open={open} rounded placement="bottom" onClose={setOpen}>
        <Popup.Close />
        <Cascader
          value={value}
          onSelect={setValue}
          onChange={(_values_, options) => {
            setOpen(false)
            setFieldValue(
              _.join(
                _.map(options, ({ children }) => children),
                "/",
              ),
            )
          }}
        >
          <Cascader.Header>请选择所在地区</Cascader.Header>
          {
            //
            _.map(columns, (options, index) => (
              <Cascader.Tab key={index}>
                {
                  //
                  _.map(options, (option) => (
                    <Cascader.Option key={option.value} value={option.value}>
                      {option.label}
                    </Cascader.Option>
                  ))
                }
              </Cascader.Tab>
            ))
          }
        </Cascader>
      </Popup>
    </>
  )
}

function CustomColorCascader() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<string[]>([])
  const [fieldValue, setFieldValue] = useState("")
  const { columns } = useCascader({ value, depth: 3, options: area })
  return (
    <>
      <Field label="选项值" rightIcon={<ArrowRight />} onClick={() => setOpen(true)}>
        <Input readonly placeholder="请选择地区" value={fieldValue} />
      </Field>
      <Popup open={open} rounded placement="bottom" onClose={setOpen}>
        <Popup.Close />
        <Cascader
          className="custom-color"
          swipeable
          value={value}
          onSelect={setValue}
          onChange={(_values_, options) => {
            setOpen(false)
            setFieldValue(
              _.join(
                _.map(options, ({ children }) => children),
                "/",
              ),
            )
          }}
        >
          <Cascader.Header>请选择所在地区</Cascader.Header>
          {
            //
            _.map(columns, (options, index) => (
              <Cascader.Tab key={index}>
                {
                  //
                  _.map(options, (option) => (
                    <Cascader.Option key={option.value} value={option.value}>
                      {option.label}
                    </Cascader.Option>
                  ))
                }
              </Cascader.Tab>
            ))
          }
        </Cascader>
      </Popup>
    </>
  )
}

export default function CascaderDemo() {
  return (
    <Page title="Cascader 级联选择" className="cascader-demo">
      <Block variant="card" title="基础用法">
        <BasicCascader />
      </Block>
      <Block variant="card" title="自定义颜色">
        <CustomColorCascader />
      </Block>
    </Page>
  )
}

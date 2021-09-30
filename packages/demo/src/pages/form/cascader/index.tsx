import { Cascader, Field, Popup } from "@taroify/core"
import { useCascader } from "@taroify/hooks"
import * as _ from "lodash"
import * as React from "react"
import { useState } from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"
import area from "./area"
import "./index.scss"

function BasicCascader() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<string[]>([])
  const [fieldValue, setFieldValue] = useState("")
  const columns = useCascader({ value, depth: 3, options: area })
  console.log(columns)
  return (
    <>
      <Field readonly label="选项值" value={fieldValue} onClick={() => setOpen(true)} />
      <Popup open={open} rounded placement="bottom" onClose={setOpen}>
        <Cascader
          title="请选择所在地区"
          value={value}
          onClose={() => setOpen(false)}
          onSelect={setValue}
          onChange={(values, options) => {
            console.log(values)
            setOpen(false)
            setFieldValue(
              _.join(
                _.map(options, ({ children }) => children),
                "/",
              ),
            )
          }}
        >
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
      <Block title="基础用法">
        <BasicCascader />
      </Block>
    </Page>
  )
}

import { Cascader, Field, Input, Popup } from "@taroify/core"
import { ArrowRight } from "@taroify/icons"
import { useState } from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"
import { area, dept, customArea, dynamic } from "./area"
import "./index.scss"

function BasicCascader() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<string[]>([])
  const [fieldValue, setFieldValue] = useState("")
  return (
    <>
      <Field label="选项值" rightIcon={<ArrowRight />} onClick={() => setOpen(true)}>
        <Input readonly placeholder="请选择部门" value={fieldValue} />
      </Field>
      <Popup open={open} rounded placement="bottom" onClose={setOpen}>
        <Popup.Close />
        <Cascader
          options={dept}
          value={value}
          title="请选择部门"
          placeholder="请选择"
          onSelect={setValue}
          onChange={(_values_, options) => {
            setOpen(false)
            setFieldValue(
              options.map(item => item.children).join("/")
            )
          }}
        />
      </Popup>
    </>
  )
}

function CustomColorCascader() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<string[]>([])
  const [fieldValue, setFieldValue] = useState("")
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
          title="请选择地区"
          options={area}
          value={value}
          onSelect={setValue}
          onChange={(_values_, options) => {
            setOpen(false)
            setFieldValue(
              options.map(item => item.children).join("/")
            )
          }}
        >
        </Cascader>
      </Popup>
    </>
  )
}

function DynamicCascader() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<string[]>([])
  const [fieldValue, setFieldValue] = useState("")
  return (
    <>
      <Field label="选项值" rightIcon={<ArrowRight />} onClick={() => setOpen(true)}>
        <Input readonly placeholder="请选择" value={fieldValue} />
      </Field>
      <Popup open={open} rounded placement="bottom" onClose={setOpen}>
        <Popup.Close />
        <Cascader
          options={dynamic}
          loadData={(_values_) => {
            const len = _values_.length
            return new Promise((resolve) => {
              resolve(len > 3 ? [] : [
                { label: `动态${len}-1`, value: Math.random() },
                { label: `动态${len}-2`, value: Math.random() }
              ])
            })
          }}
          title="请选择"
          swipeable
          value={value}
          onSelect={setValue}
          onChange={(_values_, options) => {
            setOpen(false)
            setFieldValue(
              options.map(item => item.children).join("/")
            )
          }}
        />
      </Popup>
    </>
  )
}

const fieldNames = {
  label: "name",
  value: "code",
  children: "data"
}
function CustomFieldCascader() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<string[]>([])
  const [fieldValue, setFieldValue] = useState("")
  return (
    <>
      <Field label="选项值" rightIcon={<ArrowRight />} onClick={() => setOpen(true)}>
        <Input readonly placeholder="请选择地区" value={fieldValue} />
      </Field>
      <Popup open={open} rounded placement="bottom" onClose={setOpen}>
        <Popup.Close />
        <Cascader
          options={customArea}
          fieldNames={fieldNames}
          value={value}
          title="请选择地区"
          placeholder="请选择"
          onSelect={setValue}
          onChange={(_values_, options) => {
            setOpen(false)
            setFieldValue(
              options.map(item => item.children).join("/")
            )
          }}
        />
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
      <Block variant="card" title="异步加载选项">
        <DynamicCascader />
      </Block>
      <Block variant="card" title="自定义字段名">
        <CustomFieldCascader />
      </Block>
    </Page>
  )
}

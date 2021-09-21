import { Field, Picker, Popup, Toast } from "@taroify/core"
import { ArrowRight } from "@taroify/icons"
import * as _ from "lodash"
import * as React from "react"
import { useState } from "react"
import Block from "../../../components/block"
import BlockCard from "../../../components/block-card"
import Page from "../../../components/page"
import "./index.scss"

function BasicPicker() {
  const [toastOpen, setToastOpen] = useState(false)
  const [value, setValue] = useState("")
  return (
    <>
      <Toast open={toastOpen} onClose={() => setToastOpen(false)}>
        当前值：{value}
      </Toast>
      <Picker
        value={value}
        onChange={(values) => {
          setToastOpen(true)
          setValue(values)
        }}
      >
        <Picker.Toolbar>
          <Picker.Button>取消</Picker.Button>
          <Picker.Title>标题</Picker.Title>
          <Picker.Button>确认</Picker.Button>
        </Picker.Toolbar>
        <Picker.Column>
          <Picker.Option>杭州</Picker.Option>
          <Picker.Option>宁波</Picker.Option>
          <Picker.Option>温州</Picker.Option>
          <Picker.Option>绍兴</Picker.Option>
          <Picker.Option>湖州</Picker.Option>
          <Picker.Option>嘉兴</Picker.Option>
          <Picker.Option>金华</Picker.Option>
        </Picker.Column>
      </Picker>
    </>
  )
}

function DefaultPicker() {
  const [toastOpen, setToastOpen] = useState(false)
  const [value, setValue] = useState("温州")
  return (
    <>
      <Toast open={toastOpen} onClose={() => setToastOpen(false)}>
        当前值：{value}
      </Toast>
      <Picker
        value={value}
        onChange={(values) => {
          setToastOpen(true)
          setValue(values)
        }}
      >
        <Picker.Toolbar>
          <Picker.Button>取消</Picker.Button>
          <Picker.Title>标题</Picker.Title>
          <Picker.Button>确认</Picker.Button>
        </Picker.Toolbar>
        <Picker.Column>
          <Picker.Option>杭州</Picker.Option>
          <Picker.Option>宁波</Picker.Option>
          <Picker.Option>温州</Picker.Option>
          <Picker.Option>绍兴</Picker.Option>
          <Picker.Option>湖州</Picker.Option>
          <Picker.Option>嘉兴</Picker.Option>
          <Picker.Option>金华</Picker.Option>
        </Picker.Column>
      </Picker>
    </>
  )
}

function PickerWithMultiColumns() {
  const [toastOpen, setToastOpen] = useState(false)
  const [value, setValue] = useState([])

  return (
    <>
      <Toast open={toastOpen} onClose={() => setToastOpen(false)}>
        当前值：{_.join(value, ",")}
      </Toast>
      <Picker
        value={value}
        onChange={setValue}
        onConfirm={(values) => {
          setValue(values)
          setToastOpen(true)
        }}
      >
        <Picker.Toolbar>
          <Picker.Button>取消</Picker.Button>
          <Picker.Title>标题</Picker.Title>
          <Picker.Button>确认</Picker.Button>
        </Picker.Toolbar>
        <Picker.Column>
          <Picker.Option>周一</Picker.Option>
          <Picker.Option>周二</Picker.Option>
          <Picker.Option>周三</Picker.Option>
          <Picker.Option>周四</Picker.Option>
          <Picker.Option>周五</Picker.Option>
        </Picker.Column>
        <Picker.Column>
          <Picker.Option>上午</Picker.Option>
          <Picker.Option>下午</Picker.Option>
          <Picker.Option>晚上</Picker.Option>
        </Picker.Column>
      </Picker>
    </>
  )
}

function DisabledPicker() {
  return (
    <Picker>
      <Picker.Toolbar>
        <Picker.Button>取消</Picker.Button>
        <Picker.Title>标题</Picker.Title>
        <Picker.Button>确认</Picker.Button>
      </Picker.Toolbar>
      <Picker.Column>
        <Picker.Option disabled>杭州</Picker.Option>
        <Picker.Option>宁波</Picker.Option>
        <Picker.Option>温州</Picker.Option>
      </Picker.Column>
    </Picker>
  )
}

function LoadingPicker() {
  return (
    <Picker loading>
      <Picker.Toolbar>
        <Picker.Button>取消</Picker.Button>
        <Picker.Title>标题</Picker.Title>
        <Picker.Button>确认</Picker.Button>
      </Picker.Toolbar>
      <Picker.Column>
        <Picker.Option>浙江</Picker.Option>
        <Picker.Option>福建</Picker.Option>
      </Picker.Column>
      <Picker.Column>
        <Picker.Option>杭州</Picker.Option>
        <Picker.Option>宁波</Picker.Option>
        <Picker.Option>温州</Picker.Option>
        <Picker.Option>嘉兴</Picker.Option>
        <Picker.Option>湖州</Picker.Option>
      </Picker.Column>
    </Picker>
  )
}

function PickerPopup() {
  const [value, setValue] = useState("")
  const [openPicker, setOpenPicker] = useState(false)

  return (
    <>
      <Field
        value={value}
        label="城市"
        placeholder="选择城市"
        readonly
        rightIcon={<ArrowRight />}
        onClick={() => setOpenPicker(true)}
      />
      <Popup open={openPicker} rounded placement="bottom">
        <Picker
          onCancel={() => setOpenPicker(false)}
          onConfirm={(values) => {
            setValue(values)
            setOpenPicker(false)
          }}
        >
          <Picker.Toolbar>
            <Picker.Button>取消</Picker.Button>
            <Picker.Title>标题</Picker.Title>
            <Picker.Button>确认</Picker.Button>
          </Picker.Toolbar>
          <Picker.Column>
            <Picker.Option>杭州</Picker.Option>
            <Picker.Option>宁波</Picker.Option>
            <Picker.Option>温州</Picker.Option>
            <Picker.Option>绍兴</Picker.Option>
            <Picker.Option>湖州</Picker.Option>
            <Picker.Option>嘉兴</Picker.Option>
            <Picker.Option>金华</Picker.Option>
          </Picker.Column>
        </Picker>
      </Popup>
    </>
  )
}

export default function PickerDemo() {
  return (
    <Page title="Picker 选择器" className="picker-demo">
      <Block title="基础用法">
        <BlockCard>
          <BasicPicker />
        </BlockCard>
      </Block>
      <Block title="默认选中项">
        <BlockCard>
          <DefaultPicker />
        </BlockCard>
      </Block>
      <Block title="多列选择">
        <BlockCard>
          <PickerWithMultiColumns />
        </BlockCard>
      </Block>
      <Block title="禁用选项">
        <BlockCard>
          <DisabledPicker />
        </BlockCard>
      </Block>
      <Block title="加载状态">
        <BlockCard>
          <LoadingPicker />
        </BlockCard>
      </Block>
      <Block title="搭配弹出层使用">
        <BlockCard>
          <PickerPopup />
        </BlockCard>
      </Block>
    </Page>
  )
}

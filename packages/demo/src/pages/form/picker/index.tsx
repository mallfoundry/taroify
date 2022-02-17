import { Field, Input, Picker, Popup, Toast } from "@taroify/core"
import { ArrowRight } from "@taroify/icons"
import * as _ from "lodash"
import { useState } from "react"
import Block from "../../../components/block"
import CustomWrapper from "../../../components/custom-wrapper"
import Page from "../../../components/page"
import "./index.scss"

function BasicPicker() {
  return (
    <>
      <Toast id="toast" />
      <Picker onChange={(value) => Toast.open(`当前值：${value}`)}>
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
  return (
    <>
      <Toast id="toast" />
      <Picker defaultValue="温州" onChange={(value) => Toast.open(`当前值：${value}`)}>
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
  return (
    <>
      <Toast id="toast" />
      <Picker onConfirm={(values) => Toast.open(`当前值：${_.join(values, ",")}`)}>
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
      <Field label="城市" rightIcon={<ArrowRight />} onClick={() => setOpenPicker(true)}>
        <Input readonly placeholder="选择城市" value={value} />
      </Field>
      <Popup open={openPicker} rounded placement="bottom" onClose={setOpenPicker}>
        <Popup.Backdrop />
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
      <Block variant="card" title="基础用法">
        <CustomWrapper>
          <BasicPicker />
        </CustomWrapper>
      </Block>
      <Block variant="card" title="默认选中项">
        <CustomWrapper>
          <DefaultPicker />
        </CustomWrapper>
      </Block>
      <Block variant="card" title="多列选择">
        <CustomWrapper>
          <PickerWithMultiColumns />
        </CustomWrapper>
      </Block>
      <Block variant="card" title="禁用选项">
        <CustomWrapper>
          <DisabledPicker />
        </CustomWrapper>
      </Block>
      <Block variant="card" title="加载状态">
        <CustomWrapper>
          <LoadingPicker />
        </CustomWrapper>
      </Block>
      <Block variant="card" title="搭配弹出层使用">
        <CustomWrapper>
          <PickerPopup />
        </CustomWrapper>
      </Block>
    </Page>
  )
}

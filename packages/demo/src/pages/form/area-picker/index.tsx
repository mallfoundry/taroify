import { AreaPicker, Toast } from "@taroify/core"
import { PickerOptionObject } from "@taroify/core/picker"
import { areaList } from "@vant/area-data"
import * as _ from "lodash"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

function toastOptions(options?: PickerOptionObject[]) {
  const labels = _.map(options, ({ label }) => label)
  Toast.open(JSON.stringify(labels))
}

function BasicAreaPicker() {
  return (
    <AreaPicker onConfirm={(_values_, options) => toastOptions(options)}>
      <AreaPicker.Toolbar>
        <AreaPicker.Button>取消</AreaPicker.Button>
        <AreaPicker.Title>标题</AreaPicker.Title>
        <AreaPicker.Button>确认</AreaPicker.Button>
      </AreaPicker.Toolbar>
      <AreaPicker.Columns children={areaList} />
    </AreaPicker>
  )
}

function AreaPickerWithValue() {
  return (
    <AreaPicker
      value={["330000", "330300"]} //
      onConfirm={(_values_, options) => toastOptions(options)}
    >
      <AreaPicker.Toolbar>
        <AreaPicker.Button>取消</AreaPicker.Button>
        <AreaPicker.Title>标题</AreaPicker.Title>
        <AreaPicker.Button>确认</AreaPicker.Button>
      </AreaPicker.Toolbar>
      <AreaPicker.Columns children={areaList} />
    </AreaPicker>
  )
}

function AreaPickerWithColumns2() {
  return (
    <AreaPicker depth={2} onConfirm={(_values_, options) => toastOptions(options)}>
      <AreaPicker.Toolbar>
        <AreaPicker.Button>取消</AreaPicker.Button>
        <AreaPicker.Title>标题</AreaPicker.Title>
        <AreaPicker.Button>确认</AreaPicker.Button>
      </AreaPicker.Toolbar>
      <AreaPicker.Columns children={areaList} />
    </AreaPicker>
  )
}

export default function AreaPickerDemo() {
  return (
    <Page title="AreaPicker 省市区选择器" className="area-picker-demo">
      <Toast id="toast" />
      <Block variant="card" title="基础用法">
        <BasicAreaPicker />
      </Block>
      <Block variant="card" title="选中省市区">
        <AreaPickerWithValue />
      </Block>
      <Block variant="card" title="配置显示列">
        <AreaPickerWithColumns2 />
      </Block>
    </Page>
  )
}

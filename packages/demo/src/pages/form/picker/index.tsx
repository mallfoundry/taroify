import { Picker } from "@taroify/core"
import * as React from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

function BasicPicker() {
  return <Picker />
}

export default function PickerDemo() {
  return (
    <Page title="Picker 选择器" className="picker-demo">
      <Block title="基础用法">
        <BasicPicker />
      </Block>
    </Page>
  )
}

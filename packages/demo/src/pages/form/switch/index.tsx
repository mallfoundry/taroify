import { Cell, Switch } from "@taroify/core"
import * as React from "react"
import { useState } from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

interface SwitchListProps {
  checked?: boolean

  onChange?(checked: boolean): void
}

function BasicSwitch({ checked, onChange }: SwitchListProps) {
  return <Switch checked={checked} onChange={onChange} />
}

function DisabledSwitch({ checked }: SwitchListProps) {
  return <Switch checked={checked} disabled />
}

function LoadingSwitch({ checked }: SwitchListProps) {
  return <Switch checked={checked} loading />
}

function SwitchList() {
  const [checked, setChecked] = useState(false)
  return (
    <>
      <Block title="基础用法">
        <BasicSwitch checked={checked} onChange={setChecked} />
      </Block>
      <Block title="禁用状态">
        <DisabledSwitch checked={checked} />
      </Block>
      <Block title="加载状态">
        <LoadingSwitch checked={checked} />
      </Block>
    </>
  )
}

function CustomSizeSwitch() {
  const [checked, setChecked] = useState(false)
  return <Switch checked={checked} onChange={setChecked} size="24" />
}

function CustomColorSwitch() {
  const [checked, setChecked] = useState(false)
  return (
    <Switch checked={checked} onChange={setChecked} activeColor="#ee0a24" inactiveColor="#dcdee0" />
  )
}

function SwitchWithCell() {
  const [checked, setChecked] = useState(false)
  return (
    <Cell
      align="center"
      title="标题"
      rightIcon={<Switch checked={checked} onChange={setChecked} size="24" />}
    />
  )
}

export default function SwitchDemo() {
  return (
    <Page title="Switch 开关" className="switch-demo">
      <SwitchList />
      <Block title="自定义大小">
        <CustomSizeSwitch />
      </Block>
      <Block title="自定义颜色">
        <CustomColorSwitch />
      </Block>
      <Block title="搭配单元格使用" className="switch-with-cell">
        <SwitchWithCell />
      </Block>
    </Page>
  )
}

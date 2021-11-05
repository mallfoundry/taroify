import { Cell, Stepper } from "@taroify/core"
import * as React from "react"
import { useState } from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

function BasicStepper() {
  const [value, setValue] = useState<number | string>(0)
  return <Stepper value={value} onChange={setValue} />
}

function StepperWithCustomStep() {
  const [value, setValue] = useState<number | string>(0)
  return <Stepper step={2} value={value} onChange={setValue} />
}

function StepperWithClamp() {
  const [value, setValue] = useState<number | string>(0)
  return <Stepper min={5} max={8} value={value} onChange={setValue} />
}

function DisabledStepper() {
  return <Stepper disabled />
}

function StepperWithDisabledInput() {
  const [value, setValue] = useState<number | string>(0)
  return (
    <Stepper value={value} onChange={setValue}>
      <Stepper.Button />
      <Stepper.Input disabled />
      <Stepper.Button />
    </Stepper>
  )
}

function StepperWithPrecision() {
  const [value, setValue] = useState<number | string>(0)
  return <Stepper precision={2} value={value} onChange={setValue} />
}

function StepperWithCustomSize() {
  const [value, setValue] = useState<number | string>(0)
  return (
    <Stepper size="32" value={value} onChange={setValue}>
      <Stepper.Button />
      <Stepper.Input disabled width="40" />
      <Stepper.Button />
    </Stepper>
  )
}

function RoundStepper() {
  const [value, setValue] = useState<number | string>(0)
  return <Stepper shape="round" size="22" value={value} onChange={setValue} />
}

export default function StepperDemo() {
  return (
    <Page title="Stepper 步进器" className="stepper-demo">
      <Block variant="card">
        <Cell title="基本用法">
          <BasicStepper />
        </Cell>
        <Cell title="步长设置">
          <StepperWithCustomStep />
        </Cell>
        <Cell title="限制输入范围">
          <StepperWithClamp />
        </Cell>
        <Cell title="禁用状态">
          <DisabledStepper />
        </Cell>
        <Cell title="禁用状态">
          <DisabledStepper />
        </Cell>
        <Cell title="禁用输入框">
          <StepperWithDisabledInput />
        </Cell>
        <Cell title="固定小数位数">
          <StepperWithPrecision />
        </Cell>
        <Cell align="center" title="自定义大小">
          <StepperWithCustomSize />
        </Cell>
        <Cell title="圆角风格">
          <RoundStepper />
        </Cell>
      </Block>
    </Page>
  )
}

import { Cell, Stepper } from "@taroify/core"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

export default function StepperDemo() {
  return (
    <Page title="Stepper 步进器" className="stepper-demo">
      <Block variant="card">
        <Cell title="基本用法">
          <Stepper />
        </Cell>
        <Cell title="步长设置">
          <Stepper step={2} />
        </Cell>
        <Cell title="限制输入范围">
          <Stepper min={5} max={8} />
        </Cell>
        <Cell title="禁用状态">
          <Stepper disabled />
        </Cell>
        <Cell title="禁用输入框">
          <Stepper>
            <Stepper.Button />
            <Stepper.Input disabled />
            <Stepper.Button />
          </Stepper>
        </Cell>
        <Cell title="固定小数位数">
          <Stepper precision={2} />
        </Cell>
        <Cell align="center" title="自定义大小">
          <Stepper size="32">
            <Stepper.Button />
            <Stepper.Input disabled width="40" />
            <Stepper.Button />
          </Stepper>
        </Cell>
        <Cell title="圆角风格">
          <Stepper shape="circular" size="22" />
        </Cell>
      </Block>
    </Page>
  )
}

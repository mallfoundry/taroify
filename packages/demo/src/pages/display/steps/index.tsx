import { Button, Steps } from "@taroify/core"
import { ArrowRight } from "@taroify/icons"
import { View } from "@tarojs/components"
import { useState } from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

interface ActiveStepsProps {
  activeStep: number
}

function BasicSteps(props: ActiveStepsProps) {
  return (
    <Block title="基础用法">
      <Steps value={props.activeStep}>
        <Steps.Step>买家下单</Steps.Step>
        <Steps.Step>商家接单</Steps.Step>
        <Steps.Step>买家提货</Steps.Step>
        <Steps.Step>交易完成</Steps.Step>
      </Steps>
    </Block>
  )
}

function AlternativeLabelSteps(props: ActiveStepsProps) {
  return (
    <Block title="下方标签">
      <Steps value={props.activeStep} alternativeLabel>
        <Steps.Step>买家下单</Steps.Step>
        <Steps.Step>商家接单</Steps.Step>
        <Steps.Step>买家提货</Steps.Step>
        <Steps.Step>交易完成</Steps.Step>
      </Steps>
    </Block>
  )
}

function StepsWithCustomStyle(props: ActiveStepsProps) {
  return (
    <Block title="自定义样式">
      <Steps className="custom-color" value={props.activeStep}>
        <Steps.Step icon={<ArrowRight />}>买家下单</Steps.Step>
        <Steps.Step icon={<ArrowRight />}>商家接单</Steps.Step>
        <Steps.Step icon={<ArrowRight />}>买家提货</Steps.Step>
        <Steps.Step icon={<ArrowRight />}>交易完成</Steps.Step>
      </Steps>
    </Block>
  )
}

function VerticalSteps(props: ActiveStepsProps) {
  return (
    <Block title="竖向步骤条">
      <Steps value={props.activeStep} direction="vertical">
        <Steps.Step>
          <View>【城市】物流状态2</View>
          <View>2016-07-12 12:40</View>
        </Steps.Step>
        <Steps.Step>
          <View>【城市】物流状态1</View>
          <View>2016-07-11 10:00</View>
        </Steps.Step>
        <Steps.Step>
          <View>【城市】物流状态</View>
          <View>2016-07-10 12:00</View>
        </Steps.Step>
        <Steps.Step>
          <View>快件已发货</View>
          <View>2016-07-10 09:30</View>
        </Steps.Step>
      </Steps>
    </Block>
  )
}

export default function StepsDemo() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <Page title="Steps 步骤条" className="steps-demo">
      <BasicSteps activeStep={activeStep} />
      <Block className="steps-demo__next-block">
        <Button onClick={() => setActiveStep(activeStep + 1 > 3 ? 0 : activeStep + 1)}>
          下一步
        </Button>
      </Block>
      <AlternativeLabelSteps activeStep={activeStep} />
      <StepsWithCustomStyle activeStep={activeStep} />
      <VerticalSteps activeStep={activeStep} />
    </Page>
  )
}

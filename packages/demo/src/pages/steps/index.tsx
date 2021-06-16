import { Button, Step, Steps } from "@taroify/core"
import { ArrowRight } from "@taroify/icons"
import { View } from "@tarojs/components"
import * as React from "react"
import { useState } from "react"
import Block from "../../components/block"
import Page from "../../components/page"
import "./index.scss"

interface ActiveStepsProps {
  activeStep: number
}

function BasicSteps(props: ActiveStepsProps) {
  return (
    <Block title="基础用法">
      <Steps activeStep={props.activeStep}>
        <Step label="买家下单" />
        <Step label="商家接单" />
        <Step label="买家提货" />
        <Step label="交易完成" />
      </Steps>
    </Block>
  )
}

function AlternativeLabelSteps(props: ActiveStepsProps) {
  return (
    <Block title="下方标签">
      <Steps activeStep={props.activeStep} alternativeLabel>
        <Step label="买家下单" />
        <Step label="商家接单" />
        <Step label="买家提货" />
        <Step label="交易完成" />
      </Steps>
    </Block>
  )
}

function StepsWithCustomStyle(props: ActiveStepsProps) {
  return (
    <Block title="自定义样式">
      <Steps activeStep={props.activeStep} activeColor="#38f">
        <Step label="买家下单" icon={<ArrowRight />} />
        <Step label="商家接单" icon={<ArrowRight />} />
        <Step label="买家提货" icon={<ArrowRight />} />
        <Step label="交易完成" icon={<ArrowRight />} />
      </Steps>
    </Block>
  )
}

function VerticalSteps() {
  return (
    <Block title="竖向步骤条">
      <Steps activeStep={0} direction="vertical">
        <Step>
          <View>【城市】物流状态2</View>
          <View>2016-07-12 12:40</View>
        </Step>
        <Step>
          <View>【城市】物流状态1</View>
          <View>2016-07-11 10:00</View>
        </Step>
        <Step>
          <View>【城市】物流状态</View>
          <View>2016-07-10 12:00</View>
        </Step>
        <Step>
          <View>快件已发货</View>
          <View>2016-07-10 09:30</View>
        </Step>
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
      <VerticalSteps />
    </Page>
  )
}

import { Button, Cell, Tour } from "@taroify/core"
import { View } from "@tarojs/components"
import * as React from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"

import "./index.scss"

function BasicTour() {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <Cell title="新功能">
        <View id="tour-basic-target" className="tour-demo__target">
          <Button size="small" color="primary" onClick={() => setOpen(true)}>
            点击查看
          </Button>
        </View>
      </Cell>
      <Tour
        open={open}
        type="tile"
        placement="bottom-end"
        list={[
          {
            target: "tour-basic-target",
            content: "这里可以快速体验 Taroify 的新功能",
          },
        ]}
        onClose={() => setOpen(false)}
      />
    </>
  )
}

function StepTour() {
  const [open, setOpen] = React.useState(false)
  const steps = [
    {
      target: "tour-step-home",
      content: "从这里回到首页",
      placement: "bottom-start" as const,
    },
    {
      target: "tour-step-category",
      content: "查看所有组件分类",
      placement: "bottom" as const,
    },
    {
      target: "tour-step-user",
      content: "进入个人中心完成设置",
      placement: "bottom-end" as const,
    },
  ]

  return (
    <>
      <View className="tour-demo__steps">
        <View id="tour-step-home" className="tour-demo__step">
          首页
        </View>
        <View id="tour-step-category" className="tour-demo__step">
          分类
        </View>
        <View id="tour-step-user" className="tour-demo__step">
          我的
        </View>
      </View>
      <Button block color="primary" onClick={() => setOpen(true)}>
        开始引导
      </Button>
      <Tour
        open={open}
        title="功能介绍"
        list={steps}
        onClose={() => setOpen(false)}
      />
    </>
  )
}

function CustomTour() {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <Cell title="自定义气泡">
        <View id="tour-custom-target" className="tour-demo__target">
          <Button size="small" onClick={() => setOpen(true)}>
            点击查看
          </Button>
        </View>
      </Cell>
      <Tour
        open={open}
        type="tile"
        placement="bottom-end"
        closeOnOverlayClick={false}
        list={[{ target: "tour-custom-target" }]}
        onClose={() => setOpen(false)}
      >
        <View className="tour-demo__custom">
          <View>欢迎体验全新引导组件</View>
          <View className="tour-demo__known" onClick={() => setOpen(false)}>
            知道了
          </View>
        </View>
      </Tour>
    </>
  )
}

export default function TourDemo() {
  return (
    <Page className="tour-demo" title="Tour 引导">
      <Block title="基础用法">
        <BasicTour />
      </Block>
      <Block title="步骤引导">
        <StepTour />
      </Block>
      <Block title="自定义内容">
        <CustomTour />
      </Block>
    </Page>
  )
}

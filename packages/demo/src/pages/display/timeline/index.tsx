import { Timeline } from "@taroify/core"
import { FireOutlined, SettingOutlined, GiftOutlined } from "@taroify/icons"
import { View } from "@tarojs/components"
import * as React from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

// 双边有内容的
function CustomTimeline() {
  return (
    <Timeline>
      <Timeline.Item>
        <Timeline.Content>
          <View style={{ height: "100px" }}>Taroify</View>
        </Timeline.Content>
        <Timeline.Separator>
          <FireOutlined size={24} />
          <Timeline.Connector />
        </Timeline.Separator>
        <Timeline.Content>
          <View style={{ height: "100px" }}>AM 9:00</View>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Content>
          <View style={{ height: "100px" }}>Taroify</View>
        </Timeline.Content>
        <Timeline.Separator>
          <GiftOutlined size={24} />
          <Timeline.Connector />
        </Timeline.Separator>
        <Timeline.Content>
          <View style={{ height: "100px" }}>AM 9:00</View>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Content>
          <View>Taroify</View>
        </Timeline.Content>
        <Timeline.Separator>
          <GiftOutlined size={24} />
          <Timeline.Connector />
        </Timeline.Separator>
        <Timeline.Content>
          <View >AM 9:00</View>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline>
  )
}

// 交替有内容的
function AlternateTimeline() {
  return (
    <Timeline position="alternate">
      <Timeline.Item>
        <Timeline.Content>
          <View style={{ height: "100px" }}>Taroify</View>
        </Timeline.Content>
        <Timeline.Separator>
          <Timeline.Connector />
          <GiftOutlined size={24} />
          <Timeline.Connector />
        </Timeline.Separator>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Content>
          <View style={{ height: "100px" }}>Taroify</View>
        </Timeline.Content>
        <Timeline.Separator>
          <Timeline.Connector />
          <SettingOutlined size={24} />
          <Timeline.Connector />
        </Timeline.Separator>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Content>
          <View style={{ height: "100px" }}>Taroify</View>
        </Timeline.Content>
        <Timeline.Separator>
          <Timeline.Connector />
          <SettingOutlined size={24} />
          <Timeline.Connector />
        </Timeline.Separator>
      </Timeline.Item>
    </Timeline>
  )
}

// 交替有内容的
function AlternateReverseTimeline() {
  return (
    <Timeline position="alternate-reverse">
      <Timeline.Item icon={<SettingOutlined size={24} />}>
        <Timeline.Content>
          <View style={{ height: "100px" }}>Taroify</View>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item icon={<SettingOutlined size={24} />}>
        <Timeline.Content>
          <View style={{ height: "100px" }}>Taroify</View>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item icon={<FireOutlined size={24} />}>
        <View style={{ height: "100px" }}>Taroify</View>
      </Timeline.Item>
    </Timeline>
  )
}

// 单边有内容的
function LeftTimeline() {
  return (
    <Timeline position="left">
      <Timeline.Item icon={<SettingOutlined size={24} />}>
        <Timeline.Content>
          <View style={{ height: "100px" }}>Taroify</View>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Content>
          <View style={{ height: "100px" }}>Taroify</View>
        </Timeline.Content>
        <Timeline.Separator>
          <Timeline.Connector />
          <SettingOutlined size={24} />
          <Timeline.Connector />
        </Timeline.Separator>
      </Timeline.Item>
    </Timeline>
  )
}

function RightTimeline() {
  return (
    <Timeline position="right">
      <Timeline.Item icon={<SettingOutlined size={24} />}>
        <Timeline.Content>
          <View style={{ height: "100px" }}>Taroify</View>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item icon={<SettingOutlined size={24} />}>
        <Timeline.Content>
          <View style={{ height: "100px" }}>Taroify</View>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Separator>
          <Timeline.Connector />
          <SettingOutlined size={24} />
          <Timeline.Connector />
        </Timeline.Separator>
        <Timeline.Content>
          <View style={{ height: "100px" }}>Taroify</View>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline>
  )
}

export default function TimelineDemo() {
  return (
    <Page title="Timeline 时间轴" className="timeline-demo">
      <Block title="基础用法" className="timeline-block">
        <CustomTimeline />
      </Block>
      <Block title="交替用法" className="timeline-block">
        <AlternateTimeline />
      </Block>
      <Block title="基础用法" className="timeline-block">
        <AlternateReverseTimeline />
      </Block>
      <Block title="左边用法" className="timeline-block">
        <LeftTimeline />
      </Block>
      <Block title="右边用法" className="timeline-block">
        <RightTimeline />
      </Block>
    </Page>
  )
}

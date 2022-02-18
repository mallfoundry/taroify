import { Timeline } from "@taroify/core"
import { SettingOutlined } from "@taroify/icons"
import { Text, View } from "@tarojs/components"
import * as React from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"


function AlternateTimeline() {
  return (
    <Timeline>
      <Timeline.Item>
        <Timeline.Content />
        <Timeline.Separator>
          <Timeline.Connector />
          <SettingOutlined size={24} />
          <Timeline.Connector />
        </Timeline.Separator>
        <Timeline.Content>
          <View>
            You&apos;ve created new branch
            <Text style={{ color: "#1c7ed6" }}>fix-notifications</Text> from master
          </View>
          <View>
            You&apos;ve created new branch
            <Text style={{ color: "#1c7ed6" }}>fix-notifications</Text> from master
          </View>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Content>
          <View>
            You&apos;ve created new branch
            <Text style={{ color: "#1c7ed6" }}>fix-notifications</Text> from master
          </View>
          <View>
            You&apos;ve created new branch
            <Text style={{ color: "#1c7ed6" }}>fix-notifications</Text> from master
          </View>
          <View>
            You&apos;ve created new branch
            <Text style={{ color: "#1c7ed6" }}>fix-notifications</Text> from master
          </View>
          <View>2 hours ago</View>
        </Timeline.Content>
        <Timeline.Separator>
          <Timeline.Connector />
          <SettingOutlined size={24} />
          <Timeline.Connector />
        </Timeline.Separator>
        <Timeline.Content />
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Content />
        <Timeline.Separator>
          <Timeline.Connector />
          <SettingOutlined size={12} />
          <Timeline.Connector />
        </Timeline.Separator>
        <Timeline.Content>
          <View>
            You&apos;ve created new branch
            <Text style={{ color: "#1c7ed6" }}>fix-notifications</Text> from master
          </View>
          <View>2 hours ago</View>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline>
  )
}

function LeftTimeline() {
  return (
    <Timeline>
      <Timeline.Item>
        <Timeline.Separator>
          <Timeline.Connector />
          <SettingOutlined size={24} />
          <Timeline.Connector />
        </Timeline.Separator>
        <Timeline.Content>am 9:00</Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Separator>
          <Timeline.Connector />
          <SettingOutlined size={24} />
          <Timeline.Connector />
        </Timeline.Separator>
        <Timeline.Content>
          <View>
            You&apos;ve created new branch
            <Text style={{ color: "#1c7ed6" }}>fix-notifications</Text> from master
          </View>
          <View>2 hours ago</View>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Separator>
          <Timeline.Connector />
          <SettingOutlined size={24} />
          <Timeline.Connector />
        </Timeline.Separator>
        <Timeline.Content>
          <View>
            You&apos;ve created new branch
            <Text style={{ color: "#1c7ed6" }}>fix-notifications</Text> from master
          </View>
          <View>2 hours ago</View>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline>
  )
}

function RightTimeline() {
  return (
    <Timeline>
      <Timeline.Item>
        <Timeline.Content>am 9:00</Timeline.Content>
        <Timeline.Separator>
          <Timeline.Connector />
          <SettingOutlined size={24} />
          <Timeline.Connector />
        </Timeline.Separator>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Content>
          <View>
            You&apos;ve created new branch
            <Text style={{ color: "#1c7ed6" }}>fix-notifications</Text> from master
          </View>
          <View>2 hours ago</View>
        </Timeline.Content>
        <Timeline.Separator>
          <Timeline.Connector />
          <SettingOutlined size={24} />
          <Timeline.Connector />
        </Timeline.Separator>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Content>
          <View>
            You&apos;ve created new branch
            <Text style={{ color: "#1c7ed6" }}>fix-notifications</Text> from master
          </View>
          <View>2 hours ago</View>
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

export default function TimelineDemo() {
  return (
    <Page title="Timeline 时间轴" className="timeline-demo">
      <Block title="基础用法" className="timeline-block">
        <AlternateTimeline />
      </Block>
      <Block title="靠左用法" className="timeline-block">
        <LeftTimeline />
      </Block>
      <Block title="右边用法" className="timeline-block">
        <RightTimeline />
      </Block>
    </Page>
  )
}

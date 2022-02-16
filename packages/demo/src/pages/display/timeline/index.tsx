import { Timeline } from "@taroify/core"
import { SettingOutlined } from "@taroify/icons"
import { View, Text } from "@tarojs/components"
import * as React from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

export default function TimelineDemo() {
  return (
    <Page title="Timeline 时间轴" className="avatar-demo">
      <Block title="基础用法" className="avatar-block">
        <Timeline>
          <Timeline.Item bullet={<SettingOutlined size={12} />} title="New branch">
            <View>
              You&apos;ve created new branch{" "}
              <Text style={{ color: "#1c7ed6" }}>fix-notifications</Text> from master
            </View>
            <View>2 hours ago</View>
          </Timeline.Item>
          <Timeline.Item bullet={<SettingOutlined size={12} />} title="New branch">
            <View>
              You&apos;ve created new branch{" "}
              <Text style={{ color: "#1c7ed6" }}>fix-notifications</Text> from master
            </View>
            <View>2 hours ago</View>
          </Timeline.Item>
          <Timeline.Item bullet={<SettingOutlined size={12} />} title="New branch">
            <View>
              You&apos;ve created new branch{" "}
              <Text style={{ color: "#1c7ed6" }}>fix-notifications</Text> from master
            </View>
            <View>2 hours ago</View>
          </Timeline.Item>
        </Timeline>
      </Block>
    </Page>
  )
}

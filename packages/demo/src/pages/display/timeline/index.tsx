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
        <Timeline active={2}>
          <Timeline.Item>
            <Timeline.Line>
              <SettingOutlined size={12} />
            </Timeline.Line>
            <Timeline.Content algin="right">am 9:00</Timeline.Content>
          </Timeline.Item>
          <Timeline.Item>
            <Timeline.Content algin="left">
              <View>
                You&apos;ve created new branch
                <Text style={{ color: "#1c7ed6" }}>fix-notifications</Text> from master
              </View>
              <View>2 hours ago</View>
            </Timeline.Content>
            <Timeline.Line>
              <SettingOutlined size={12} />
            </Timeline.Line>
          </Timeline.Item>
          <Timeline.Item>
            <Timeline.Content algin="right">
              <View>
                You&apos;ve created new branch
                <Text style={{ color: "#1c7ed6" }}>fix-notifications</Text> from master
              </View>
              <View>2 hours ago</View>
            </Timeline.Content>
            <Timeline.Line>
              <SettingOutlined size={12} />
            </Timeline.Line>
          </Timeline.Item>
        </Timeline>
      </Block>
      <Block title="靠左用法" className="avatar-block">
        <Timeline active={2} algin="left">
          <Timeline.Item>
            <Timeline.Line>
              <SettingOutlined size={12} />
            </Timeline.Line>

            <Timeline.Content>am 9:00</Timeline.Content>
          </Timeline.Item>
          <Timeline.Item>
            <Timeline.Line>
              <SettingOutlined size={12} />
            </Timeline.Line>
            <Timeline.Content>
              <View>
                You&apos;ve created new branch
                <Text style={{ color: "#1c7ed6" }}>fix-notifications</Text> from master
              </View>
              <View>2 hours ago</View>
            </Timeline.Content>
          </Timeline.Item>
          <Timeline.Item>
            <Timeline.Line>
              <SettingOutlined size={12} />
            </Timeline.Line>
            <Timeline.Content>
              <View>
                You&apos;ve created new branch
                <Text style={{ color: "#1c7ed6" }}>fix-notifications</Text> from master
              </View>
              <View>2 hours ago</View>
            </Timeline.Content>
          </Timeline.Item>
        </Timeline>
      </Block>
      <Block title="右边用法" className="avatar-block">
        <Timeline active={2} algin="right">
          <Timeline.Item>
            <Timeline.Line>
              <SettingOutlined size={12} />
            </Timeline.Line>
            <Timeline.Content algin="right">am 9:00</Timeline.Content>
          </Timeline.Item>
          <Timeline.Item>
            <Timeline.Line>
              <SettingOutlined size={12} />
            </Timeline.Line>
            <Timeline.Content algin="right">
              <View>
                You&apos;ve created new branch
                <Text style={{ color: "#1c7ed6" }}>fix-notifications</Text> from master
              </View>
              <View>2 hours ago</View>
            </Timeline.Content>
          </Timeline.Item>
          <Timeline.Item>
            <Timeline.Line>
              <SettingOutlined size={12} />
            </Timeline.Line>
            <Timeline.Content algin="right">
              <View>
                You&apos;ve created new branch
                <Text style={{ color: "#1c7ed6" }}>fix-notifications</Text> from master
              </View>
              <View>2 hours ago</View>
            </Timeline.Content>
          </Timeline.Item>
        </Timeline>
      </Block>
    </Page>
  )
}

import { Timeline } from "@taroify/core"
import { SettingOutlined } from "@taroify/icons"
import { View, Text } from "@tarojs/components"
import * as React from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

export default function TimelineDemo() {
  return (
    <Page title="Timeline 时间轴" className="timeline-demo">
      <Block title="基础用法" className="timeline-block">
        <Timeline tail>
          <Timeline.Item>
            <Timeline.Content />
            <Timeline.Separator  borderStyle="dashed" lineSize={2} bulletBorder={1} color="#1c7ed6">
              <SettingOutlined size={12} />
            </Timeline.Separator>
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
            <Timeline.Separator  borderStyle="dashed" lineSize={2} bulletBorder={1} color="#1c7ed6">
              <SettingOutlined size={12} />
            </Timeline.Separator>
            <Timeline.Content />
          </Timeline.Item>
          <Timeline.Item>
            <Timeline.Content >
              <View>
                You&apos;ve created new branch
                <Text style={{ color: "#1c7ed6" }}>fix-notifications</Text> from master
              </View>
              <View>2 hours ago</View>
            </Timeline.Content>
            <Timeline.Separator borderStyle="dashed" lineSize={2} bulletBorder={1}>
              <SettingOutlined size={12} />
            </Timeline.Separator>
            <Timeline.Content />
          </Timeline.Item>
        </Timeline>
      </Block>
      <Block title="靠左用法" className="timeline-block">
        <Timeline>
          <Timeline.Item>
            <Timeline.Separator>
              <SettingOutlined size={12} />
            </Timeline.Separator>
            <Timeline.Content>am 9:00</Timeline.Content>
          </Timeline.Item>
          <Timeline.Item>
            <Timeline.Separator>
              <SettingOutlined size={12} />
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
              <SettingOutlined size={12} />
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
      </Block>
      <Block title="右边用法" className="timeline-block">
        <Timeline>
          <Timeline.Item>
            <Timeline.Content>am 9:00</Timeline.Content>
            <Timeline.Separator>
              <SettingOutlined size={12} />
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
              <SettingOutlined size={12} />
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
              <SettingOutlined size={12} />
            </Timeline.Separator>
          </Timeline.Item>
        </Timeline>
      </Block>
      <Block title="两边都有" className="timeline-block">
        <Timeline>
          <Timeline.Item>
            <Timeline.Content algin="left">
              <View>
                You&apos;ve created new branch
                <Text style={{ color: "#1c7ed6" }}>fix-notifications</Text> from master
              </View>
              <View>2 hours ago</View>
            </Timeline.Content>
            <Timeline.Separator>
              <SettingOutlined size={12} />
            </Timeline.Separator>
            <Timeline.Content algin="right">am 9:00</Timeline.Content>
          </Timeline.Item>
          <Timeline.Item>
            <Timeline.Content algin="left">am 9:00</Timeline.Content>
            <Timeline.Separator>
              <SettingOutlined size={12} />
            </Timeline.Separator>
            <Timeline.Content algin="right">
              <View>
                You&apos;ve created new branch
                <Text style={{ color: "#1c7ed6" }}>fix-notifications</Text> from master
              </View>
              <View>2 hours ago</View>
            </Timeline.Content>
          </Timeline.Item>
          <Timeline.Item>
            <Timeline.Content algin="left">am 9:00</Timeline.Content>
            <Timeline.Separator>
              <SettingOutlined size={12} />
            </Timeline.Separator>
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

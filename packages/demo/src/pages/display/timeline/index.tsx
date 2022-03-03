import { Timeline } from "@taroify/core"
import { FireOutlined, GemOutlined, SmileOutlined, StarOutlined } from "@taroify/icons"
import { View } from "@tarojs/components"
import Block from "../../../components/block"
import Page from "../../../components/page"
import { demoPrefixClassname } from "../../../styles/prefix"
import "./index.scss"

function RightTimeline() {
  return (
    <Timeline position="right">
      <Timeline.Item>Eat</Timeline.Item>
      <Timeline.Item>Code</Timeline.Item>
      <Timeline.Item>Sleep</Timeline.Item>
    </Timeline>
  )
}

function LeftTimeline() {
  return (
    <Timeline position="left">
      <Timeline.Item>Eat</Timeline.Item>
      <Timeline.Item>Code</Timeline.Item>
      <Timeline.Item>Sleep</Timeline.Item>
    </Timeline>
  )
}

function AlternateTimeline() {
  return (
    <Timeline position="alternate">
      <Timeline.Item>Eat</Timeline.Item>
      <Timeline.Item>Code</Timeline.Item>
      <Timeline.Item>Sleep</Timeline.Item>
      <Timeline.Item>Repeat</Timeline.Item>
    </Timeline>
  )
}

function OutlinedTimeline() {
  return (
    <Timeline position="alternate">
      <Timeline.Item dot={{ variant: "outlined" }}>Eat</Timeline.Item>
      <Timeline.Item dot={{ variant: "outlined", color: "primary" }}>Code</Timeline.Item>
      <Timeline.Item dot={{ variant: "outlined", color: "danger" }}>Sleep</Timeline.Item>
      <Timeline.Item dot={{ variant: "outlined" }}>Repeat</Timeline.Item>
    </Timeline>
  )
}

function CustomTimeline() {
  return (
    <Timeline>
      <Timeline.Item>
        <Timeline.Content align="center">9:30 am</Timeline.Content>
        <Timeline.Separator>
          <Timeline.Connector />
          <Timeline.Dot>
            <FireOutlined size="24" />
          </Timeline.Dot>
          <Timeline.Connector />
        </Timeline.Separator>
        <Timeline.Content direction="column" align="start">
          <View className="timeline-title">Eat</View>
          <View>Because you need strength</View>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Content direction="column" align="end">
          <View className="timeline-title">Code</View>
          <View>awesome</View>
        </Timeline.Content>
        <Timeline.Separator>
          <Timeline.Connector />
          <Timeline.Dot color="primary">
            <StarOutlined size="24" />
          </Timeline.Dot>
          <Timeline.Connector />
        </Timeline.Separator>
        <Timeline.Content align="center">10:00 am</Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Content />
        <Timeline.Separator>
          <Timeline.Connector />
          <Timeline.Dot variant="outlined" color="primary">
            <GemOutlined size="24" />
          </Timeline.Dot>
          <Timeline.Connector />
        </Timeline.Separator>
        <Timeline.Content direction="column" align="start">
          <View className="timeline-title">Sleep</View>
          <View>Because you need rest</View>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Content direction="column" align="end">
          <View className="timeline-title">Repeat</View>
          <View>you love!</View>
        </Timeline.Content>
        <Timeline.Separator>
          <Timeline.Connector />
          <Timeline.Dot color="danger">
            <SmileOutlined size="24" />
          </Timeline.Dot>
          <Timeline.Connector />
        </Timeline.Separator>
      </Timeline.Item>
    </Timeline>
  )
}

export default function TimelineDemo() {
  return (
    <Page title="Timeline 时间轴" className="timeline-demo">
      <Block title="基础用法">
        <View style={{ width: "calc(50% - 12px)" }} />
        <View className={demoPrefixClassname("timeline-block")}>
          <RightTimeline />
        </View>
      </Block>
      <Block title="左边用法">
        <View className={demoPrefixClassname("timeline-block")}>
          <LeftTimeline />
        </View>
        <View className={demoPrefixClassname("timeline-block")} />
      </Block>
      <Block title="交替用法">
        <View style={{ width: "calc(100% - 12px)" }}>
          <AlternateTimeline />
        </View>
      </Block>
      <Block title="描边用法">
        <View style={{ width: "calc(100% - 12px)" }}>
          <OutlinedTimeline />
        </View>
      </Block>
      <Block title="自定义用法">
        <View style={{ width: "calc(100% - 12px)" }}>
          <CustomTimeline />
        </View>
      </Block>
    </Page>
  )
}

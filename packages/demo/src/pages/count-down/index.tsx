import { CountDown, Grid, Toast } from "@taroify/core"
import { useCountDown } from "@taroify/core/count-down"
import { PauseCircleOutlined, PlayCircleOutlined, Replay } from "@taroify/icons"
import { View } from "@tarojs/components"
import * as React from "react"
import { useState } from "react"
import Block from "../../components/block"
import Page from "../../components/page"
import "./index.scss"

function BasicCountDown() {
  const { current } = useCountDown({ autostart: true, time: 30 * 60 * 60 * 1000 })
  return (
    <Block title="基础用法">
      <CountDown current={current} />
    </Block>
  )
}

function CountDownWithCustomFormatter() {
  const { current } = useCountDown({ autostart: true, time: 30 * 60 * 60 * 1000 })
  return (
    <Block title="自定义格式">
      <CountDown current={current} format="DD 天 HH 时 mm 分 ss 秒" />
    </Block>
  )
}

function MillisecondCountDown() {
  const { current } = useCountDown({
    autostart: true,
    millisecond: true,
    time: 30 * 60 * 60 * 1000,
  })
  return (
    <Block title="毫秒级渲染">
      <CountDown current={current} format="HH:mm:ss:SS" />
    </Block>
  )
}

function CountDownWithCustomStyle() {
  const { current } = useCountDown({
    millisecond: true,
    time: 30 * 60 * 60 * 1000,
  })
  return (
    <Block title="自定义样式">
      <CountDown>
        <View className="block">{current.hours}</View>
        <View className="colon">:</View>
        <View className="block">{current.minutes}</View>
        <View className="colon">:</View>
        <View className="block">{current.seconds}</View>
      </CountDown>
    </Block>
  )
}

function ManualControlCountDown() {
  const [toastOpen, setToastOpen] = useState(false)
  const { current, start, pause, reset } = useCountDown({
    autostart: false,
    millisecond: true,
    time: 3000,
    onFinish: () => setToastOpen(true),
  })
  return (
    <Block className="manual-control" title="手动控制">
      <Toast open={toastOpen} onClose={() => setToastOpen(false)}>
        倒计时结束
      </Toast>
      <CountDown current={current} format="ss:SSS" />
      <Grid columns={3} clickable>
        <Grid.Item icon={<PlayCircleOutlined />} text="开始" onClick={start} />
        <Grid.Item icon={<PauseCircleOutlined />} text="暂停" onClick={pause} />
        <Grid.Item icon={<Replay />} text="重置" onClick={() => reset()} />
      </Grid>
    </Block>
  )
}

export default function CountDownDemo() {
  return (
    <Page title="CountDown 倒计时" className="count-down-demo">
      <BasicCountDown />
      <CountDownWithCustomFormatter />
      <MillisecondCountDown />
      <CountDownWithCustomStyle />
      <ManualControlCountDown />
    </Page>
  )
}

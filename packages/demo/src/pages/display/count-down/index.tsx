import { CountDown, Grid, Toast } from "@taroify/core"
import { PauseCircleOutlined, PlayCircleOutlined, Replay } from "@taroify/icons"
import { View } from "@tarojs/components"
import { CountDownInstance } from "packages/core/src/count-down/count-down"
import * as React from "react"
import { useRef, useState } from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

function BasicCountDown() {
  return (
    <Block title="基础用法">
      <CountDown time={30 * 60 * 60 * 1000} />
    </Block>
  )
}

function CountDownWithCustomFormatter() {
  return (
    <Block title="自定义格式">
      <CountDown time={30 * 60 * 60 * 1000} format="DD 天 HH 时 mm 分 ss 秒" />
    </Block>
  )
}

function MillisecondCountDown() {
  return (
    <Block title="毫秒级渲染">
      <CountDown millisecond time={30 * 60 * 60 * 1000} format="HH:mm:ss:SS" />
    </Block>
  )
}

function CountDownWithCustomStyle() {
  return (
    <Block title="自定义样式">
      <CountDown millisecond time={30 * 60 * 60 * 1000}>
        {(current) => (
          <>
            <View className="block">{current.hours}</View>
            <View className="colon">:</View>
            <View className="block">{current.minutes}</View>
            <View className="colon">:</View>
            <View className="block">{current.seconds}</View>
          </>
        )}
      </CountDown>
    </Block>
  )
}

function ManualControlCountDown() {
  const countRef = useRef<CountDownInstance>(null)
  const [toastOpen, setToastOpen] = useState(false)
  return (
    <Block className="manual-control" title="手动控制">
      <Toast open={toastOpen} onClose={() => setToastOpen(false)}>
        倒计时结束
      </Toast>
      <CountDown
        ref={countRef}
        onFinish={() => {
          setToastOpen(true)
        }}
        time={30000}
        format="ss:SSS"
      />
      <Grid columns={3} clickable>
        <Grid.Item
          icon={<PlayCircleOutlined />}
          text="开始"
          onClick={() => countRef.current?.start()}
        />
        <Grid.Item
          icon={<PauseCircleOutlined />}
          text="暂停"
          onClick={() => countRef.current?.pause()}
        />
        <Grid.Item icon={<Replay />} text="重置" onClick={() => countRef.current?.reset()} />
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

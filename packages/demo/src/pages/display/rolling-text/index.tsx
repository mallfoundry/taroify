import { useRef } from "react";
import { View } from "@tarojs/components"
import { RollingText, Button } from "@taroify/core"
import type { RollingTextRef } from "@taroify/core/rolling-text"
import Page from "../../../components/page"
import Block from "../../../components/block"
import "./index.scss"


function BasicRollingText() {
  const ref = useRef<RollingTextRef>()

  const onClick = () => {
    ref.current?.start();
  }

  return (
    <View>
      <RollingText ref={ref} targetNum={123} autoStart={false} />
      <View className="rolling-text-btn">
        <Button color="primary" onClick={onClick}>向下翻滚</Button>
      </View>
    </View>
  )
}

function SetDirectionRollingText() {
  const ref = useRef<RollingTextRef>()

  const onClick = () => {
    ref.current?.start();
  }

  return (
    <View>
      <RollingText ref={ref} targetNum={432} autoStart={false} direction="up" />
      <View className="rolling-text-btn">
        <Button color="primary" onClick={onClick}>向上翻滚</Button>
      </View>
    </View>
  )
}

function StopOrderRollingText() {
  const ref = useRef<RollingTextRef>()

  const onClick = () => {
    ref.current?.start();
  }

  return (
    <View>
      <RollingText ref={ref} targetNum={54321} autoStart={false} stopOrder="rtl" />
      <View className="rolling-text-btn">
        <Button color="primary" onClick={onClick}>从个位停止</Button>
      </View>
    </View>
  )
}

const textList = [
  "aaaaa",
  "bbbbb",
  "ccccc",
  "ddddd",
  "eeeee",
  "fffff",
  "ggggg",
]

function TextListRollingText() {
  const ref = useRef<RollingTextRef>()

  const onClick = () => {
    ref.current?.start();
  }

  return (
    <View>
      <RollingText ref={ref} textList={textList} duration={1} autoStart={false} />
      <View className="rolling-text-btn">
        <Button color="primary" onClick={onClick}>开始</Button>
      </View>
    </View>
  )
}

function CustomerRollingText() {
  const ref = useRef<RollingTextRef>()

  const onClick = () => {
    ref.current?.start();
  }

  return (
    <View>
      <RollingText ref={ref} className="my-rolling-text" height={54} startNum={12345} targetNum={54321} autoStart={false} />
      <View className="rolling-text-btn">
        <Button color="primary" onClick={onClick}>开始</Button>
      </View>
    </View>
  )
}

function HandRollingText() {
  const ref = useRef<RollingTextRef>()

  const start = () => {
    ref.current?.start();
  }

  const reset = () => {
    ref.current?.reset();
  }

  return (
    <View>
      <RollingText ref={ref} className="my-rolling-text" height={54} startNum={0} targetNum={54321} autoStart={false} />
      <View className="rolling-text-btn">
        <Button color="primary" onClick={start}>开始</Button>
        <Button color="primary" className="rolling-text-right" onClick={reset}>重置</Button>
      </View>
    </View>
  )
}

export default function RollingTextDemo() {
  return (
    <Page title="RollingText 翻滚文本动效" className="rolling-text">
      <Block title="基础用法">
        <BasicRollingText />
      </Block>
      <Block title="设置翻滚方向">
        <SetDirectionRollingText />
      </Block>
      <Block title="设置各数位停止顺序">
        <StopOrderRollingText />
      </Block>
      <Block title="翻转非数字内容">
        <TextListRollingText />
      </Block>
      <Block title="自定义样式">
        <CustomerRollingText />
      </Block>
      <Block title="手动控制">
        <HandRollingText />
      </Block>
    </Page>
  )
}

import { Button, Sticky } from "@taroify/core"
import { View } from "@tarojs/components"
import { useRef } from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

function BasicSticky() {
  return (
    <Block title="基础用法">
      <Sticky>
        <Button color="primary">基础用法</Button>
      </Sticky>
    </Block>
  )
}

function OffsetSticky() {
  return (
    <Block title="吸顶距离" className="sticky-demo__offset-sticky">
      <Sticky offsetTop={50}>
        <Button color="primary">吸顶距离</Button>
      </Sticky>
    </Block>
  )
}

function StickyWithContainer() {
  const container = useRef()
  return (
    <Block title="指定容器">
      <View className="sticky-demo__container-sticky" ref={container}>
        <Sticky container={container}>
          <Button color="warning">指定容器</Button>
        </Sticky>
      </View>
    </Block>
  )
}

function BottomSticky() {
  return (
    <Block title="吸底距离" className="sticky-demo__bottom-sticky">
      <View className="sticky-demo__bottom-sticky__padding" />
      <Sticky position="bottom" offsetBottom={50}>
        <Button color="primary">吸底距离</Button>
      </Sticky>
      <View className="sticky-demo__bottom-sticky__padding" />
    </Block>
  )
}

export default function StickyDemo() {
  return (
    <Page title="Sticky 粘性布局" className="sticky-demo">
      <BasicSticky />
      <OffsetSticky />
      <StickyWithContainer />
      <BottomSticky />
    </Page>
  )
}

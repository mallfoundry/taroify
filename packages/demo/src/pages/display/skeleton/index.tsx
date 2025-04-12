import { useState } from "react"
import { View, Image } from "@tarojs/components"
import { Skeleton, Switch, Flex } from "@taroify/core"
import Block from "../../../components/block"
import Page from "../../../components/page"

import "./index.scss"

function BasicSkeleton() {
  return (
    <Block title="基础用法">
      <Skeleton title row={3} />
    </Block>
  )
}

function AvatarSkeleton() {
  return (
    <Block title="显示头像">
      <Skeleton title avatar row={3} />
    </Block>
  )
}

function LoadingSkeleton() {
  const [loading, setLoading] = useState(true)

  return (
    <Block title="显示子组件">
      <Switch checked={loading} onChange={setLoading} size={24} className="demo-switch" />
      <Skeleton title avatar row={3} loading={loading}>
        <Flex className="demo-preview">
          <Image src="https://img.yzcdn.cn/vant/logo.png" className="demo-image" />
          <View>
            <View className="demo-title">关于 Taroify</View>
            <View className="demo-content">
              <View>Taroify 是移动端组件库 Vant 的 Taro React 版本。</View>
              <View>两者基于相同的视觉规范，提供近似一致的 API 接口，助力开发者快速搭建小程序应用。</View>
            </View>
          </View>
        </Flex>
      </Skeleton>
    </Block>
  )
}

function CustomSkeleton() {
  return (
    <Block title="自定义展示内容">
      <Skeleton
        template={
          <View style={{ display: "flex", width: "100%" }}>
            <Skeleton.Image />
            <View
              style={{ flex: 1, marginLeft: 16 }}
            >
              <Skeleton.Paragraph rowWidth="60%" />
              <Skeleton.Paragraph />
              <Skeleton.Paragraph />
              <Skeleton.Paragraph />
              <Skeleton.Paragraph />
              <Skeleton.Paragraph />
            </View>
          </View>
        }
      />
    </Block>
  )
}

export default function SkeletonDemo() {
  return (
    <Page title="Skeleton 骨架屏" className="skeleton-demo">
      <BasicSkeleton />
      <AvatarSkeleton />
      <LoadingSkeleton />
      <CustomSkeleton />
    </Page>
  )
}

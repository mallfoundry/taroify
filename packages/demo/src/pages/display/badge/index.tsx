import { Badge } from "@taroify/core"
import { Cross, Down, Success } from "@taroify/icons"
import { View } from "@tarojs/components"
import * as React from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

export default function BadgeDemo() {
  return (
    <Page title="Badge 徽标" className="badge-demo">
      <Block title="基础用法">
        <Badge content={5}>
          <View className="badge-block" />
        </Badge>
        <Badge content="10">
          <View className="badge-block" />
        </Badge>
        <Badge content="Hot">
          <View className="badge-block" />
        </Badge>
        <Badge dot>
          <View className="badge-block" />
        </Badge>
      </Block>
      <Block title="最大值">
        <Badge content={10} max={9}>
          <View className="badge-block" />
        </Badge>
        <Badge content={21} max={20}>
          <View className="badge-block" />
        </Badge>
        <Badge content={100} max={99}>
          <View className="badge-block" />
        </Badge>
      </Block>
      <Block title="自定义颜色">
        <Badge className="custom-color" content={5}>
          <View className="badge-block" />
        </Badge>
        <Badge className="custom-color" content={10}>
          <View className="badge-block" />
        </Badge>
        <Badge className="custom-color" content="Hot">
          <View className="badge-block" />
        </Badge>
        <Badge className="custom-color" dot>
          <View className="badge-block" />
        </Badge>
      </Block>
      <Block title="自定义徽标内容">
        <Badge content={<Success className="badge-icon" />}>
          <View className="badge-block" />
        </Badge>
        <Badge content={<Cross className="badge-icon" />}>
          <View className="badge-block" />
        </Badge>
        <Badge content={<Down className="badge-icon" />}>
          <View className="badge-block" />
        </Badge>
      </Block>
      <Block title="独立展示" className="independent-badges">
        <Badge content="20" />
        <Badge content={100} max={99} />
      </Block>
    </Page>
  )
}

import { Avatar, Badge } from "@taroify/core"
import { Cross, LocationOutlined, SettingOutlined } from "@taroify/icons"
import { View } from "@tarojs/components"
import * as React from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

export default function AvatarDemo() {
  return (
    <Page title="Avatar 头像" className="avatar-demo">
      <Block title="基础用法" className="avatar-block">
        <Avatar>P</Avatar>
        <Avatar style={{ background: "green" }}>N</Avatar>
        <Avatar style={{ background: "pink" }}>HP</Avatar>
      </Block>
      <Block title="尺寸" className="avatar-block">
        <Avatar src="https://img01.yzcdn.cn/vant/cat.jpeg" size="mini" />
        <Avatar src="https://img01.yzcdn.cn/vant/cat.jpeg" size="small" />
        <Avatar src="https://img01.yzcdn.cn/vant/cat.jpeg" size="medium" />
        <Avatar src="https://img01.yzcdn.cn/vant/cat.jpeg" size="large" />
      </Block>
      <Block title="形状" className="avatar-block">
        <Avatar src="https://img01.yzcdn.cn/vant/cat.jpeg" />
        <Avatar src="https://img01.yzcdn.cn/vant/cat.jpeg" shape="square" />
        <Avatar src="https://img01.yzcdn.cn/vant/cat.jpeg" shape="rounded" />
      </Block>
      <Block title="群组" className="avatar-block">
        <Avatar.Group limit={5}>
          <Avatar src="https://img01.yzcdn.cn/vant/cat.jpeg" />
          <Avatar src="https://img01.yzcdn.cn/vant/cat.jpeg" />
          <Avatar src="https://img01.yzcdn.cn/vant/cat.jpeg" />
          <Avatar src="https://img01.yzcdn.cn/vant/cat.jpeg" />
          <Avatar src="https://img01.yzcdn.cn/vant/cat.jpeg" />
          <Avatar src="https://img01.yzcdn.cn/vant/cat.jpeg" />
        </Avatar.Group>
      </Block>
      <Block title="最大" className="avatar-block">
        <Avatar.Group limit={3}>
          <View>sdafjal</View>
          <Avatar src="https://img01.yzcdn.cn/vant/cat.jpeg" />
          <Avatar src="https://img01.yzcdn.cn/vant/cat.jpeg" />
          <Avatar src="https://img01.yzcdn.cn/vant/cat.jpeg" />
          <Avatar src="https://img01.yzcdn.cn/vant/cat.jpeg" />
          <Avatar src="https://img01.yzcdn.cn/vant/cat.jpeg" />
          <Avatar src="https://img01.yzcdn.cn/vant/cat.jpeg" />
        </Avatar.Group>
      </Block>
      <Block title="图标" className="avatar-block">
        <Avatar style={{ background: "red" }}>
          <Cross />
        </Avatar>
        <Avatar style={{ background: "pink" }}>
          <LocationOutlined />
        </Avatar>
        <Avatar style={{ background: "green" }}>
          <SettingOutlined />
        </Avatar>
      </Block>
      <Block title="徽章用法" className="avatar-block">
        <Badge className="avatar-dot" dot position="bottom-right">
          <Avatar src="https://img01.yzcdn.cn/vant/cat.jpeg" />
        </Badge>
        <Badge
          className="avatar-avatar"
          content={<Avatar size="mini" src="https://img01.yzcdn.cn/vant/cat.jpeg" />}
          position="bottom-right"
        >
          <Avatar src="https://img01.yzcdn.cn/vant/cat.jpeg" />
        </Badge>
      </Block>
    </Page>
  )
}

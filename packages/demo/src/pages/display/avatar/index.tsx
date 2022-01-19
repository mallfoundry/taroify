import { Avatar, Badge } from "@taroify/core"
import { Cross, LocationOutlined, SettingOutlined } from "@taroify/icons"
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
        <Avatar src="https://joeschmoe.io/api/v1/1" size="mini" />
        <Avatar src="https://joeschmoe.io/api/v1/2" size="small" />
        <Avatar src="https://joeschmoe.io/api/v1/3" size="medium" />
        <Avatar src="https://joeschmoe.io/api/v1/4" size="large" />
      </Block>
      <Block title="形状" className="avatar-block">
        <Avatar src="https://joeschmoe.io/api/v1/1" />
        <Avatar src="https://joeschmoe.io/api/v1/2" shape="square" />
        <Avatar src="https://joeschmoe.io/api/v1/3" shape="rounded" />
      </Block>
      <Block title="群组" className="avatar-block">
        <Avatar.Group limit={5}>
          <Avatar src="https://joeschmoe.io/api/v1/1" />
          <Avatar src="https://joeschmoe.io/api/v1/2" />
          <Avatar src="https://joeschmoe.io/api/v1/3" />
          <Avatar src="https://joeschmoe.io/api/v1/4" />
          <Avatar src="https://joeschmoe.io/api/v1/5" />
          <Avatar src="https://joeschmoe.io/api/v1/6" />
        </Avatar.Group>
      </Block>
      <Block title="最大" className="avatar-block">
        <Avatar.Group limit={3}>
          <Avatar src="https://joeschmoe.io/api/v1/1" />
          <Avatar src="https://joeschmoe.io/api/v1/2" />
          <Avatar src="https://joeschmoe.io/api/v1/3" />
          <Avatar src="https://joeschmoe.io/api/v1/4" />
          <Avatar src="https://joeschmoe.io/api/v1/5" />
          <Avatar src="https://joeschmoe.io/api/v1/6" />
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
          <Avatar src="https://joeschmoe.io/api/v1/1" />
        </Badge>
        <Badge
          className="avatar-avatar"
          content={<Avatar src="https://joeschmoe.io/api/v1/2" />}
          position="bottom-right"
        >
          <Avatar src="https://joeschmoe.io/api/v1/female/3" />
        </Badge>
      </Block>
    </Page>
  )
}

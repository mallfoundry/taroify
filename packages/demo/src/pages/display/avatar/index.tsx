import { Avatar, Badge } from "@taroify/core"
import * as React from "react"
import { Cross, SettingOutlined, LocationOutlined } from "@taroify/icons"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

export default function AvatarDemo() {
  return (
    <Page title="Avatar 头像" className="avatar-demo">
      <Block title="基础用法" className="avatar-block">
        <Avatar>P</Avatar>
        <Avatar sx={{ background: "green" }}>N</Avatar>
        <Avatar sx={{ background: "pink" }}>HP</Avatar>
      </Block>

      <Block title="尺寸" className="avatar-block">
        <Avatar
          src="https://mui.com/static/images/avatar/1.jpg"
          sx={{ width: 24, height: 24 }}
        ></Avatar>
        <Avatar
          src="https://mui.com/static/images/avatar/1.jpg"
          sx={{ width: 36, height: 36 }}
        ></Avatar>
        <Avatar
          src="https://mui.com/static/images/avatar/1.jpg"
          sx={{ width: 48, height: 48 }}
        ></Avatar>
      </Block>
      <Block title="形状" className="avatar-block">
        <Avatar src="https://mui.com/static/images/avatar/1.jpg"></Avatar>
        <Avatar src="https://mui.com/static/images/avatar/1.jpg" variant="square"></Avatar>
        <Avatar src="https://mui.com/static/images/avatar/1.jpg" variant="rounded"></Avatar>
      </Block>
      <Block title="群组" className="avatar-block">
        <Avatar.Group total={24} spacing={6}>
          <Avatar src="https://mui.com/static/images/avatar/1.jpg"></Avatar>
          <Avatar src="https://mui.com/static/images/avatar/2.jpg"></Avatar>
          <Avatar src="https://mui.com/static/images/avatar/3.jpg"></Avatar>
          <Avatar src="https://mui.com/static/images/avatar/2.jpg"></Avatar>
          <Avatar src="https://mui.com/static/images/avatar/3.jpg"></Avatar>
        </Avatar.Group>
      </Block>
      <Block title="最大" className="avatar-block">
        <Avatar.Group max={3} spacing={6}>
          <Avatar src="https://mui.com/static/images/avatar/1.jpg"></Avatar>
          <Avatar src="https://mui.com/static/images/avatar/2.jpg"></Avatar>
          <Avatar src="https://mui.com/static/images/avatar/3.jpg"></Avatar>
          <Avatar src="https://mui.com/static/images/avatar/2.jpg"></Avatar>
          <Avatar src="https://mui.com/static/images/avatar/3.jpg"></Avatar>
        </Avatar.Group>
      </Block>
      <Block title="图标" className="avatar-block">
        <Avatar sx={{ background: "red" }}>
          <Cross />
        </Avatar>
        <Avatar sx={{ background: "pink" }}>
          <LocationOutlined />
        </Avatar>
        <Avatar sx={{ background: "green" }}>
          <SettingOutlined />
        </Avatar>
      </Block>
      <Block title="徽章用法" className="avatar-block">
        <Badge content={<Cross />} position="bottom-right">
          <Avatar src="https://mui.com/static/images/avatar/1.jpg"></Avatar>
        </Badge>
        <Badge
          content={<SettingOutlined></SettingOutlined>}
          position="bottom-right"
        >
          <Avatar src="https://mui.com/static/images/avatar/1.jpg"></Avatar>
        </Badge>
      </Block>
    </Page>
  )
}

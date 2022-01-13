import { Avatar } from "@taroify/core"
import * as React from "react"
import { Cross, SettingOutlined, LocationOutlined } from "@taroify/icons"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

export default function AvatarDemo() {
  return (
    <Page title="Avatar 头像" className="Avatar-demo">
      <Block title="基础用法">
        <Avatar>P</Avatar>
        <Avatar sx={{ background: "green" }}>N</Avatar>
        <Avatar sx={{ background: "pink" }}>HP</Avatar>
      </Block>
      <Block title="图片">
        <Avatar.Group  total={24} spacing={6}>
          <Avatar src="https://mui.com/static/images/avatar/1.jpg"></Avatar>
          <Avatar src="https://mui.com/static/images/avatar/2.jpg"></Avatar>
          <Avatar src="https://mui.com/static/images/avatar/3.jpg"></Avatar>
          <Avatar src="https://mui.com/static/images/avatar/2.jpg"></Avatar>
          <Avatar src="https://mui.com/static/images/avatar/3.jpg"></Avatar>
        </Avatar.Group>
      </Block>
      <Block title="尺寸">
        <Avatar
          src="https://mui.com/static/images/avatar/1.jpg"
          sx={{ width: 24, height: 24 }}
        ></Avatar>
        <Avatar
          src="https://mui.com/static/images/avatar/1.jpg"
          sx={{ width: 36, height:36 }}
        ></Avatar>
        <Avatar
          src="https://mui.com/static/images/avatar/1.jpg"
          sx={{ width: 48, height: 48 }}
        ></Avatar>
      </Block>
      <Block title="形状">
        <Avatar src="https://mui.com/static/images/avatar/1.jpg"></Avatar>
        <Avatar src="https://mui.com/static/images/avatar/1.jpg" variant="square"></Avatar>
        <Avatar src="https://mui.com/static/images/avatar/1.jpg" variant="rounded"></Avatar>
      </Block>
      <Block title="图标">
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
      {/* <Block title="徽章用法">
        <Badge content={10} position="bottom-right">
          <Avatar src="https://mui.com/static/images/avatar/1.jpg"></Avatar>
        </Badge>
        <Badge content={<Cross className="badge-icon" />}>
          <Avatar src="https://mui.com/static/images/avatar/1.jpg"></Avatar>
        </Badge>
      </Block> */}
    </Page>
  )
}

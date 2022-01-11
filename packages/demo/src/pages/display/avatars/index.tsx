import { Avatars } from "@taroify/core"
import * as React from "react"
import { Cross, SettingOutlined, LocationOutlined } from "@taroify/icons"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

export default function AvatarsDemo() {
  return (
    <Page title="Avatars 头像" className="avatars-demo">
      <Block title="基础用法">
        <Avatars>P</Avatars>
        <Avatars sx={{ background: "green" }}>N</Avatars>
        <Avatars sx={{ background: "pink" }}>HP</Avatars>
      </Block>
      <Block title="图片">
        <Avatars.Group max={3}>
          <Avatars src="https://mui.com/static/images/avatar/1.jpg"></Avatars>
          <Avatars src="https://mui.com/static/images/avatar/2.jpg"></Avatars>
          <Avatars src="https://mui.com/static/images/avatar/3.jpg"></Avatars>
          <Avatars src="https://mui.com/static/images/avatar/2.jpg"></Avatars>
          <Avatars src="https://mui.com/static/images/avatar/3.jpg"></Avatars>
        </Avatars.Group>
      </Block>
      <Block title="尺寸">
        <Avatars
          src="https://mui.com/static/images/avatar/1.jpg"
          sx={{ width: "24px", height: "24px" }}
        ></Avatars>
        <Avatars
          src="https://mui.com/static/images/avatar/1.jpg"
          sx={{ width: "36px", height: "36px" }}
        ></Avatars>
        <Avatars
          src="https://mui.com/static/images/avatar/1.jpg"
          sx={{ width: "48px", height: "48px" }}
        ></Avatars>
      </Block>
      <Block title="形状">
        <Avatars src="https://mui.com/static/images/avatar/1.jpg"></Avatars>
        <Avatars src="https://mui.com/static/images/avatar/1.jpg" variant="square"></Avatars>
        <Avatars src="https://mui.com/static/images/avatar/1.jpg" variant="rounded"></Avatars>
      </Block>
      <Block title="图标">
        <Avatars sx={{ background: "red" }}>
          <Cross />
        </Avatars>
        <Avatars sx={{ background: "pink" }}>
          <LocationOutlined />
        </Avatars>
        <Avatars sx={{ background: "green" }}>
          <SettingOutlined />
        </Avatars>
      </Block>
      {/* <Block title="徽章用法">
        <Badge content={10} position="bottom-right">
          <Avatars src="https://mui.com/static/images/avatar/1.jpg"></Avatars>
        </Badge>
        <Badge content={<Cross className="badge-icon" />}>
          <Avatars src="https://mui.com/static/images/avatar/1.jpg"></Avatars>
        </Badge>
      </Block> */}
    </Page>
  )
}

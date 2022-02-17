import { Avatar, Badge } from "@taroify/core"
import { Cross, LocationOutlined, SettingOutlined } from "@taroify/icons"
import * as _ from "lodash"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

function randomAvatar() {
  return `https://joeschmoe.io/api/v1/random?t=${_.random(Number.MAX_VALUE)}`
}

export default function AvatarDemo() {
  return (
    <Page title="Avatar 头像" className="avatar-demo">
      <Block title="基础用法" className="avatar-block">
        <Avatar>P</Avatar>
        <Avatar style={{ background: "green" }}>N</Avatar>
        <Avatar style={{ background: "pink" }}>HP</Avatar>
      </Block>
      <Block title="尺寸" className="avatar-block">
        <Avatar src={randomAvatar()} size="mini" />
        <Avatar src={randomAvatar()} size="small" />
        <Avatar src={randomAvatar()} size="medium" />
        <Avatar src={randomAvatar()} size="large" />
      </Block>
      <Block title="形状" className="avatar-block">
        <Avatar src={randomAvatar()} />
        <Avatar src={randomAvatar()} shape="square" />
        <Avatar src={randomAvatar()} shape="rounded" />
      </Block>
      <Block title="群组" className="avatar-block">
        <Avatar.Group limit={5}>
          <Avatar src={randomAvatar()} />
          <Avatar src={randomAvatar()} />
          <Avatar src={randomAvatar()} />
          <Avatar src={randomAvatar()} />
          <Avatar src={randomAvatar()} />
          <Avatar src={randomAvatar()} />
        </Avatar.Group>
      </Block>
      <Block title="最大" className="avatar-block">
        <Avatar.Group limit={3}>
          <Avatar src={randomAvatar()} />
          <Avatar src={randomAvatar()} />
          <Avatar src={randomAvatar()} />
          <Avatar src={randomAvatar()} />
          <Avatar src={randomAvatar()} />
          <Avatar src={randomAvatar()} />
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
          <Avatar src={randomAvatar()} />
        </Badge>
        <Badge
          className="avatar-avatar"
          content={<Avatar src={randomAvatar()} />}
          position="bottom-right"
        >
          <Avatar src={randomAvatar()} />
        </Badge>
      </Block>
    </Page>
  )
}

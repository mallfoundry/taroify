import { Timeline } from "@taroify/core"
import { Cross, LocationOutlined, SettingOutlined } from "@taroify/icons"
import * as _ from "lodash"
import * as React from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

export default function AvatarDemo() {
  return (
    <Page title="Avatar 头像" className="avatar-demo">
      <Block title="基础用法" className="avatar-block">
        <Timeline>
          <Timeline.Item></Timeline.Item>
        </Timeline>
      </Block>
    </Page>
  )
}

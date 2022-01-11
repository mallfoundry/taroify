import { Avatars } from "@taroify/core"
import * as React from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

export default function AvatarsDemo() {
  return (
    <Page title="Avatars 头像" className="avatars-demo">
      <Block title="基础用法">
        <Avatars sx={{width:"24px",height:"24px",background:"green"}}>
          P
        </Avatars>
      </Block>
      <Block title="基础用法">
        <Avatars variant="rounded" src="https://img.yzcdn.cn/vant/logo.png"></Avatars>
      </Block>
    </Page>
  )
}

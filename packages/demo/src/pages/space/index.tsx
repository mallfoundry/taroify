import { Space } from "@taroify/core"
import * as React from "react"
import Block from "../../components/block"
import Page from "../../components/page"

export default function SpaceDemo() {
  return (
    <Page title="Space 间距">
      <Block title="基础用法">
        <Space>
          111
        </Space>
      </Block>
    </Page>
  )
}

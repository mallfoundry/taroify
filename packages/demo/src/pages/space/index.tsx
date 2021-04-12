import * as React from "react"
import Page from "../../components/page"
import Block from "../../components/block"
import Space from "@taroify/core/space"

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

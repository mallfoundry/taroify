import { Loading, Space } from "@taroify/core"
import * as React from "react"
import Block from "../../components/block"
import Page from "../../components/page"
import "./index.scss"

export default function LoadingDemo() {
  return (
    <Page title="Loading">
      <Block title="加载类型">
        <Space>
          <Loading />
          <Loading type="spinner" />
        </Space>
      </Block>
      <Block title="自定义颜色">
        <Space>
          <Loading color="#1989fa" />
          <Loading type="spinner" color="#1989fa" />
        </Space>
      </Block>
      <Block title="自定义大小">
        <Space>
          <Loading size="24" />
          <Loading type="spinner" size="24" />
        </Space>
      </Block>
    </Page>
  )
}

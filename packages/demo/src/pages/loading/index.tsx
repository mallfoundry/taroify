import Loading from "@taroify/core/loading"
import Space from "@taroify/core/space"
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
    </Page>
  )
}

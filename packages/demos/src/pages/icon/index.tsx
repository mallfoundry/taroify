import * as React from "react"
import Block from "../../components/block"
import Page from "../../components/page"
import ArrowBackIosOutlined from "@taroify/icons/ArrowBackIosOutlined"
import ArrowForwardIosOutlined from "@taroify/icons/ArrowForwardIosOutlined"
import "./index.scss"

export default function IconDemo() {
  return (
    <Page title="图标">
      <Block title="按钮类型">
        <ArrowBackIosOutlined />
        <ArrowBackIosOutlined />
        <ArrowForwardIosOutlined />
      </Block>
    </Page>
  )
}

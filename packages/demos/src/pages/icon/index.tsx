import "./index.scss"
import "@vant-taro/core/index.scss"
import "@vant-taro/icons/index.scss"
import Block from "../../components/block"
import Page from "../../components/page"
import { MaterialIcon } from "@vant-taro/icons/material"
import ArrowBackIosOutlined from "@vant-taro/icons/ArrowBackIosOutlined"
import ArrowForwardIosOutlined from "@vant-taro/icons/ArrowForwardIosOutlined"

export default function IconDemo() {
  return (
    <Page title="图标">
      <Block title="按钮类型">
        <ArrowBackIosOutlined />
        <ArrowBackIosOutlined />
        <ArrowForwardIosOutlined />
        <MaterialIcon children="face" />
      </Block>
    </Page>
  )
}

import "./index.scss"
import "@taroify/core/index.scss"
import "@taroify/icons/index.scss"
import Block from "../../components/block"
import Page from "../../components/page"
import { MaterialIcon } from "@taroify/icons/material"
import ArrowBackIosOutlined from "@taroify/icons/ArrowBackIosOutlined"
import ArrowForwardIosOutlined from "@taroify/icons/ArrowForwardIosOutlined"

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

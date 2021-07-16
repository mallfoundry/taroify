import { Col, Image, Row } from "@taroify/core"
import { ImageMode } from "@taroify/core/image"
import { Photo, PhotoFail } from "@taroify/icons"
import { Text } from "@tarojs/components"
import * as React from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

export default function ImageDemo() {
  const imageUrl = "https://img01.yzcdn.cn/vant/cat.jpeg"

  const modes = [
    ImageMode.ScaleToFill,
    ImageMode.AspectFit,
    ImageMode.AspectFill,
    ImageMode.WidthFix,
    ImageMode.HeightFix,
    ImageMode.Top,
    ImageMode.Bottom,
    ImageMode.Center,
    ImageMode.Left,
    ImageMode.Right,
    ImageMode.TopLeft,
    ImageMode.TopRight,
    ImageMode.BottomLeft,
    ImageMode.BottomRight,
  ]

  return (
    <Page title="Image 图片" className="image-demo">
      <Block title="基础用法">
        <Image className="basic-image" src={imageUrl} />
      </Block>
      <Block title="填充模式">
        <Row gutter="20">
          {modes.map((mode) => (
            <Col span="8" key={mode}>
              <Image mode={mode} src={imageUrl} />
              <Text className="text">{mode}</Text>
            </Col>
          ))}
        </Row>
      </Block>
      <Block title="圆形图片">
        <Row gutter="20">
          {modes.map((mode) => (
            <Col span="8" key={mode}>
              <Image mode={mode} src={imageUrl} round />
              <Text className="text">{mode}</Text>
            </Col>
          ))}
        </Row>
      </Block>
      <Block title="加载中提示">
        <Row gutter="20">
          <Col span="8">
            <Image placeholder={<Photo />} />
            <Text className="text">默认提示</Text>
          </Col>
          <Col span="8">
            <Image placeholder="加载中..." />
            <Text className="text">自定义提示</Text>
          </Col>
        </Row>
      </Block>
      <Block title="加载失败提示">
        <Row gutter="20">
          <Col span="8">
            <Image src="error" fallback={<PhotoFail />} />
            <Text className="text">默认提示</Text>
          </Col>
          <Col span="8">
            <Image src="error" fallback="加载失败" />
            <Text className="text">自定义提示</Text>
          </Col>
        </Row>
      </Block>
    </Page>
  )
}

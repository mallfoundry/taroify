import * as React from "react"
import { Text } from "@tarojs/components"
import Image, { ImageMode } from "@taroify/core/image"
import Row from "@taroify/core/row"
import Col from "@taroify/core/col"
import Photo from "@taroify/icons/Photo"
import PhotoFail from "@taroify/icons/PhotoFail"
import Block from "../../components/block"
import Page from "../../components/page"
import classes from "./index.module.scss"

export default function ImageDemo() {
  const imageUrl = "https://img01.yzcdn.cn/vant/cat.jpeg"

  const modes = [
    ImageMode.ScaleToFill, ImageMode.AspectFit, ImageMode.AspectFill,
    ImageMode.WidthFix, ImageMode.HeightFix,
    ImageMode.Top, ImageMode.Bottom, ImageMode.Center,
    ImageMode.Left, ImageMode.Right,
    ImageMode.TopLeft, ImageMode.TopRight,
    ImageMode.BottomLeft, ImageMode.BottomRight,
  ]

  return (
    <Page title="Image 图片" className={classes.ImageDemo}>
      <Block title="基础用法">
        <Image className={classes.BasicImage} src={imageUrl} />
      </Block>
      <Block title="填充模式">
        <Row gutter="20">
          {
            modes.map(mode => (
              <Col span="8" key={mode}>
                <Image className={classes.Image} mode={mode} src={imageUrl} />
                <Text className={classes.Text}>{mode}</Text>
              </Col>
            ))
          }
        </Row>
      </Block>
      <Block title="圆形图片">
        <Row gutter="20">
          {
            modes.map(mode => (
              <Col span="8" key={mode}>
                <Image className={classes.Image} mode={mode} src={imageUrl} round />
                <Text className={classes.Text}>{mode}</Text>
              </Col>
            ))
          }
        </Row>
      </Block>
      <Block title="加载中提示">
        <Row gutter="20">
          <Col span="8">
            <Image
              className={classes.Image}
              placeholder={<Photo />}
            />
            <Text className={classes.Text}>默认提示</Text>
          </Col>
          <Col span="8">
            <Image
              className={classes.Image}
              placeholder="加载中..."
            />
            <Text className={classes.Text}>自定义提示</Text>
          </Col>
        </Row>
      </Block>
      <Block title="加载失败提示">
        <Row gutter="20">
          <Col span="8">
            <Image
              className={classes.Image} src="error"
              fallback={<PhotoFail />}
            />
            <Text className={classes.Text}>默认提示</Text>
          </Col>
          <Col span="8">
            <Image
              className={classes.Image} src="error"
              fallback="加载失败"
            />
            <Text className={classes.Text}>自定义提示</Text>
          </Col>
        </Row>
      </Block>
    </Page>
  )
}

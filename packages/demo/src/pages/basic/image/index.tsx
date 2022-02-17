import { Flex, Image } from "@taroify/core"
import { ImageMode } from "@taroify/core/image"
import { Photo, PhotoFail } from "@taroify/icons"
import { Text } from "@tarojs/components"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

export default function ImageDemo() {
  const imageUrl = "https://img01.yzcdn.cn/vant/cat.jpeg"

  const modes: ImageMode[] = [
    "scaleToFill",
    "aspectFit",
    "aspectFill",
    "widthFix",
    "heightFix",
    "top",
    "bottom",
    "center",
    "left",
    "right",
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight",
  ]

  return (
    <Page title="Image 图片" className="image-demo">
      <Block title="基础用法">
        <Image className="basic-image" src={imageUrl} />
      </Block>
      <Block title="填充模式">
        <Flex wrap="wrap" gutter={20}>
          {modes.map((mode) => (
            <Flex.Item span={8} key={mode}>
              <Image mode={mode} src={imageUrl} />
              <Text className="text">{mode}</Text>
            </Flex.Item>
          ))}
        </Flex>
      </Block>
      <Block title="圆形图片">
        <Flex wrap="wrap" gutter={20}>
          {modes.map((mode) => (
            <Flex.Item span={8} key={mode}>
              <Image mode={mode} src={imageUrl} round />
              <Text className="text">{mode}</Text>
            </Flex.Item>
          ))}
        </Flex>
      </Block>
      <Block title="加载中提示">
        <Flex wrap="wrap" gutter={20}>
          <Flex.Item span={8}>
            <Image placeholder={<Photo />} />
            <Text className="text">默认提示</Text>
          </Flex.Item>
          <Flex.Item span={8}>
            <Image placeholder="加载中..." />
            <Text className="text">自定义提示</Text>
          </Flex.Item>
        </Flex>
      </Block>
      <Block title="加载失败提示">
        <Flex wrap="wrap" gutter={20}>
          <Flex.Item span={8}>
            <Image src="error" fallback={<PhotoFail />} />
            <Text className="text">默认提示</Text>
          </Flex.Item>
          <Flex.Item span={8}>
            <Image src="error" fallback="加载失败" />
            <Text className="text">自定义提示</Text>
          </Flex.Item>
        </Flex>
      </Block>
    </Page>
  )
}

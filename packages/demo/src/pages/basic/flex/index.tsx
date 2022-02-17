import { Flex } from "@taroify/core"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

export default function FlexDemo() {
  return (
    <Page title="Flex 布局" className="flex-demo">
      <Block title="基础用法">
        <Flex>
          <Flex.Item span={8}>span: 8</Flex.Item>
          <Flex.Item span={8}>span: 8</Flex.Item>
          <Flex.Item span={8}>span: 8</Flex.Item>
        </Flex>
      </Block>
      <Block title="在列元素之间增加间距">
        <Flex gutter={12}>
          <Flex.Item span={8}>span: 8</Flex.Item>
          <Flex.Item span={8}>span: 8</Flex.Item>
          <Flex.Item span={8}>span: 8</Flex.Item>
        </Flex>
      </Block>
      <Block title="Flex 布局">
        <Flex>
          <Flex.Item span={6}>span: 6</Flex.Item>
          <Flex.Item span={6}>span: 6</Flex.Item>
          <Flex.Item span={6}>span: 6</Flex.Item>
        </Flex>
        <Flex>
          <Flex.Item offset={3} span={6}>
            span: 6
          </Flex.Item>
          <Flex.Item span={6}>span: 6</Flex.Item>
          <Flex.Item span={6}>span: 6</Flex.Item>
        </Flex>
        <Flex justify="space-between">
          <Flex.Item span={6}>span: 6</Flex.Item>
          <Flex.Item span={6}>span: 6</Flex.Item>
          <Flex.Item span={6}>span: 6</Flex.Item>
        </Flex>
        <Flex justify="space-around">
          <Flex.Item span={6}>span: 6</Flex.Item>
          <Flex.Item span={6}>span: 6</Flex.Item>
          <Flex.Item span={6}>span: 6</Flex.Item>
        </Flex>
      </Block>
    </Page>
  )
}

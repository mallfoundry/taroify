import { Button, Space } from "@taroify/core"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

export default function SpaceDemo() {
  return (
    <Page title="Space 间距" className="space-demo">
      <Block title="基础用法">
        <Space>
          <Button color="primary">主要按钮</Button>
          <Button color="primary">主要按钮</Button>
          <Button color="primary">主要按钮</Button>
        </Space>
      </Block>
      <Block title="垂直">
        <Space direction="vertical">
          <Button color="primary">主要按钮</Button>
          <Button color="primary">主要按钮</Button>
          <Button color="primary">主要按钮</Button>
        </Space>
      </Block>
      <Block title="间隙">
        <Space size="mini">
          <Button color="primary">主要按钮</Button>
          <Button color="primary">主要按钮</Button>
          <Button color="primary">主要按钮</Button>
        </Space>
        <Space size="small">
          <Button color="primary">主要按钮</Button>
          <Button color="primary">主要按钮</Button>
          <Button color="primary">主要按钮</Button>
        </Space>
        <Space size="medium">
          <Button color="primary">主要按钮</Button>
          <Button color="primary">主要按钮</Button>
          <Button color="primary">主要按钮</Button>
        </Space>
        <Space size="large">
          <Button color="primary">主要按钮</Button>
          <Button color="primary">主要按钮</Button>
          <Button color="primary">主要按钮</Button>
        </Space>
      </Block>
      <Block title="靠右">
        <Space justify="space-around">
          <Button color="primary">主要按钮</Button>
          <Button color="primary">主要按钮</Button>
          <Button color="primary">主要按钮</Button>
        </Space>
      </Block>
      <Block title="居中">
        <Space justify="center">
          <Button color="primary">主要按钮</Button>
          <Button color="primary">主要按钮</Button>
        </Space>
      </Block>
      <Block title="环绕">
        <Space justify="space-around">
          <Button color="primary">主要按钮</Button>
          <Button color="primary">主要按钮</Button>
        </Space>
      </Block>
      <Block title="两端对齐">
        <Space justify="space-between">
          <Button color="primary">主要按钮</Button>
          <Button color="primary">主要按钮</Button>
        </Space>
      </Block>
      <Block title="不换行">
        <Space wrap="nowrap">
          <Button color="primary">主要按钮</Button>
          <Button color="primary">主要按钮</Button>
          <Button color="primary">主要按钮</Button>
          <Button color="primary">主要按钮</Button>
        </Space>
      </Block>
    </Page>
  )
}

import { Divider } from "@taroify/core"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

export default function DividerDemo() {
  return (
    <Page title="Divider 分割线" className="divider-demo">
      <Block title="基础用法">
        <Divider />
      </Block>
      <Block title="展示文字">
        <Divider>文本</Divider>
      </Block>
      <Block title="内容位置">
        <Divider>
          <Divider.Text orientation="left">文字</Divider.Text>
        </Divider>
        <Divider>
          <Divider.Text orientation="right">文字</Divider.Text>
        </Divider>
      </Block>
      <Block title="虚线">
        <Divider dashed>文本</Divider>
      </Block>
      <Block title="自定义样式">
        <Divider style={{ color: "#1989fa", borderColor: "#1989fa", padding: "0 16px" }}>
          文本
        </Divider>
      </Block>
    </Page>
  )
}

import { Button, Empty, Tabs } from "@taroify/core"
import { useState } from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

function PresetEmpty() {
  const [tab, setTab] = useState(0)
  return (
    <Block title="图片类型">
      <Tabs value={tab} onChange={setTab}>
        <Tabs.TabPane title="通用错误">
          <Empty>
            <Empty.Image src="error" />
            <Empty.Description>描述文字</Empty.Description>
          </Empty>
        </Tabs.TabPane>
        <Tabs.TabPane title="网络错误">
          <Empty>
            <Empty.Image src="network" />
            <Empty.Description>描述文字</Empty.Description>
          </Empty>
        </Tabs.TabPane>
        <Tabs.TabPane title="搜索提示">
          <Empty>
            <Empty.Image src="search" />
            <Empty.Description>描述文字</Empty.Description>
          </Empty>
        </Tabs.TabPane>
      </Tabs>
    </Block>
  )
}

export default function EmptyDemo() {
  return (
    <Page title="Empty 空状态" className="empty-demo">
      <Block title="基础用法">
        <Empty>
          <Empty.Image />
          <Empty.Description>描述文字</Empty.Description>
        </Empty>
      </Block>
      <PresetEmpty />
      <Block title="自定义图片">
        <Empty>
          <Empty.Image
            className="custom-empty__image"
            src="https://img.yzcdn.cn/vant/custom-empty-image.png"
          />
          <Empty.Description>描述文字</Empty.Description>
        </Empty>
      </Block>
      <Block title="底部内容">
        <Empty>
          <Empty.Image />
          <Empty.Description>描述文字</Empty.Description>
          <Button shape="round" color="danger" className="bottom-button">
            按钮
          </Button>
        </Empty>
      </Block>
    </Page>
  )
}

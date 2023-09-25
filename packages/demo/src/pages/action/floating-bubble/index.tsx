import { useState } from "react"
import { showToast } from "@tarojs/taro"
import { FloatingBubble, Tabs } from "@taroify/core"
import { ChatOutlined } from "@taroify/icons"
import Page from "../../../components/page"

import "./index.scss"

function BasicFloatingBubble() {
  const onClick = () => {
    showToast({
      title: "点击气泡",
      icon: "none",
      duration: 1000,
    })
  }

  return <FloatingBubble icon={<ChatOutlined />} onClick={onClick} />
}

function CustomFloatingBubble() {
  const onOffsetChange = (x: number, y: number) => {
    showToast({
      title: `x: ${x.toFixed(0)}, y: ${y.toFixed(0)}`,
      icon: "none",
      duration: 1000,
    })
  }

  return (
    <FloatingBubble
      axis="xy"
      magnetic="x"
      icon={<ChatOutlined />}
      onOffsetChange={onOffsetChange}
    />
  )
}

export default function FloatingPanelDemo() {
  const [value, setValue] = useState(0)

  return (
    <Page className="floating-bubble-demo" title="FloatingBubble 浮动气泡">
      <Tabs value={value} onChange={setValue}>
        <Tabs.TabPane title="基础用法">
          <BasicFloatingBubble />
        </Tabs.TabPane>
        <Tabs.TabPane title="自由拖拽和磁吸">
          <CustomFloatingBubble />
        </Tabs.TabPane>
      </Tabs>
    </Page>
  )
}

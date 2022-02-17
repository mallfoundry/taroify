import { Backdrop, Button } from "@taroify/core"
import { View } from "@tarojs/components"
import { useState } from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"

import "./index.scss"

export default function BackdropDemo() {
  const [open, setOpen] = useState(false)
  const [opened2, setOpened2] = useState(false)

  return (
    <Page title="Backdrop" className="backdrop-demo">
      <Block title="基础用法">
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
          显示背景板
        </Button>
        <Backdrop open={open} closeable onClose={() => setOpen(false)} />
      </Block>
      <Block title="嵌入内容">
        <Button variant="contained" color="primary" onClick={() => setOpened2(true)}>
          嵌入内容
        </Button>
        <Backdrop open={opened2} closeable onClose={() => setOpened2(false)}>
          <View className="content-wrapper">
            <View className="content-block" />
          </View>
        </Backdrop>
      </Block>
    </Page>
  )
}

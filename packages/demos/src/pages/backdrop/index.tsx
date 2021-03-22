import "@vant-taro/core/index.scss"
import Page from "../../components/page"
import { useState } from "react"
import { Backdrop, Button } from "@vant-taro/core"
import Block from "../../components/block"
import { View } from "@tarojs/components"

import classes from "./index.module.scss"

export default function BackdropDemo() {
  const [open, setOpen] = useState(false)
  const [opened2, setOpened2] = useState(false)
  console.log(opened2, setOpened2)

  return (
    <Page title="Backdrop">
      <Block title="基础用法">
        <Button
          variant="contained" color="primary"
          onClick={() => setOpen(true)}>显示遮盖层</Button>
        <Backdrop
          open={open} closable={true}
          onClose={() => setOpen(false)} />
      </Block>
      <Block title="嵌入内容">
        <Button
          variant="contained" color="primary"
          onClick={() => setOpened2(true)}>嵌入内容</Button>
        <Backdrop
          open={opened2} closable={true}
          onClose={() => setOpened2(false)}>
          <View className={classes.ContentWrapper}>
            <View className={classes.ContentBlock} />
          </View>
        </Backdrop>
      </Block>
    </Page>
  )
}

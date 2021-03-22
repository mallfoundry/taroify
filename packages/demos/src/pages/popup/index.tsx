import "@vant-taro/core/index.scss"
import Page from "../../components/page"
import { useState } from "react"
import { Button, Popup } from "@vant-taro/core"
import Block from "../../components/block"
import { View } from "@tarojs/components"

export default function PopupDemo() {
  const [open, setOpen] = useState(false)
  const [opened2, setOpened2] = useState(false)
  console.log(opened2, setOpened2)

  return (
    <Page title="Popup">
      <Block title="基础用法">
        <Button
          variant="contained" color="primary"
          onClick={() => setOpen(true)}>显示遮盖层</Button>
        <Popup
          open={open}
          anchor="top"
          onClose={() => setOpen(false)}>
          <View>dsafjaklfjdlk</View>
          <View>dsafjaklfjdlk</View>
        </Popup>
      </Block>
    </Page>
  )
}

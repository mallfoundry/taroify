import { Button, Popover } from "@taroify/core"
import * as React from "react"
import Block from "../../components/block"
import Page from "../../components/page"
import "./index.scss"

function BasicPopover() {
  return (
    <Block title="基础用法">
      <Popover>
        <Popover.Trigger>
          <Button>浅色风格</Button>
        </Popover.Trigger>
      </Popover>
    </Block>
  )
}

export default function PopoverDemo() {
  return (
    <Page title="Popover 气泡弹出框" className="popover-demo">
      <BasicPopover />
    </Page>
  )
}

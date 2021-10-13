import { Cell, Notify } from "@taroify/core"
import { NotifyColor } from "@taroify/core/notify"
import * as React from "react"
import { useState } from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

function BasicNotify() {
  const [open, setOpen] = useState(false)

  return (
    <Block title="基础用法">
      <Cell title="基础用法" clickable onClick={() => setOpen(true)} />
      <Notify open={open} onClose={setOpen} children="通知内容" />
    </Block>
  )
}

function CustomNotify() {
  const [options, setOptions] = useState<{
    open?: boolean
    duration?: number
  }>({})

  return (
    <Block title="自定义配置">
      <Cell
        title="自定义颜色"
        clickable
        onClick={() => {
          setOptions({
            open: true,
          })
        }}
      />
      <Cell
        title="自定义时长"
        clickable
        onClick={() =>
          setOptions({
            open: true,
            duration: 1000,
          })
        }
      />
      <Notify
        open={options.open}
        style={{
          color: "#ad0000",
          background: "#ffe1e1",
        }}
        duration={options.duration}
        children="自定义内容"
        onClose={() => setOptions({ open: false })}
      />
    </Block>
  )
}

function NotifyWithPresetColors() {
  const [options, setOptions] = useState<{ open: boolean; color?: NotifyColor }>({
    open: false,
    color: undefined,
  })

  return (
    <Block title="通知颜色">
      <Cell
        title="主要通知"
        clickable
        onClick={() => setOptions({ open: true, color: "primary" })}
      />
      <Cell
        title="成功通知"
        clickable
        onClick={() => setOptions({ open: true, color: "success" })}
      />
      <Cell
        title="危险通知"
        clickable
        onClick={() => setOptions({ open: true, color: "danger" })}
      />
      <Cell
        title="警告通知"
        clickable
        onClick={() => setOptions({ open: true, color: "warning" })}
      />
      <Notify
        open={options.open}
        color={options.color}
        children="通知内容"
        onClose={(open) => setOptions({ open })}
      />
    </Block>
  )
}

export default function NotifyDemo() {
  return (
    <Page title="Notify 消息提示" className="notify-demo">
      <BasicNotify />
      <NotifyWithPresetColors />
      <CustomNotify />
    </Page>
  )
}

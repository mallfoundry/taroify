import { Cell, Notify } from "@taroify/core"
import { ArrowRight } from "@taroify/icons"
import { ReactNode, useState } from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

function BasicNotify() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Cell title="基础用法" clickable rightIcon={<ArrowRight />} onClick={() => setOpen(true)} />
      <Notify open={open} onClose={setOpen} children="通知内容" />
    </>
  )
}

function CustomNotify() {
  const [options, setOptions] = useState<{
    open?: boolean
    duration?: number
    children?: ReactNode
  }>({})

  return (
    <>
      <Cell
        title="自定义颜色"
        clickable
        rightIcon={<ArrowRight />}
        onClick={() => {
          setOptions({
            open: true,
            children: "自定义颜色",
          })
        }}
      />
      <Cell
        title="自定义时长"
        clickable
        rightIcon={<ArrowRight />}
        onClick={() =>
          setOptions({
            open: true,
            duration: 1000,
            children: "自定义时长",
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
        children={options.children}
        onClose={() => setOptions({ open: false })}
      />
    </>
  )
}

function NotifyWithPresetColors() {
  return (
    <>
      <Notify id="notify" />
      <Cell
        title="主要通知"
        clickable
        rightIcon={<ArrowRight />}
        onClick={() => Notify.open({ color: "primary", message: "通知内容" })}
      />
      <Cell
        title="成功通知"
        clickable
        rightIcon={<ArrowRight />}
        onClick={() => Notify.open({ color: "success", message: "通知内容" })}
      />
      <Cell
        title="危险通知"
        clickable
        rightIcon={<ArrowRight />}
        onClick={() => Notify.open({ color: "danger", message: "通知内容" })}
      />
      <Cell
        title="警告通知"
        clickable
        rightIcon={<ArrowRight />}
        onClick={() => Notify.open({ color: "warning", message: "通知内容" })}
      />
    </>
  )
}

export default function NotifyDemo() {
  return (
    <Page title="Notify 消息提示" className="notify-demo">
      <Block variant="card" title="基础用法">
        <BasicNotify />
      </Block>
      <Block variant="card" title="通知颜色">
        <NotifyWithPresetColors />
      </Block>
      <Block variant="card" title="自定义配置">
        <CustomNotify />
      </Block>
    </Page>
  )
}

import { Cell, Notify } from "@taroify/core"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

function BasicNotify() {
  return (
    <>
      <Cell title="基础用法" clickable isLink onClick={() => Notify.open("文字提示")} />
    </>
  )
}

function CustomNotify() {
  return (
    <>
      <Cell
        title="自定义颜色"
        clickable
        isLink
        onClick={() => {
          Notify.open({
            color: "#ad0000",
            background: "#ffe1e1",
            message: "自定义颜色",
          })
        }}
      />
      <Cell
        title="自定义时长"
        clickable
        isLink
        onClick={() =>
          Notify.open({
            duration: 1000,
            message: "自定义时长",
          })
        }
      />
    </>
  )
}

function NotifyWithPresetColors() {
  return (
    <>
      <Cell
        title="主要通知"
        clickable
        isLink
        onClick={() => Notify.open({ color: "primary", message: "通知内容" })}
      />
      <Cell
        title="成功通知"
        clickable
        isLink
        onClick={() => Notify.open({ color: "success", message: "通知内容" })}
      />
      <Cell
        title="危险通知"
        clickable
        isLink
        onClick={() => Notify.open({ color: "danger", message: "通知内容" })}
      />
      <Cell
        title="警告通知"
        clickable
        isLink
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

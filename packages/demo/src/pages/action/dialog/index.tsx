import { Cell, Dialog } from "@taroify/core"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

function BasicDialog() {
  return (
    <>
      <Cell
        title="提示弹窗"
        clickable
        bordered
        isLink
        onClick={() => Dialog.alert({ title: "标题", message: "代码是写出来给人看的，附带能在机器上运行" })}
      />
    </>
  )
  // )
  // return (
  //   <>
  //     <Dialog
  //       open
  //       title="标题"
  //       message="代码是写出来给人看的，附带能在机器上运行"
  //       messageAlign="left"
  //       confirm="ok"
  //       cancel="cancel"
  //       onConfirm={() => console.log("confirm")} onCancel={() => console.log("cancel")}
  //     />
  //   </>
  // )
}

function NoTitleDialog() {
  return (
    <>
      <Cell
        title="提示弹窗（无标题）"
        clickable
        bordered
        isLink
        onClick={() => Dialog.alert("生命远不止连轴转和忙到极限，人类的体验远比这辽阔、丰富得多。")}
      />
    </>
  )
}

function ConfirmDialog() {
  return (
    <>
      <Cell
        title="确认弹窗"
        clickable
        bordered
        isLink
        onClick={() => Dialog.confirm({ title: "标题", message: "代码是写出来给人看的，附带能在机器上运行" })}
      />
    </>
  )
}

function RoundedDialog() {
  return (
    <>
      <Cell
        title="提示弹窗"
        clickable
        bordered
        isLink
        onClick={() => Dialog.confirm({ theme: "rounded", title: "标题", message: "代码是写出来给人看的，附带能在机器上运行" })}
      />
    </>
  )
}

function RoundedNoTitleDialog() {
  return (
    <>
      <Cell
        title="提示弹窗（无标题）"
        clickable
        bordered
        isLink
        onClick={() => Dialog.alert({ theme: "rounded", title: "标题", message: "代码是写出来给人看的，附带能在机器上运行" })}
      />
    </>
  )
}

function AsyncCloseDialog() {
  return (
    <>
      <Cell
        title="异步关闭"
        clickable
        bordered
        isLink
        onClick={() => Dialog.confirm({
          title: "标题",
          message: "如果解决方法是丑陋的，那就肯定还有更好的解决方法，只是还没有发现而已。",
          async onBeforeClose(action) {
            return new Promise((resolve) => {
              setTimeout(() => {
                // action !== 'confirm'  拦截取消操作
                resolve(action === "confirm");
              }, 1000);
            });
          },
          onCancel() {
            console.log("cancel")
          },
          onConfirm() {
            console.log("confirm")
          },
        })}
      />
    </>
  )
}

export default function DialogDemo() {
  return (
    <Page title="Dialog 弹出框" className="dialog-demo">
      <Block variant="card" title="基础用法">
        <BasicDialog />
        <NoTitleDialog />
        <ConfirmDialog />
      </Block>
      <Block variant="card" title="圆角按钮样式">
        <RoundedDialog />
        <RoundedNoTitleDialog />
      </Block>
      <Block variant="card" title="异步关闭">
        <AsyncCloseDialog />
      </Block>
    </Page>
  )
}

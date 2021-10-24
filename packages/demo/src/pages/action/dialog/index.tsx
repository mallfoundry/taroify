import { Button, Cell, Dialog } from "@taroify/core"
import { ArrowRight } from "@taroify/icons"
import * as React from "react"
import { useState } from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

function BasicDialog() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Cell
        title="提示弹窗"
        clickable
        bordered
        rightIcon={<ArrowRight />}
        onClick={() => setOpen(true)}
      />
      <Dialog open={open} onClose={setOpen}>
        <Dialog.Header>标题</Dialog.Header>
        <Dialog.Content>代码是写出来给人看的，附带能在机器上运行</Dialog.Content>
        <Dialog.Actions>
          <Button onClick={() => setOpen(false)}>确认</Button>
        </Dialog.Actions>
      </Dialog>
    </>
  )
}

function NoTitleDialog() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Cell
        title="提示弹窗（无标题）"
        clickable
        bordered
        rightIcon={<ArrowRight />}
        onClick={() => setOpen(true)}
      />
      <Dialog open={open} onClose={setOpen}>
        <Dialog.Content>代码是写出来给人看的，附带能在机器上运行</Dialog.Content>
        <Dialog.Actions>
          <Button onClick={() => setOpen(false)}>确认</Button>
        </Dialog.Actions>
      </Dialog>
    </>
  )
}

function ConfirmDialog() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Cell
        title="确认弹窗"
        clickable
        bordered
        rightIcon={<ArrowRight />}
        onClick={() => setOpen(true)}
      />
      <Dialog open={open} onClose={setOpen}>
        <Dialog.Header>标题</Dialog.Header>
        <Dialog.Content>代码是写出来给人看的，附带能在机器上运行</Dialog.Content>
        <Dialog.Actions>
          <Button onClick={() => setOpen(false)}>取消</Button>
          <Button onClick={() => setOpen(false)}>确认</Button>
        </Dialog.Actions>
      </Dialog>
    </>
  )
}

function RoundDialog() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Cell
        title="提示弹窗"
        clickable
        bordered
        rightIcon={<ArrowRight />}
        onClick={() => setOpen(true)}
      />
      <Dialog open={open} onClose={setOpen}>
        <Dialog.Header>标题</Dialog.Header>
        <Dialog.Content>代码是写出来给人看的，附带能在机器上运行</Dialog.Content>
        <Dialog.Actions theme="round">
          <Button onClick={() => setOpen(false)}>取消</Button>
          <Button onClick={() => setOpen(false)}>确认</Button>
        </Dialog.Actions>
      </Dialog>
    </>
  )
}

function RoundNoTitleDialog() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Cell
        title="提示弹窗（无标题）"
        clickable
        bordered
        rightIcon={<ArrowRight />}
        onClick={() => setOpen(true)}
      />
      <Dialog open={open} onClose={setOpen}>
        <Dialog.Content>代码是写出来给人看的，附带能在机器上运行</Dialog.Content>
        <Dialog.Actions theme="round">
          <Button onClick={() => setOpen(false)}>确认</Button>
        </Dialog.Actions>
      </Dialog>
    </>
  )
}

export default function DialogDemo() {
  return (
    <Page title="Dialog 弹出框" className="dialog-demo">
      <Block title="基础用法">
        <BasicDialog />
        <NoTitleDialog />
        <ConfirmDialog />
      </Block>
      <Block title="圆角按钮样式">
        <RoundDialog />
        <RoundNoTitleDialog />
      </Block>
    </Page>
  )
}

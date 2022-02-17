import { ActionSheet, Cell } from "@taroify/core"
import { ArrowRight } from "@taroify/icons"
import { useState } from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

function BasicActionSheet() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Cell clickable title="基础用法" rightIcon={<ArrowRight />} onClick={() => setOpen(true)} />
      <ActionSheet open={open} onSelect={() => setOpen(false)} onClose={setOpen}>
        <ActionSheet.Action value="1" name="选项一" />
        <ActionSheet.Action value="2" name="选项二" />
        <ActionSheet.Action value="3" name="选项三" />
      </ActionSheet>
    </>
  )
}

function ActionSheetWithCancel() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Cell
        clickable
        title="展示取消按钮"
        rightIcon={<ArrowRight />}
        onClick={() => setOpen(true)}
      />
      <ActionSheet
        open={open}
        onSelect={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        onClose={setOpen}
      >
        <ActionSheet.Action value="1" name="选项一" />
        <ActionSheet.Action value="2" name="选项二" />
        <ActionSheet.Action value="3" name="选项三" />
        <ActionSheet.Button type="cancel">取消</ActionSheet.Button>
      </ActionSheet>
    </>
  )
}

function ActionSheetWithDescription() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Cell
        clickable
        title="展示描述信息"
        rightIcon={<ArrowRight />}
        onClick={() => setOpen(true)}
      />
      <ActionSheet
        open={open}
        onSelect={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        onClose={setOpen}
      >
        <ActionSheet.Header>这是一段描述信息</ActionSheet.Header>
        <ActionSheet.Action value="1" name="选项一" />
        <ActionSheet.Action value="2" name="选项二" />
        <ActionSheet.Action value="3" name="选项三" />
        <ActionSheet.Button type="cancel">取消</ActionSheet.Button>
      </ActionSheet>
    </>
  )
}

function ActionSheetWithStatuses() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Cell clickable title="选项状态" rightIcon={<ArrowRight />} onClick={() => setOpen(true)} />
      <ActionSheet
        open={open}
        onSelect={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        onClose={setOpen}
      >
        <ActionSheet.Action value="1" style={{ color: "#ee0a24" }} name="着色选项" />
        <ActionSheet.Action value="2" disabled name="禁止选项" />
        <ActionSheet.Action value="3" loading name="选项三" />
        <ActionSheet.Button type="cancel">取消</ActionSheet.Button>
      </ActionSheet>
    </>
  )
}

export default function ActionSheetDemo() {
  return (
    <Page title="ActionSheet 动作面板" className="action-sheet-demo">
      <Block variant="card" title="基础用法">
        <BasicActionSheet />
        <ActionSheetWithCancel />
        <ActionSheetWithDescription />
      </Block>
      <Block variant="card" title="选项状态">
        <ActionSheetWithStatuses />
      </Block>
    </Page>
  )
}

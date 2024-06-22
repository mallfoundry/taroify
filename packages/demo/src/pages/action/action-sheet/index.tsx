import { ActionSheet, Cell } from "@taroify/core"
import { ArrowRight } from "@taroify/icons"
import { useMemo, useState } from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

function BasicActionSheet() {
  const [open, setOpen] = useState(false)
  const actions = useMemo(() => [
    { name: "选项一", value: "1" },
    { name: "选项二", value: "2" },
    { name: "选项三", value: "3" },
  ], [])
  return (
    <>
      <Cell clickable isLink title="基础用法"  onClick={() => setOpen(true)} />
      <ActionSheet actions={actions} open={open} onSelect={() => setOpen(false)} onClose={setOpen} />
    </>
  )
}

function ActionSheetWithCancel() {
  const [open, setOpen] = useState(false)
  const actions = useMemo(() => [
    { name: "选项一", value: "1" },
    { name: "选项二", value: "2" },
    { name: "选项三", value: "3" },
  ], [])
  return (
    <>
      <Cell
        clickable
        isLink
        title="展示取消按钮"
        onClick={() => setOpen(true)}
      />
      <ActionSheet
        cancelText="取消"
        actions={actions}
        open={open}
        onSelect={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        onClose={setOpen}
      />
    </>
  )
}

function ActionSheetWithDescription() {
  const [open, setOpen] = useState(false)
  const actions = useMemo(() => [
    { name: "选项一", value: "1", subname: "这是一段描述信息" },
    { name: "选项二", value: "2" },
    { name: "选项三", value: "3" },
  ], [])
  return (
    <>
      <Cell
        clickable
        title="展示描述信息"
        isLink
        onClick={() => setOpen(true)}
      />
      <ActionSheet
        description="这是一段描述信息"
        cancelText="取消"
        actions={actions}
        open={open}
        onSelect={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        onClose={setOpen}
      />
    </>
  )
}

function ActionSheetWithStatuses() {
  const [open, setOpen] = useState(false)
  const actions = useMemo(() => [
    { name: "选项一", value: "1", style: { color: "#ee0a24" } },
    { name: "选项二", value: "2", disabled: true },
    { name: "选项三", value: "3", loading: true },
  ], [])
  return (
    <>
      <Cell clickable title="选项状态" rightIcon={<ArrowRight />} onClick={() => setOpen(true)} />
      <ActionSheet
        actions={actions}
        cancelText="取消"
        open={open}
        onSelect={(value) => {
          console.log(value)
          setOpen(false)
        }}
        onCancel={() => setOpen(false)}
        onClose={setOpen}
      />
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

import { Search, Toast } from "@taroify/core"
import { View } from "@tarojs/components"
import { useState } from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

function BasicSearch() {
  const [value, setValue] = useState("")
  return (
    <Search
      value={value}
      placeholder="请输入搜索关键词"
      onChange={(e) => setValue(e.detail.value)}
    />
  )
}

function SearchWithEvents() {
  const [value, setValue] = useState("")
  const [open, setOpen] = useState(false)

  return (
    <>
      <Toast open={open} onClose={() => setOpen(false)}>
        取消
      </Toast>
      <Search
        value={value}
        placeholder="请输入搜索关键词"
        action
        onChange={(e) => setValue(e.detail.value)}
        onCancel={() => setOpen(true)}
      />
    </>
  )
}

function InputCenterSearch() {
  const [value, setValue] = useState("")
  return (
    <Search
      value={value}
      placeholder="请输入搜索关键词"
      inputAlign="center"
      onChange={(e) => setValue(e.detail.value)}
    />
  )
}

function DisabledSearch() {
  return <Search disabled placeholder="请输入搜索关键词" />
}

function BackgroundSearch() {
  return <Search className="background" shape="rounded" placeholder="请输入搜索关键词" />
}

function CustomSearch() {
  const [value, setValue] = useState("")
  const [open, setOpen] = useState(false)
  return (
    <>
      <Toast open={open} onClose={() => setOpen(false)}>
        搜索
      </Toast>
      <Search
        value={value}
        label="地址"
        placeholder="请输入搜索关键词"
        action={<View onClick={() => setOpen(true)}>搜索</View>}
        onChange={(e) => setValue(e.detail.value)}
      />
    </>
  )
}

export default function SearchDemo() {
  return (
    <Page title="Search 搜索" className="search-demo">
      <Block title="基础用法">
        <BasicSearch />
      </Block>
      <Block title="事件监听">
        <SearchWithEvents />
      </Block>
      <Block title="搜索框内容对齐">
        <InputCenterSearch />
      </Block>
      <Block title="禁用搜索框">
        <DisabledSearch />
      </Block>
      <Block title="自定义背景色">
        <BackgroundSearch />
      </Block>
      <Block title="自定义按钮">
        <CustomSearch />
      </Block>
    </Page>
  )
}

import { PasswordInput } from "@taroify/core"
import * as React from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

function BasicPasswordInput() {
  return <PasswordInput focused value="123" />
}

function CustomLengthPasswordInput() {
  return <PasswordInput length={6} focused value="123" />
}

function GutterPasswordInput() {
  return <PasswordInput gutter={10} focused value="123" />
}

function NoMaskPasswordInput() {
  return <PasswordInput mask={false} focused value="123" />
}

function PasswordInputWithInfo() {
  return <PasswordInput info="密码为 6 位数字" focused value="123" />
}

export default function PasswordInputDemo() {
  return (
    <Page title="PasswordInput 密码输入框" className="password-input-demo">
      <Block title="基础用法">
        <BasicPasswordInput />
      </Block>
      <Block title="自定义长度">
        <CustomLengthPasswordInput />
      </Block>
      <Block title="格子间距">
        <GutterPasswordInput />
      </Block>
      <Block title="明文展示">
        <NoMaskPasswordInput />
      </Block>
      <Block title="明文展示">
        <PasswordInputWithInfo />
      </Block>
    </Page>
  )
}

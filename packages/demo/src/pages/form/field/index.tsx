import { Button, Cell, Field } from "@taroify/core"
import { MusicOutlined, SmileOutlined, WarningOutlined } from "@taroify/icons"
import * as React from "react"
import { useState } from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

function BasicField() {
  const [value, setValue] = useState("")
  return (
    <Cell.Group inset>
      <Field
        value={value}
        label="文本"
        placeholder="请输入文本"
        onChange={(e) => setValue(e.detail.value)}
      />
    </Cell.Group>
  )
}

function CustomField() {
  const [text, setText] = useState("")
  const [idcard, setIdcard] = useState("")
  const [number, setNumber] = useState("")
  const [digit, setDigit] = useState("")
  const [password, setPassword] = useState("")
  return (
    <Cell.Group inset>
      <Field
        value={text}
        label="文本"
        placeholder="请输入文本"
        onChange={(e) => setText(e.detail.value)}
      />
      <Field
        value={idcard}
        label="身份证号"
        type="idcard"
        placeholder="请输入手机号"
        onChange={(e) => setIdcard(e.detail.value)}
      />
      <Field
        value={number}
        label="整数"
        type="number"
        placeholder="请输入整数"
        onChange={(e) => setNumber(e.detail.value)}
      />
      <Field
        value={digit}
        label="数字"
        type="digit"
        placeholder="请输入数字（支持小数）"
        onChange={(e) => setDigit(e.detail.value)}
      />
      <Field
        value={password}
        label="密码"
        type="password"
        placeholder="请输入密码"
        onChange={(e) => setPassword(e.detail.value)}
      />
    </Cell.Group>
  )
}

function DisabledField() {
  return (
    <Cell.Group inset>
      <Field label="文本" placeholder="输入框只读" readonly />
      <Field label="文本" placeholder="输入框已禁用" disabled />
    </Cell.Group>
  )
}

function IconField() {
  const [value2, setValue2] = useState("")

  return (
    <Cell.Group inset>
      <Field
        label="文本"
        icon={<SmileOutlined />}
        rightIcon={<WarningOutlined />}
        placeholder="显示图标"
      />
      <Field
        value={value2}
        label="文本"
        icon={<MusicOutlined />}
        clearable
        placeholder="显示清除图标"
        onChange={(e) => setValue2(e.detail.value)}
      />
    </Cell.Group>
  )
}

function ErrorField() {
  return (
    <Cell.Group inset>
      <Field required error label="用户名" placeholder="请输入用户名" />
      <Field required error label="手机号" placeholder="请输入手机号" message="手机号格式错误" />
    </Cell.Group>
  )
}

function ButtonField() {
  return (
    <Cell.Group inset>
      <Field align="center" label="短信验证码" placeholder="请输入短信验证码">
        <Field.Button>
          <Button size="small" color="primary">
            发送验证码
          </Button>
        </Field.Button>
      </Field>
    </Cell.Group>
  )
}

export default function FieldDemo() {
  return (
    <Page title="Field 输入框" className="field-demo">
      <Block title="基础用法">
        <BasicField />
      </Block>
      <Block title="自定义类型">
        <CustomField />
      </Block>
      <Block title="禁用输入框">
        <DisabledField />
      </Block>
      <Block title="显示图标">
        <IconField />
      </Block>
      <Block title="错误提示">
        <ErrorField />
      </Block>
      <Block title="插入按钮">
        <ButtonField />
      </Block>
    </Page>
  )
}

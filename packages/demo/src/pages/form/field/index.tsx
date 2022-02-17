import { Button, Cell, Field, Input, Textarea } from "@taroify/core"
import { MusicOutlined, SmileOutlined, WarningOutlined } from "@taroify/icons"
import { useState } from "react"
import Block from "../../../components/block"
import CustomWrapper from "../../../components/custom-wrapper"
import Page from "../../../components/page"
import "./index.scss"

function BasicField() {
  const [value, setValue] = useState("")
  return (
    <Cell.Group inset>
      <Field label="文本">
        <Input placeholder="请输入文本" value={value} onChange={(e) => setValue(e.detail.value)} />
      </Field>
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
      <Field label="文本">
        <Input placeholder="请输入文本" value={text} onChange={(e) => setText(e.detail.value)} />
      </Field>
      <Field label="身份证号">
        <Input
          type="idcard"
          placeholder="请输入手机号"
          value={idcard}
          onChange={(e) => setIdcard(e.detail.value)}
        />
      </Field>
      <Field label="整数">
        <Input
          type="number"
          placeholder="请输入整数"
          value={number}
          onChange={(e) => setNumber(e.detail.value)}
        />
      </Field>
      <Field label="数字">
        <Input
          type="digit"
          placeholder="请输入数字（支持小数）"
          value={digit}
          onChange={(e) => setDigit(e.detail.value)}
        />
      </Field>
      <Field label="密码">
        <Input
          password
          placeholder="请输入密码"
          value={password}
          onChange={(e) => setPassword(e.detail.value)}
        />
      </Field>
    </Cell.Group>
  )
}

function DisabledField() {
  return (
    <Cell.Group inset>
      <Field label="文本">
        <Input placeholder="输入框只读" readonly />
      </Field>
      <Field label="文本">
        <Input placeholder="输入框已禁用" disabled />
      </Field>
    </Cell.Group>
  )
}

function IconField() {
  return (
    <Cell.Group inset>
      <Field label="文本" icon={<SmileOutlined />} rightIcon={<WarningOutlined />}>
        <Input placeholder="显示图标" />
      </Field>
      <Field label="文本" icon={<MusicOutlined />}>
        <Input placeholder="显示清除图标" clearable />
      </Field>
    </Cell.Group>
  )
}

function ErrorField() {
  return (
    <Cell.Group inset>
      <Field label="用户名" required>
        <Input placeholder="请输入用户名" color="danger" />
      </Field>
      <Field
        required
        label="手机号"
        feedback={<Field.Feedback status="invalid">手机号格式错误</Field.Feedback>}
      >
        <Input placeholder="请输入手机号" />
      </Field>
    </Cell.Group>
  )
}

function ButtonField() {
  return (
    <Cell.Group inset>
      <Field align="center" label="短信验证码">
        <Input placeholder="请输入短信验证码" />
        <Button size="small" color="primary">
          发送验证码
        </Button>
      </Field>
    </Cell.Group>
  )
}

function FieldWithInputAlign() {
  return (
    <Cell.Group inset>
      <Field label="文本">
        <Input align="left" placeholder="输入框内容左对齐" />
      </Field>
      <Field label="文本">
        <Input align="center" placeholder="输入框内容居中对齐" />
      </Field>
      <Field label="文本">
        <Input align="right" placeholder="输入框内容右对齐" />
      </Field>
    </Cell.Group>
  )
}

function TextareaWithAutoHeight() {
  return (
    <Cell.Group inset>
      <Field align="start" label="留言">
        <Textarea autoHeight placeholder="请输入留言" />
      </Field>
    </Cell.Group>
  )
}

function TextareaWithLimit() {
  return (
    <Cell.Group inset>
      <Field align="start" label="留言">
        <Textarea style={{ height: "48px" }} limit={50} placeholder="请输入留言" />
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
      <Block title="高度自适应">
        <CustomWrapper>
          <TextareaWithAutoHeight />
        </CustomWrapper>
      </Block>
      <Block title="显示字数统计">
        <CustomWrapper>
          <TextareaWithLimit />
        </CustomWrapper>
      </Block>
      <Block title="输入框内容对齐">
        <CustomWrapper>
          <FieldWithInputAlign />
        </CustomWrapper>
      </Block>
    </Page>
  )
}

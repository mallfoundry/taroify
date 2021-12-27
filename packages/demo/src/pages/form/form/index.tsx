import { Button, Cell, Field, Form, Input, Toast } from "@taroify/core"
import { View } from "@tarojs/components"
import { BaseEventOrig } from "@tarojs/components/types/common"
import { FormProps } from "@tarojs/components/types/Form"
import * as React from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

function BasicForm() {
  function onSubmit(event: BaseEventOrig<FormProps.onSubmitEventDetail>) {
    console.log(event.detail.value)
  }

  return (
    <Form onSubmit={onSubmit}>
      <Cell.Group inset>
        <Field name="username" label="用户名" rules={[{ required: true, message: "请填写用户名" }]}>
          <Input placeholder="用户名" />
        </Field>
        <Field name="password" label="密码" rules={[{ required: true, message: "请填写密码" }]}>
          <Input password placeholder="密码" />
        </Field>
      </Cell.Group>
      <View style={{ margin: "16px" }}>
        <Button shape="round" block color="primary" formType="submit">
          提交
        </Button>
      </View>
    </Form>
  )
}

function FormWithRules() {
  const asyncValidator = (val: any) =>
    new Promise<boolean>((resolve) => {
      Toast.loading("验证中...")

      setTimeout(() => {
        Toast.close("toast")
        resolve(/\d{6}/.test(val))
      }, 1000)
    })

  return (
    <Form defaultValues={{ validatorMessage: "abc" }}>
      <Toast id="toast" />
      <Cell.Group inset>
        <Field
          name="pattern"
          label="文本"
          rules={[{ pattern: /\d{6}/, message: "请输入正确内容" }]}
        >
          <Input placeholder="正则校验" />
        </Field>
        <Field
          name="validator"
          label="文本"
          rules={[{ validator: (val) => /1\d{10}/.test(val), message: "请输入正确内容" }]}
        >
          <Input placeholder="函数校验" />
        </Field>
        <Field
          name="validatorMessage"
          label="文本"
          rules={[{ validator: (val) => `${val ?? ""} 不合法，请重新输入` }]}
        >
          <Input placeholder="校验函数返回错误提示" />
        </Field>
        <Field
          name="asyncValidator"
          label="文本"
          rules={[{ validator: asyncValidator, message: "请输入正确内容" }]}
        >
          <Input placeholder="异步函数校验" />
        </Field>
      </Cell.Group>
      <View style={{ margin: "16px" }}>
        <Button shape="round" block color="primary" formType="submit">
          提交
        </Button>
      </View>
    </Form>
  )
}

export default function FormDemo() {
  return (
    <Page title="Form 表单" className="form-demo">
      <Block title="基础用法">
        <BasicForm />
      </Block>
      <Block title="校验规则">
        <FormWithRules />
      </Block>
    </Page>
  )
}

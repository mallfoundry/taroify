# Field 输入框

### 介绍

用户可以在文本框内输入或编辑文字。

### 引入

```tsx
import { Cell, Field, Input } from "@taroify/core";
```

## 代码演示

### 基础用法

可以通过 `value` 设置输入框的值，通过 `placeholder` 设置占位提示文字，通过 `onChange` 事件获得改变的值。

```tsx
import { Cell, Field, Input } from "@taroify/core"

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
```

### 自定义类型

根据 `type` 属性定义不同类型的输入框，默认值为 `text`。

```tsx
import { Cell, Field, Input } from "@taroify/core"

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
```

### 禁用输入框

通过 `readonly` 将输入框设置为只读状态，通过 `disabled` 将输入框设置为禁用状态。

```tsx
import { Cell, Field, Input } from "@taroify/core"

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
```

### 显示图标

通过 `icon` 和 `rightIcon` 配置输入框两侧的图标，通过设置 `clearable` 在输入过程中展示清除图标。

```tsx
import { Cell, Field, Input } from "@taroify/core"

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
```

### 错误提示

设置 `required` 属性表示这是一个必填项，可以配合 `error` 或 `message` 属性显示对应的错误提示。

```tsx
import { Cell, Field, Input } from "@taroify/core"

function ErrorField() {
  return (
    <Cell.Group inset>
      <Field label="用户名" required>
        <Input placeholder="请输入用户名" color="danger" />
      </Field>
      <Field required label="手机号" feedbackStatus="invalid" feedback="手机号格式错误">
        <Input placeholder="请输入手机号" />
      </Field>
    </Cell.Group>
  )
}
```

### 插入按钮

通过 `Field.Button` 可以在输入框尾部插入按钮。

```tsx
import { Cell, Field, Input } from "@taroify/core"

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
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 左侧文本 | _string_ | - |
| labelAlign | 左侧文本对齐方式，可选值为 `center` `right` | _string_ | `left` |
| feedback | 提示文案，为空时不展示 | _string_ | - |
| feedbackAlign | 提示文案对齐方式，可选值为 `center` `right` | _string_ | `left` |
| feedbackStatus | 提示文案状态，可选值为 `valid` `warning` `invalid` | _string_ | - |

> 属性继承自 Form.Item 组件，更多属性参见：[Form.Item 组件](/components/form/#formitem-props)

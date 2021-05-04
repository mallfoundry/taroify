# Dialog 弹出框

### 介绍

弹出模态框，常用于消息提示、消息确认，或在当前页面内完成特定的交互操作，支持函数调用和组件调用两种方式。

### 引入

```tsx
import { Dialog } from "@taroify/core"
// or
import Dialog from "@taroify/core/dialog"
```

## 代码演示

### 消息提示

用于提示一些消息，只包含一个确认按钮。

```tsx
function BasicDialog() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Cell
        title="提示弹窗"
        clickable
        bordered
        endIcon={<ArrowRight />}
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
```

### 消息确认

用于确认消息，包含取消和确认按钮。

```tsx
function ConfirmDialog() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Cell
        title="确认弹窗"
        clickable
        bordered
        endIcon={<ArrowRight />}
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
```

### 圆角按钮风格

将 actions.theme 选项设置为 `round` 可以展示圆角按钮风格的弹窗。

```tsx
function RoundDialog() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Cell
        title="提示弹窗"
        clickable
        bordered
        endIcon={<ArrowRight />}
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
```

## API

### Dialog Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| open | 是否显示弹窗 | _boolean_ | - |
| children | 组件内容 | _ReactNode_ | - |

### Dialog.Header Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 标题内容 | _ReactNode_ | - |

### Dialog.Content Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| align | 文本对齐方式，可选值为 `left` `right` | _string_ | `center` |
| children | 文本内容 | _ReactNode_ | - |

### Dialog.Actions Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| theme | 样式风格，可选值为 `round` | _string_ | `default` |
| children | 按钮内容 | _ReactNode_ | - |

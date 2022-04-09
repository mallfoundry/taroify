# Dialog 弹出框

### 介绍

弹出模态框，常用于消息提示、消息确认，或在当前页面内完成特定的交互操作，支持函数调用和组件调用两种方式。

### 函数调用

由于小程序不支持 DOM 操作，因此需要手动在页面（page）里挂载一个 Dialog 组件并指定 id 为 `dialog`。

```tsx
function ImperativeDialog() {
  return (
    <>
      <Dialog id="dialog" />
      <Cell
        title="提示弹窗"
        clickable
        bordered
        rightIcon={<ArrowRight />}
        onClick={() => Dialog.alert("提示")}
      />
    </>
  )
}
```

### 组件调用

通过组件组合的方式调用 Dialog。

```tsx
function TextDialog() {
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
        <Dialog.Content>提示</Dialog.Content>
        <Dialog.Actions>
          <Button onClick={() => setOpen(false)}>确认</Button>
        </Dialog.Actions>
      </Dialog>
    </>
  )
}
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
```

### 圆角按钮风格

将 actions.variant 选项设置为 `rounded` 可以展示圆角按钮风格的弹窗。

```tsx
function RoundedDialog() {
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
        <Dialog.Actions variant="rounded">
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

| 参数          | 说明       | 类型          | 默认值 |
|-------------|----------|-------------|-----|
| defaultOpen | 默认是否显示弹窗 | _boolean_   | -   |
| open        | 是否显示弹窗   | _boolean_   | -   |
| children    | 组件内容     | _ReactNode_ | -   |

### Dialog.Header Props

| 参数       | 说明   | 类型          | 默认值 |
|----------|------|-------------|-----|
| children | 标题内容 | _ReactNode_ | -   |

### Dialog.Content Props

| 参数       | 说明                         | 类型          | 默认值      |
|----------|----------------------------|-------------|----------|
| align    | 文本对齐方式，可选值为 `left` `right` | _string_    | `center` |
| children | 文本内容                       | _ReactNode_ | -        |

### Dialog.Actions Props

| 参数       | 说明                  | 类型          | 默认值       |
|----------|---------------------|-------------|-----------|
| variant  | 样式风格，可选值为 `rounded` | _string_    | `default` |
| children | 按钮内容                | _ReactNode_ | -         |

### Dialog Options

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| selector | 自定义节点选择器 | _string_ | `toast` |
| className | 自定义类名 | _string_ | - |
| style | 自定义样式 | _CSSProperties_ | - |
| title | 标题 | _ReactNode_ | - |
| message | 文本内容，支持通过 `\n` 换行 | _ReactNode_ | - |
| messageAlign | 内容对齐方式，可选值为 `left` `right` | _string_ | `center` |
| confirm | 确认按钮 | _string \| ButtonProps_ | `确认` |
| cancel | 取消按钮 | _string \| ButtonProps_ | `取消` |
| onConfirm | 确认事件 | _() => void_ | - |
| onCancel | 取消事件 | _() => void_ | - |

### Dialog Methods

| 方法名 | 参数 | 返回值 | 介绍 |
| --- | --- | --- | --- |
| Dialog.open | _options \| message_ | - | 展示弹窗 |
| Dialog.alert | _options \| message_ | - | 展示消息提示弹窗 |
| Dialog.confirm | _options \| message_ | - | 展示消息确认弹窗 |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider](/components/config-provider/) 组件。

| 名称                                               | 默认值                                                     | 描述  |
|--------------------------------------------------|---------------------------------------------------------|-----|
| --dialog-width                                   | _320px * $hd_                                           | -   |
| --dialog-small-screen-width                      | _90%_                                                   | -   |
| --dialog-font-size                               | _var(--font-size-lg)_                                   | -   |
| --dialog-transition                              | _var(--animation-duration-base)_                        | -   |
| --dialog-border-radius                           | _16px * $hd_                                            | -   |
| --dialog-background-color                        | _var(--white)_                                          | -   |
| --dialog-header-font-weight                      | _var(--font-weight-bold)_                               | -   |
| --dialog-header-line-height                      | _24px * $hd_                                            | -   |
| --dialog-header-padding-top                      | _26px * $hd_                                            | -   |
| --dialog-header-isolated-padding                 | _var(--padding-lg) 0_                                   | -   |
| --dialog-message-padding                         | _26px * $hd var(--padding-lg)_                          | -   |
| --dialog-message-font-size                       | _var(--font-size-md)_                                   | -   |
| --dialog-message-line-height                     | _var(--line-height-md)_                                 | -   |
| --dialog-message-max-height                      | _60vh_                                                  | -   |
| --dialog-has-title-message-color                 | _var(--gray-7)_                                         | -   |
| --dialog-has-title-message-padding-top           | _var(--padding-xs)_                                     | -   |
| --dialog-button-height                           | _48px * $hd_                                            | -   |
| --dialog-confirm-button-color                    | _var(--red)_                                            | -   |
| --dialog-footer-rounded-padding                  | _var(--padding-xs) var(--padding-lg) var(--padding-md)_ | -   |
| --dialog-rounded-button-active-color             | _var(--white)_                                          | -   |
| --dialog-rounded-button-font-size                | _var(--font-size-md)_                                   | -   |
| --dialog-rounded-button-height                   | _36px * $hd_                                            | -   |
| --dialog-rounded-button-border-radius            | _var(--border-radius-max)_                              | -   |
| --dialog-rounded-confirm-button-background-color | _var(--gradient-red)_                                   | -   |
| --dialog-rounded-cancel-button-background-color  | _var(--gradient-orange)_                                | -   |

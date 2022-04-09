# Notify 消息提示

### 介绍

在页面顶部展示消息提示，支持函数调用和组件调用两种方式。

### 函数调用

由于小程序不支持 DOM 操作，因此需要手动在页面（page）里挂载一个 Notify 组件并指定 id 为 `notify`。

```tsx
import { Cell, Notify } from "@taroify/core"

function ImperativeNotify() {
  return (
    <>
      <Notify id="notify" />
      <Cell
        title="函数调用"
        clickable
        rightIcon={<ArrowRight />}
        onClick={() => Notify.open("通知内容")}
      />
    </>
  )
}
```

### 组件调用

```tsx
import { Cell, Notify } from "@taroify/core"

function BasicNotify() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Notify open={open} onClose={setOpen}>通知内容</Notify>
      <Cell title="基础用法" clickable onClick={() => setOpen(true)} />
    </>
  )
}
```

## 代码演示

### 基础用法

```tsx
<Notify id="notify" open>通知内容</Notify>
```

### 通知颜色

预设 `primary`、`success`、`warning`、`danger` 四种通知颜色，默认为 `danger`。

```tsx
<Notify open color="primary">通知内容</Notify>
<Notify open color="success">通知内容</Notify>
<Notify open color="danger">通知内容</Notify>
<Notify open color="warning">通知内容</Notify>
```

### 自定义通知

自定义消息通知的颜色和展示时长。

```tsx
<Notify open style={{ color: "#ad0000", background: "#ffe1e1" }}>自定义颜色</Notify>
<Notify open duration={1000}>自定义时长</Notify>
```

## API

### Props

| 参数          | 说明                                    | 类型                         | 默认值      |
|-------------|---------------------------------------|----------------------------|----------|
| className   | 自定义类名                                 | _string_                   | -        |
| style       | 组件样式                                  | _CSSProperties_            | -        |
| defaultOpen | 默认是否显示消息提示                            | _boolean_                  | -        |
| open        | 是否显示消息提示                              | _boolean_                  | -        |
| color       | 类型，可选值为 `primary` `success` `warning` | _string_                   | `danger` |
| duration    | 展示时长(ms)，值为 0 时，notify 不会消失           | _number_                   | `3000`   |
| children    | 展示文案，支持通过`\n`换行                       | _ReactNode_                | -        |
| onClose     | 关闭时的回调函数                              | _(open : boolean) => void_ | -        |

### Options

| 参数        | 说明                                    | 类型                         | 默认值      |
|-----------|---------------------------------------|----------------------------|----------|
| selector  | 自定义节点选择器                              | _string_                   | `notify` |
| className | 自定义类名                                 | _string_                   | -        |
| style     | 组件样式                                  | _CSSProperties_            | -        |
| color     | 类型，可选值为 `primary` `success` `warning` | _string_                   | `danger` |
| duration  | 展示时长(ms)，值为 0 时，notify 不会消失           | _number_                   | `3000`   |
| message   | 展示文案，支持通过`\n`换行                       | _ReactNode_                | -        |
| onClose   | 关闭时的回调函数                              | _(open : boolean) => void_ | -        |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider](/components/config-provider/) 组件。

| 名称                                | 默认值                                   | 描述  |
|-----------------------------------|---------------------------------------|-----|
| --notify-color                    | _var(--white)_                        | -   |
| --notify-padding                  | _var(--padding-xs) var(--padding-md)_ | -   |
| --notify-font-size                | _var(--font-size-md)_                 | -   |
| --notify-line-height              | _var(--line-height-md)_               | -   |
| --notify-primary-background-color | _var(--primary-color)_                | -   |
| --notify-success-background-color | _var(--success-color)_                | -   |
| --notify-warning-background-color | _var(--warning-color)_                | -   |
| --notify-danger-background-color  | _var(--danger-color)_                 | -   |

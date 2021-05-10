# Notify 消息提示

### 介绍

在页面顶部展示消息提示。

### 函数调用

```js
import { Notify } from "@taroify/core"
// or
import Notify from "@taroify/core/notify"
```

## 代码演示

### 基础用法

```tsx
<Notify open>通知内容</Notify>
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

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| open | 是否显示消息提示 | _boolean_ | - |
| className | 自定义类名 | _string_ | - |
| style | 组件样式 | _CSSProperties_ | - |
| color | 类型，可选值为 `primary` `success` `warning` | _string_ | `danger` |
| duration | 展示时长(ms)，值为 0 时，notify 不会消失 | _number_ | `3000` |
| children | 展示文案，支持通过`\n`换行 | _ReactNode_ | - |
| onClose | 关闭时的回调函数 | _(open : boolean) => void_ | - |

# Sidebar 侧边导航

### 介绍

垂直展示的导航栏，用于在不同的内容区域之间进行切换。

### 引入

```ts
import { Sidebar } from "@taroify/core"
```

## 代码演示

### 基础用法

```tsx
<Sidebar>
  <Sidebar.Tab>标签名</Sidebar.Tab>
  <Sidebar.Tab>标签名</Sidebar.Tab>
  <Sidebar.Tab>标签名</Sidebar.Tab>
</Sidebar>
```

### 徽标提示

设置 `badge` 属性后，会在右上角展示相应的徽标。

```tsx
<Sidebar>
  <Sidebar.Tab badge>标签名</Sidebar.Tab>
  <Sidebar.Tab badge="5">标签名</Sidebar.Tab>
  <Sidebar.Tab badge="20">标签名</Sidebar.Tab>
</Sidebar>
```

### 禁用选项

通过 `disabled` 属性禁用选项。

```tsx
<Sidebar>
  <Sidebar.Tab>标签名</Sidebar.Tab>
  <Sidebar.Tab disabled>标签名</Sidebar.Tab>
  <Sidebar.Tab>标签名</Sidebar.Tab>
</Sidebar>
```

### 监听切换事件

设置 `onChange` 方法来监听切换导航项时的事件。

```tsx
import { Sidebar } from "@taroify/core"

function EventSidebar() {
  return (
    <>
      <Toast id="toast" />
      <Sidebar onChange={(newValue, { children }: Sidebar.TabObject) => Toast.open(children)}>
        <Sidebar.Tab>标签名 1</Sidebar.Tab>
        <Sidebar.Tab>标签名 2</Sidebar.Tab>
        <Sidebar.Tab>标签名 3</Sidebar.Tab>
      </Sidebar>
    </>
  )
}
```

## API

### Sidebar Props

| 参数    | 说明             | 类型               | 默认值 |
| ------- | ---------------- | ------------------ | ------ |
| defaultValue | 默认导航项的索引 | _number \| string_ | `0`    |
| value | 当前导航项的索引 | _number \| string_ | `0`    |

### Sidebar Events

| 事件名 | 说明             | 回调参数        |
| ------ | ---------------- | --------------- |
| onChange | 切换导航项时触发 | _value: any, tab: Sidebar.TabObject_ |

### Sidebar.Tab Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| badge | 图标右上角徽标的内容 | _boolean \| number \| string \| Badge_ | - |
| disabled | 是否禁用该项 | _boolean_ | `false` |
| children | 内容 | _ReactNode_ | - |

### Sidebar.Tab Events

| 事件名 | 说明       | 回调参数        |
| ------ | ---------- | --------------- |
| onClick  | 点击时触发 | _event: ITouchEvent_|

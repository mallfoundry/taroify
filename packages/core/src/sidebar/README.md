# Sidebar 侧边导航

### 介绍

垂直展示的导航栏，用于在不同的内容区域之间进行切换。

### 引入

```ts
import { Sidebar } from "@taroify/core"
// or
import Sidebar from "@taroify/core/sidebar"
```

## 代码演示

### 基础用法

通过 `activeKey` 绑定当前选中项的索引。

```tsx
import { Sidebar } from "@taroify/core"

function BasicSidebar() {
  const [activeKey, setActiveKey] = useState<Sidebar.TabKey>(0)
  return (
    <Sidebar activeKey={activeKey} onChange={({ key }) => setActiveKey(key)}>
      <Sidebar.Tab>标签名</Sidebar.Tab>
      <Sidebar.Tab>标签名</Sidebar.Tab>
      <Sidebar.Tab>标签名</Sidebar.Tab>
    </Sidebar>
  )
}
```

### 徽标提示

设置 `dot` 属性后，会在右上角展示一个小红点；设置 `badge` 属性后，会在右上角展示相应的徽标。

```tsx
import { Sidebar } from "@taroify/core"

function BadgeSidebar() {
  const [activeKey, setActiveKey] = useState<Sidebar.TabKey>(0)
  return (
    <Sidebar activeKey={activeKey} onChange={({ key }) => setActiveKey(key)}>
      <Sidebar.Tab dot>标签名</Sidebar.Tab>
      <Sidebar.Tab badge="5">标签名</Sidebar.Tab>
      <Sidebar.Tab badge="20">标签名</Sidebar.Tab>
    </Sidebar>
  )
}
```

### 禁用选项

通过 `disabled` 属性禁用选项。

```tsx
import { Sidebar } from "@taroify/core"

function DisableSidebar() {
  const [activeKey, setActiveKey] = useState<Sidebar.TabKey>(0)
  return (
    <Sidebar activeKey={activeKey} onChange={({ key }) => setActiveKey(key)}>
      <Sidebar.Tab>标签名</Sidebar.Tab>
      <Sidebar.Tab disabled>标签名</Sidebar.Tab>
      <Sidebar.Tab>标签名</Sidebar.Tab>
    </Sidebar>
  )
}

```

### 监听切换事件

设置 `change` 方法来监听切换导航项时的事件。

```tsx
import { Sidebar } from "@taroify/core"

function EventSidebar() {
  const [activeKey, setActiveKey] = useState<Sidebar.TabKey>(0)
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState<ReactNode>()

  function handleChange(event: Sidebar.TabEvent) {
    setActiveKey(event.key)
    setOpen(true)
    setMessage(event.title)
  }

  return (
    <>
      <Sidebar activeKey={activeKey} onChange={handleChange}>
        <Sidebar.Tab>标签名 1</Sidebar.Tab>
        <Sidebar.Tab>标签名 2</Sidebar.Tab>
        <Sidebar.Tab>标签名 3</Sidebar.Tab>
      </Sidebar>
      <Toast open={open} children={message} onClose={() => setOpen(false)} />
    </>
  )
}
```

## API

### Sidebar Props

| 参数    | 说明             | 类型               | 默认值 |
| ------- | ---------------- | ------------------ | ------ |
| activeKey | 当前导航项的索引 | _number \| string_ | `0`    |

### Sidebar Events

| 事件名 | 说明             | 回调参数        |
| ------ | ---------------- | --------------- |
| onChange | 切换导航项时触发 | _event: Sidebar.TabEvent_ |
| onClick | 点击导航项时触发 | _event: Sidebar.TabEvent_ |

### Sidebar.Tab Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| dot | 是否显示右上角小红点 | _boolean_ | `false` |
| badge | 图标右上角徽标的内容 | _number \| string_ | - |
| disabled | 是否禁用该项 | _boolean_ | `false` |
| children | 内容 | _ReactNode_ | `''` |

### Sidebar.Tab Events

| 事件名 | 说明       | 回调参数        |
| ------ | ---------- | --------------- |
| onClick  | 点击时触发 | _event: Sidebar.TabEvent_|

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

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider](/components/config-provider/) 组件。

| 名称                                           | 默认值                                   | 描述  |
|----------------------------------------------|---------------------------------------|-----|
| --sidebar-width                              | _80px * $hd_                          | -   |
| --sidebar-disabled-color                     | _var(--gray-5)_                       | -   |
| --sidebar-tab-font-size                      | _var(--font-size-md)_                 | -   |
| --sidebar-tab-line-height                    | _var(--line-height-md)_               | -   |
| --sidebar-tab-color                          | _var(--text-color)_                   | -   |
| --sidebar-tab-padding                        | _20px * $hd var(--padding-sm)_        | -   |
| --sidebar-tab-background-color               | _var(--background-color)_             | -   |
| --sidebar-tab-active-background-color        | _var(--active-color)_                 | -   |
| --sidebar-tab-active-font-weight             | _var(--font-weight-bold)_             | -   |
| --sidebar-tab-active-color                   | _var(--text-color)_                   | -   |
| --sidebar-tab-active-border-width            | _4px * $hd_                           | -   |
| --sidebar-tab-active-border-height           | _16px * $hd_                          | -   |
| --sidebar-tab-active-border-color            | _var(--red)_                          | -   |
| --sidebar-tab-active-active-background-color | _var(--white)_                        | -   |
| --sidebar-tab-disabled-color                 | _var(--sidebar-disabled-color)_       | -   |
| --sidebar-tab-disabled-background-color      | _var(--sidebar-tab-background-color)_ | -   |

# Tabs 标签页

### 介绍

选项卡组件，用于在不同的内容区域之间进行切换。

### 引入

```ts
import { Tabs } from "@taroify/core"
// or
import Tabs from "@taroify/core/tabs"
```

## 代码演示

### 基础用法

通过 `activeKey` 绑定当前激活标签对应的索引值，默认情况下启用第一个标签。

```tsx
import { Tabs } from "@taroify/core"

function BasicTabs() {
  const [activeKey, setActiveKey] = useState<Tabs.TabKey>(0)

  return (
    <Tabs activeKey={activeKey} ellipsis={false} onChange={({ key }) => setActiveKey(key)}>
      <Tabs.TabPane title="标签 1">内容 1</Tabs.TabPane>
      <Tabs.TabPane title="标签 2">内容 2</Tabs.TabPane>
      <Tabs.TabPane title="标签 3">内容 3</Tabs.TabPane>
      <Tabs.TabPane title="标签 4">内容 4</Tabs.TabPane>
    </Tabs>
  )
}
```

### 通过标识匹配

在标签指定 `key` 属性的情况下，`activeKey` 的值为当前标签的 `key`（此时无法通过索引值来匹配标签）。

```tsx
import { Tabs } from "@taroify/core"

function KeyedTabs() {
  const [activeKey, setActiveKey] = useState<Tabs.TabKey>("a")

  return (
    <Tabs activeKey={activeKey} ellipsis={false} onChange={({ key }) => setActiveKey(key)}>
      <Tabs.TabPane key="a" title="标签 1">
        内容 1
      </Tabs.TabPane>
      <Tabs.TabPane key="b" title="标签 2">
        内容 2
      </Tabs.TabPane>
      <Tabs.TabPane key="c" title="标签 3">
        内容 3
      </Tabs.TabPane>
      <Tabs.TabPane key="d" title="标签 4">
        内容 4
      </Tabs.TabPane>
    </Tabs>
  )
}
```

### 标签栏滚动

标签数量超过 5 个时，标签栏可以在水平方向上滚动，切换时会自动将当前标签居中。

```tsx
import { Tabs } from "@taroify/core"

function ScrollTabs() {
  const [activeKey, setActiveKey] = useState<Tabs.TabKey>(0)

  return (
    <Tabs activeKey={activeKey} onChange={({ key }) => setActiveKey(key)}>
      <Tabs.TabPane title="标签 1">内容 1</Tabs.TabPane>
      <Tabs.TabPane title="标签 2">内容 2</Tabs.TabPane>
      <Tabs.TabPane title="标签 3">内容 3</Tabs.TabPane>
      <Tabs.TabPane title="标签 4">内容 4</Tabs.TabPane>
      <Tabs.TabPane title="标签 5">内容 5</Tabs.TabPane>
      <Tabs.TabPane title="标签 6">内容 6</Tabs.TabPane>
      <Tabs.TabPane title="标签 7">内容 7</Tabs.TabPane>
    </Tabs>
  )
}
```

### 禁用标签

设置 `disabled` 属性即可禁用标签，如果需要监听禁用标签的点击事件，可以在 `Tabs` 上监听`onClick` 事件。

```tsx
import { Tabs } from "@taroify/core"

function DisableTabs() {
  const [activeKey, setActiveKey] = useState<Tabs.TabKey>(0)
  return (
    <Tabs activeKey={activeKey} onChange={({ key }) => setActiveKey(key)}>
      <Tabs.TabPane title="标签 1">内容 1</Tabs.TabPane>
      <Tabs.TabPane title="标签 2" disabled>
        内容 2
      </Tabs.TabPane>
      <Tabs.TabPane title="标签 3">内容 3</Tabs.TabPane>
    </Tabs>
  )
}
```

### 样式风格

`Tabs` 支持两种样式风格：`line` 和`card`，默认为 `line` 样式，可以通过 `theme` 属性切换样式风格。

```tsx
import { Tabs } from "@taroify/core"

function CardTabs() {
  const [activeKey, setActiveKey] = useState<Tabs.TabKey>(0)

  return (
    <Tabs activeKey={activeKey} theme="card" onChange={({ key }) => setActiveKey(key)}>
      <Tabs.TabPane title="标签 1">内容 1</Tabs.TabPane>
      <Tabs.TabPane title="标签 2">内容 2</Tabs.TabPane>
      <Tabs.TabPane title="标签 3">内容 3</Tabs.TabPane>
    </Tabs>
  )
}

```

### 点击事件

可以在 `Tabs` 上绑定 `onClick` 事件，事件传参为标签对应的标识符和标题。

```tsx
import { Tabs, Toast } from "@taroify/core"

function ClickTabs() {
  const [activeKey, setActiveKey] = useState<Tabs.TabKey>(0)
  const [message, setMessage] = useState<ReactNode>("")
  const [open, setOpen] = useState(false)

  function handleClick(event: Tabs.TabEvent) {
    setOpen(true)
    setMessage(event.title)
  }

  return (
    <>
      <Tabs activeKey={activeKey} onClick={handleClick} onChange={({ key }) => setActiveKey(key)}>
        <Tabs.TabPane title="标签 1">内容 1</Tabs.TabPane>
        <Tabs.TabPane title="标签 2">内容 2</Tabs.TabPane>
        <Tabs.TabPane title="标签 3">内容 3</Tabs.TabPane>
      </Tabs>
      <Toast open={open} onClose={() => setOpen(false)}>
        {message}
      </Toast>
    </>
  )
}
```

### 自定义标签

通过 `title` 插槽可以自定义标签内容。

```tsx
import { Tabs } from "@taroify/core"
import { MoreOutlined } from "@taroify/icons"

function CustomTitleTabs() {
  const [activeKey, setActiveKey] = useState<Tabs.TabKey>(0)

  return (
    <Tabs activeKey={activeKey} onChange={({ key }) => setActiveKey(key)}>
      <Tabs.TabPane
        title={
          <>
            <MoreOutlined /> 标签 1
          </>
        }
      >
        内容 1
      </Tabs.TabPane>
      <Tabs.TabPane
        title={
          <>
            <MoreOutlined /> 标签 2
          </>
        }
      >
        内容 2
      </Tabs.TabPane>
      <Tabs.TabPane
        title={
          <>
            <MoreOutlined /> 标签 3
          </>
        }
      >
        内容 3
      </Tabs.TabPane>
    </Tabs>
  )
}
```

```scss
.taroify-icon {
  margin-right: 5px * 2;
  vertical-align: -2px * 2;
}
```

## API

### Tabs Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| activeKey | 绑定当前选中标签的标识符 | _number \| string_ | `0` |
| theme | 样式风格类型，可选值为 `card` | _string_ | `line` |
| themeColor | 标签主题色 | _string_ | `#ee0a24` |
| background | 标签栏背景色 | _string_ | `white` |
| duration | 动画时间，单位秒 | _number \| string_ | `0.3` |
| lineWidth | 底部条宽度，默认单位 `px` | _number \| string_ | `40px` |
| lineHeight | 底部条高度，默认单位 `px` | _number \| string_ | `3px` |
| animated | 是否开启切换标签内容时的转场动画 | _boolean_ | `false` |
| bordered | 是否显示标签栏外边框，仅在 `type="line"` 时有效 | _boolean_ | `false` |
| ellipsis | 是否省略过长的标题文字 | _boolean_ | `true` |
| sticky | 是否使用粘性定位布局 | _boolean_ | `false` |
| swipeable | 是否开启手势左右滑动切换 | _boolean_ | `false` |
| scrollspy | 是否开启滚动导航 | _boolean_ | `false` |
| offsetTop | 粘性定位布局下与顶部的最小距离，支持 `px` `vw` `vh` `rem` 单位，默认 `px` | _number \| string_ | `0` |
| swipeThreshold | 滚动阈值，标签数量超过阈值且总宽度超过标签栏宽度时开始横向滚动 | _number \| string_ | `5` |
| activeColor | 标题选中态颜色 | _string_ | - |
| inactiveColor | 标题默认态颜色 | _string_ | - |
| before-change | 切换标签前的回调函数，返回 `false` 可阻止切换，支持返回 Promise | _(name) => boolean \| Promise_ | - |

### TabPane Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| key | 标签标识，作为匹配的标识符 | _number \| string_ | 标签的索引值 |
| title | 标题 | _string_ | - |
| disabled | 是否禁用标签 | _boolean_ | `false` |
| dot | 是否在标题右上角显示小红点 | _boolean_ | `false` |
| badge | 图标右上角徽标的内容 | _number \| string_ | - |

### Tabs Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| onClick | 点击标签时触发 | _event : Tabs.TabEvent_ |
| onChange | 当前激活的标签改变时触发 | _event : Tabs.TabEvent_ |

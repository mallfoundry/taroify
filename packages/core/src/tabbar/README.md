# Tabbar 标签栏

### 介绍

底部导航栏，用于在不同页面之间进行切换。

### 引入

```ts
import { Tabbar } from "@taroify/core"
// or
import Tabbar from "@taroify/core/tabbar"
```

## 代码演示

### 基础用法

`activeKey` 默认绑定选中标签的索引值，通过修改 `activeKey` 即可切换选中的标签。

```tsx
import { Tabbar } from "@taroify/core"
import { FriendsOutlined, HomeOutlined, Search, SettingOutlined } from "@taroify/icons"

function BasicTabbar() {
  const [activeKey, setActiveKey] = useState<Tabbar.Key>(0)
  return (
    <Tabbar activeKey={activeKey} onChange={setActiveKey}>
      <Tabbar.TabItem icon={<HomeOutlined />} label="标签" />
      <Tabbar.TabItem icon={<Search />} label="标签" />
      <Tabbar.TabItem icon={<FriendsOutlined />} label="标签" />
      <Tabbar.TabItem icon={<SettingOutlined />} label="标签" />
    </Tabbar>
  )
}
```

### 通过标识匹配

在标签指定 `key` 属性的情况下，`activeKey` 的值为当前标签的 `key`。

```tsx
import { Tabbar } from "@taroify/core"
import { FriendsOutlined, HomeOutlined, Search, SettingOutlined } from "@taroify/icons"

function KeyTabbar() {
  const [activeKey, setActiveKey] = useState<Tabbar.Key>("1")
  return (
    <Tabbar activeKey={activeKey} onChange={setActiveKey}>
      <Tabbar.TabItem key="1" icon={<HomeOutlined />} label="标签" />
      <Tabbar.TabItem key="2" icon={<Search />} label="标签" />
      <Tabbar.TabItem key="3" icon={<FriendsOutlined />} label="标签" />
      <Tabbar.TabItem key="4" icon={<SettingOutlined />} label="标签" />
    </Tabbar>
  )
}
```

### 自定义颜色

通过 `activeColor` 属性设置选中标签的颜色，通过 `inactiveColor` 属性设置未选中标签的颜色。

```tsx
import { Tabbar } from "@taroify/core"
import { FriendsOutlined, HomeOutlined, Search, SettingOutlined } from "@taroify/icons"

function CustomColorTabbar() {
  const [activeKey, setActiveKey] = useState<Tabbar.Key>("1")
  return (
    <Tabbar activeKey={activeKey} activeColor="#ee0a24" inactiveColor="#000" onChange={setActiveKey}>
      <Tabbar.TabItem key="1" icon={<HomeOutlined />} label="标签" />
      <Tabbar.TabItem key="2" icon={<Search />} label="标签" />
      <Tabbar.TabItem key="3" icon={<FriendsOutlined />} label="标签" />
      <Tabbar.TabItem key="4" icon={<SettingOutlined />} label="标签" />
    </Tabbar>
  )
}
```

## API

### Tabbar Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| activeKey | 当前选中标签的标识或索引值 | _number \| string_ | `0` |
| fixed | 是否固定在底部 | _boolean_ | `true` |
| bordered | 是否显示外边框 | _boolean_ | `true` |
| zIndex | 元素 z-index | _number \| string_ | `1` |
| activeColor | 选中标签的颜色 | _string_ | `#1989fa` |
| inactiveColor | 未选中标签的颜色 | _string_ | `#7d7e80` |

### Tabbar Events

| 事件名 | 说明           | 回调参数                   |
| ------ | -------------- | -------------------------- |
| change | 切换标签时触发 | _activeKey: number \| string_ |

### Tabbar.TabItem Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| key | 标签标识，作为匹配的标识符 | _number \| string_ | 当前标签的索引值 |
| label | 标签名 | _ReactNode_ | - |
| icon | [图标名称](/components/icon)或图片链接 | _ReactNode_ | - |
| dot | 是否显示图标右上角小红点 | _boolean_ | `false` |
| badge | 图标右上角徽标的内容 | _number \| string_ | - |

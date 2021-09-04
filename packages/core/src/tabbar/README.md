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

`value` 默认绑定选中标签的索引值，通过 `onChange` 事件修改索引值即可切换选中的标签。

```tsx
import { Tabbar } from "@taroify/core"
import { FriendsOutlined, HomeOutlined, Search, SettingOutlined } from "@taroify/icons"

function BasicTabbar() {
  const [value, setValue] = useState(0)
  return (
    <Tabbar value={value} onChange={(_, newValue) => setValue(newValue)}>
      <Tabbar.Item icon={<HomeOutlined />}>标签</Tabbar.Item>
      <Tabbar.Item icon={<Search />}>标签</Tabbar.Item>
      <Tabbar.Item icon={<FriendsOutlined />}>标签</Tabbar.Item>
      <Tabbar.Item icon={<SettingOutlined />}>标签</Tabbar.Item>
    </Tabbar>
  )
}
```

### 通过标识匹配

在标签指定 `key` 属性的情况下，`value` 的值为当前标签的 `key`。

```tsx
import { Tabbar } from "@taroify/core"
import { FriendsOutlined, HomeOutlined, Search, SettingOutlined } from "@taroify/icons"

function KeyTabbar() {
  const [value, setValue] = useState("1")
  return (
    <Tabbar value={value} onChange={(_, newValue) => setValue(newValue)}>
      <Tabbar.Item key="1" icon={<HomeOutlined />}>
        标签
      </Tabbar.Item>
      <Tabbar.Item key="2" icon={<Search />}>
        标签
      </Tabbar.Item>
      <Tabbar.Item key="3" icon={<FriendsOutlined />}>
        标签
      </Tabbar.Item>
      <Tabbar.Item key="4" icon={<SettingOutlined />}>
        标签
      </Tabbar.Item>
    </Tabbar>
  )
}

```
### 徽标提示

设置 `badge` 属性为 `true` 后，会在图标右上角展示一个小红点；设置 `badge` 属性为 `number` 后，会在图标右上角展示相应的徽标。

```tsx
import { Badge, Tabbar } from "@taroify/core"
import { FriendsOutlined, HomeOutlined, Search, SettingOutlined } from "@taroify/icons"

function BadgeTabbar() {
  const [value, setValue] = useState(0)
  return (
    <Tabbar value={value} onChange={(_, newValue) => setValue(newValue)}>
      <Tabbar.Item icon={<HomeOutlined />}>标签</Tabbar.Item>
      <Tabbar.Item badge icon={<Search />}>
        标签
      </Tabbar.Item>
      <Tabbar.Item badge="5" icon={<FriendsOutlined />}>
        标签
      </Tabbar.Item>
      <Tabbar.Item badge={<Badge content={100} max={99} />} icon={<SettingOutlined />}>
        标签
      </Tabbar.Item>
    </Tabbar>
  )
}
```

### 自定义颜色

通过 css 设置设置选中或未选择标签的颜色。

```tsx
import { Tabbar } from "@taroify/core"
import { FriendsOutlined, HomeOutlined, Search, SettingOutlined } from "@taroify/icons"

function TabbarWithCustomColor() {
  const [value, setValue] = useState(0)
  return (
    <Tabbar className="custom-color" value={value} onChange={(_, newValue) => setValue(newValue)}>
      <Tabbar.Item icon={<HomeOutlined />}>标签</Tabbar.Item>
      <Tabbar.Item icon={<Search />}>标签</Tabbar.Item>
      <Tabbar.Item icon={<FriendsOutlined />}>标签</Tabbar.Item>
      <Tabbar.Item icon={<SettingOutlined />}>标签</Tabbar.Item>
    </Tabbar>
  )
}
```

```scss
.custom-color {
  .taroify-tabbar-item {
    color: #000;

    &--active {
      color: #ee0a24;
    }
  }
}
```

## API

### Tabbar Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前选中标签的标识或索引值 | _any_ | `0` |
| bordered | 是否显示外边框 | _boolean_ | `false` |
| fixed | 是否固定在底部 | _boolean_ | `false` |
| placeholder | 固定在底部时，是否在标签位置生成一个等高的占位元素 | _boolean_ | `false` |
| zIndex | 元素 z-index | _number \| string_ | `1` |

### Tabbar Events

| 事件名 | 说明           | 回调参数                   |
| ------ | -------------- | -------------------------- |
| onChange | 切换标签时触发 | _event: ITouchEvent, value: any_ |

### Tabbar.Item Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| key | 标签标识，作为匹配的标识符 | _number \| string_ | 当前标签的索引值 |
| icon | 图标或图片链接 | _ReactNode_ | - |
| badge | 图标右上角徽标的内容 | _boolean \| number \| string \| Badge_ | - |
| children | 标签名 | _ReactNode_ | - |

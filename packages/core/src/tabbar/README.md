# Tabbar 标签栏

### 介绍

底部导航栏，用于在不同页面之间进行切换。

### 引入

```ts
import { Tabbar } from "@taroify/core"
```

## 代码演示

### 基础用法

```tsx
import { Tabbar } from "@taroify/core"
import { FriendsOutlined, HomeOutlined, Search, SettingOutlined } from "@taroify/icons"

function BasicTabbar() {
  return (
    <Tabbar>
      <Tabbar.TabItem icon={<HomeOutlined />}>标签</Tabbar.TabItem>
      <Tabbar.TabItem icon={<Search />}>标签</Tabbar.TabItem>
      <Tabbar.TabItem icon={<FriendsOutlined />}>标签</Tabbar.TabItem>
      <Tabbar.TabItem icon={<SettingOutlined />}>标签</Tabbar.TabItem>
    </Tabbar>
  )
}

```

### 通过标识匹配

在标签 `Tabbar.TabItem` 指定 `value` 属性的情况下，`value` 的值为当前标签的 `value`。

```tsx
import { Tabbar } from "@taroify/core"
import { FriendsOutlined, HomeOutlined, Search, SettingOutlined } from "@taroify/icons"

function KeyTabbar() {
  return (
    <Tabbar defaultValue="1">
      <Tabbar.TabItem value="1" icon={<HomeOutlined />}>
        标签
      </Tabbar.TabItem>
      <Tabbar.TabItem value="2" icon={<Search />}>
        标签
      </Tabbar.TabItem>
      <Tabbar.TabItem value="3" icon={<FriendsOutlined />}>
        标签
      </Tabbar.TabItem>
      <Tabbar.TabItem value="4" icon={<SettingOutlined />}>
        标签
      </Tabbar.TabItem>
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
  return (
    <Tabbar>
      <Tabbar.TabItem icon={<HomeOutlined />}>标签</Tabbar.TabItem>
      <Tabbar.TabItem badge icon={<Search />}>
        标签
      </Tabbar.TabItem>
      <Tabbar.TabItem badge="5" icon={<FriendsOutlined />}>
        标签
      </Tabbar.TabItem>
      <Tabbar.TabItem badge={<Badge content={100} max={99} />} icon={<SettingOutlined />}>
        标签
      </Tabbar.TabItem>
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
  return (
    <Tabbar className="custom-color">
      <Tabbar.TabItem icon={<HomeOutlined />}>标签</Tabbar.TabItem>
      <Tabbar.TabItem icon={<Search />}>标签</Tabbar.TabItem>
      <Tabbar.TabItem icon={<FriendsOutlined />}>标签</Tabbar.TabItem>
      <Tabbar.TabItem icon={<SettingOutlined />}>标签</Tabbar.TabItem>
    </Tabbar>
  )
}
```

```scss
.custom-color {
  --tabbar-item-color: #000;
  --tabbar-item-active-color: #ee0a24;
}
```

## API

### Tabbar Props

| 参数           | 说明                        | 类型        | 默认值     |
|--------------|---------------------------|-----------|---------|
| defaultValue | 默认选中标签的标识或索引值             | _any_     | `0`     |
| value        | 当前选中标签的标识或索引值             | _any_     | `0`     |
| bordered     | 是否显示外边框                   | _boolean_ | `false` |
| fixed        | 是否固定在底部                   | _boolean_ | `false` |
| safeArea     | 安全区域，可选值 `top` `bottom`   | _string_  | -       |
| placeholder  | 固定在底部时，是否在标签位置生成一个等高的占位元素 | _boolean_ | `false` |

### Tabbar Events

| 事件名 | 说明           | 回调参数                   |
| ------ | -------------- | -------------------------- |
| onChange | 切换标签时触发 | _value: any_ |

### Tabbar.TabItem Props

| 参数       | 说明                                             | 类型          | 默认值      |
|----------|------------------------------------------------|-------------|----------|
| value    | 标签值，作为匹配的标识符                                   | _any_       | -        |
| icon     | [图标](/components/icon)或[图片](/components/image) | _ReactNode_ | -        |
| badge    | 图标右上角徽标的内容                                     | _boolean \  | number \ | string \| Badge_ | - |
| children | 标签名                                            | _ReactNode_ | -        |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider](/components/config-provider/) 组件。

| 名称                                    | 默认值                   | 描述  |
|---------------------------------------|-----------------------|-----|
| --tabbar-height                       | _50px * $hd_          | -   |
| --tabbar-z-index                      | _1_                   | -   |
| --tabbar-background-color             | _var(--white)_        | -   |
| --tabbar-item-font-size               | _var(--font-size-sm)_ | -   |
| --tabbar-item-color                   | _var(--gray-7)_       | -   |
| --tabbar-item-line-height             | _1_                   | -   |
| --tabbar-item-icon-size               | _22px * $hd_          | -   |
| --tabbar-item-margin-bottom           | _4px * $hd_           | -   |
| --tabbar-item-active-color            | _var(--blue)_         | -   |
| --tabbar-item-active-background-color | _var(--white)_        | -   |

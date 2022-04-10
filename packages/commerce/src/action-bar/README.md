# ActionBar 动作栏

### 介绍

用于为页面相关操作提供便捷交互。

### 引入

```tsx
import { ActionBar } from "@taroify/commerce"
// or
import ActionBar from "@taroify/commerce/action-bar"
```

## 代码演示

### 基础用法

```tsx
import { ActionBar } from "@taroify/commerce"
import { CartOutlined, ChatOutlined, ShopOutlined } from "@taroify/icons"
import { Text } from "@tarojs/components"

function BasicActionBar() {
  return (
    <ActionBar>
      <ActionBar.IconButton>
        <ChatOutlined />
        <Text>客服</Text>
      </ActionBar.IconButton>
      <ActionBar.IconButton>
        <CartOutlined />
        <Text>购物车</Text>
      </ActionBar.IconButton>
      <ActionBar.IconButton>
        <ShopOutlined />
        <Text>店铺</Text>
      </ActionBar.IconButton>
      <ActionBar.Button>立即购买</ActionBar.Button>
    </ActionBar>
  )
}
```

### 徽标提示

在 ActionBar.IconButton 组件上设置 `badge` 属性后，会在图标右上角展示一个小红点；设置 `badge` 属性后，会在图标右上角展示相应的徽标。

```tsx
import { ActionBar } from "@taroify/commerce"
import { CartOutlined, ChatOutlined, ShopOutlined } from "@taroify/icons"
import { Text } from "@tarojs/components"

function ActionBarWithBadges() {
  return (
    <ActionBar>
      <ActionBar.IconButton badge>
        <ChatOutlined />
        <Text>客服</Text>
      </ActionBar.IconButton>
      <ActionBar.IconButton badge="5">
        <CartOutlined />
        <Text>购物车</Text>
      </ActionBar.IconButton>
      <ActionBar.IconButton badge="12">
        <ShopOutlined />
        <Text>店铺</Text>
      </ActionBar.IconButton>
      <ActionBar.ButtonGroup>
        <ActionBar.Button color="warning">加入购物车</ActionBar.Button>
        <ActionBar.Button color="danger">立即购买</ActionBar.Button>
      </ActionBar.ButtonGroup>
    </ActionBar>
  )
}
```

### 自定义图标颜色

通过设置图标的 `color` 属性可以自定义图标的颜色。

```tsx
import { ActionBar } from "@taroify/commerce"
import { CartOutlined, ChatOutlined, Star } from "@taroify/icons"
import { Text } from "@tarojs/components"

function ActionBarWithCustomIconButton() {
  return (
    <ActionBar>
      <ActionBar.IconButton>
        <ChatOutlined color="#ee0a24" />
        <Text>客服</Text>
      </ActionBar.IconButton>
      <ActionBar.IconButton>
        <CartOutlined />
        <Text>购物车</Text>
      </ActionBar.IconButton>
      <ActionBar.IconButton>
        <Star color="#ff5000" />
        <Text>已收藏</Text>
      </ActionBar.IconButton>
      <ActionBar.ButtonGroup>
        <ActionBar.Button color="danger">加入购物车</ActionBar.Button>
        <ActionBar.Button color="warning">立即购买</ActionBar.Button>
      </ActionBar.ButtonGroup>
    </ActionBar>
  )
}
```

### 自定义按钮颜色

通过 ActionBar.Button 的 `style` 属性可以自定义按钮的颜色，支持传入 `linear-gradient` 渐变色。

```tsx
import { ActionBar } from "@taroify/commerce"
import { CartOutlined, ChatOutlined } from "@taroify/icons"
import { Text } from "@tarojs/components"

function ActionBarWithCustomButton() {
  return (
    <ActionBar>
      <ActionBar.IconButton>
        <ChatOutlined />
        <Text>客服</Text>
      </ActionBar.IconButton>
      <ActionBar.IconButton>
        <CartOutlined />
        <Text>购物车</Text>
      </ActionBar.IconButton>
      <ActionBar.ButtonGroup>
        <ActionBar.Button style={{ background: "#be99ff" }}>加入购物车</ActionBar.Button>
        <ActionBar.Button style={{ background: "#7232dd" }}>立即购买</ActionBar.Button>
      </ActionBar.ButtonGroup>
    </ActionBar>
  )
}
```

## API

### ActionBar Props

| 参数          | 说明                        | 类型        | 默认值     |
|-------------|---------------------------|-----------|---------|
| fixed       | 是否固定在底部                   | _boolean_ | `false` |
| safeArea    | 安全区域，可选值 `top` `bottom`   | _string_  | -       |
| placeholder | 固定在底部时，是否在标签位置生成一个等高的占位元素 | _boolean_ | `false` |

### ActionBar.ButtonGroup Props

| 参数        | 说明                          |  类型  | 默认值 |
|-----------|-------------------------------|--------| --- |
| flex      | 列元素宽度                      | _number_ | - |
| shape     | 按钮形状,可选值为 `square` | _string_ | `round` |

### ActionBar.Button Props

| 参数        | 说明                         | 类型 | 默认值 |
|-----------|----------------------------| --- | --- |
| shape     | 按钮形状,可选值为 `square` | _string_ | `round` |
| color     | 按钮颜色,可选值为 `primary` `info` `success` `warning` | _string_ | `danger` |
| icon | 左侧[图标](/components/icon)或[图片](/components/image) | _ReactNode_ | - |
| disabled | 是否禁用按钮 | _boolean_ | `false` |
| loading | 是否显示为加载状态 | _boolean \| [LoadingProps](/components/loading/#props)_ | `false` |

### ActionBar.IconButton Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| badge  | 徽标内容    | _boolean \| number \| string \| [Badge](/components/badge)_  | - |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider](/components/config-provider/) 组件。

| 名称                                      | 默认值                            | 描述  |
|-----------------------------------------|--------------------------------|-----|
| --action-bar-color                      | _var(--gray-6)_                | -   |
| --action-bar-height                     | _50px * $hd_                   | -   |
| --action-bar-background                 | _var(--action-bar-background)_ | -   |
| --action-bar-button-height              | _40px * $hd_                   | -   |
| --action-bar-button-color               | _var(--white)_                 | -   |
| --action-bar-button-font-size           | _var(--font-size-md)_          | -   |
| --action-bar-button-gradient-red        | _var(--gradient-red)_          | -   |
| --action-bar-button-gradient-orange     | _var(--gradient-orange)_       | -   |
| --action-bar-button-border-radius-md    | _var(--border-radius-md)_      | -   |
| --action-bar-button-border-radius-max   | _var(--border-radius-max)_     | -   |
| --action-bar-icon-button-color          | _var(--gray-7)_                | -   |
| --action-bar-icon-button-font-size      | _var(--font-size-xs)_          | -   |
| --action-bar-icon-button-width          | _48px * $hd_                   | -   |
| --action-bar-icon-button-height         | _100%_                         | -   |
| --action-bar-icon-button-icon-font-size | _18px * $hd_                   | -   |

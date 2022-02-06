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

function BasicActionBar() {
  <ActionBar>
    <ActionBar.ButtonGroup shape="round" flex={14}>
      <ActionBar.Button color="danger">加入购物车</ActionBar.Button>
      <ActionBar.Button color="warning">立即购买</ActionBar.Button>
    </ActionBar.ButtonGroup>
    <ActionBar.IconButton badge={1}>
      <ChatOutlined />
      <Text>客服</Text>
    </ActionBar.IconButton>
    <ActionBar.IconButton badge="dot">
      <ChatOutlined />
      <Text>店铺</Text>
    </ActionBar.IconButton>
    <ActionBar.IconButton badge="hot">
      <ChatOutlined />
      <Text>店铺</Text>
    </ActionBar.IconButton>
  </ActionBar>
}
```

### 形状

通过`shape`设置按钮形状

```tsx
import { ActionBar } from "@taroify/commerce"

function ActionBarShape() {
  return (
    <ActionBar>
      <ActionBar.Button color="danger">加入购物车</ActionBar.Button>
      <ActionBar.IconButton badge={1}>
        <ChatOutlined />
        <Text>客服</Text>
      </ActionBar.IconButton>
      <ActionBar.IconButton badge="dot">
        <ChatOutlined />
        <Text>店铺</Text>
      </ActionBar.IconButton>
      <ActionBar.IconButton badge="hot">
        <ChatOutlined />
        <Text>店铺</Text>
      </ActionBar.IconButton>
    </ActionBar>
  )
}
```

### 组合

可以通过 `ActionBar.ButtonGroup`调整`ActionBar.Button` 样式,以及所需宽度

```tsx
import { ActionBar } from "@taroify/commerce"

function ActionGroup() {
  return (
    <ActionBar>
      <ActionBar.ButtonGroup shape="square" flex={14}>
        <ActionBar.Button color="danger">加入购物车</ActionBar.Button>
        <ActionBar.Button color="warning">立即购买</ActionBar.Button>
      </ActionBar.ButtonGroup>
      <ActionBar.IconButton badge={1}>
        <ChatOutlined />
        <Text>客服</Text>
      </ActionBar.IconButton>
      <ActionBar.IconButton badge="dot">
        <ChatOutlined />
        <Text>店铺</Text>
      </ActionBar.IconButton>
      <ActionBar.IconButton badge="hot">
        <ChatOutlined />
        <Text>店铺</Text>
      </ActionBar.IconButton>
    </ActionBar>

  )
}
```

### 置底

可以通过 `placeholder` 和 `fixed` 可以将组件置于底部

```tsx
import { ActionBar } from "@taroify/commerce"

function ActionBarBottom() {
  return (
    <ActionBar fixed placeholder>
      <ActionBar.ButtonGroup shape="round" flex={14}>
        <ActionBar.Button color="danger">我是浮空得</ActionBar.Button>
        <ActionBar.Button color="warning">立即购买</ActionBar.Button>
      </ActionBar.ButtonGroup>
      <ActionBar.IconButton badge={1}>
        <ChatOutlined />
        <Text>客服</Text>
      </ActionBar.IconButton>
      <ActionBar.IconButton badge="dot">
        <ChatOutlined />
        <Text>店铺</Text>
      </ActionBar.IconButton>
      <ActionBar.IconButton badge="hot">
        <ChatOutlined />
        <Text>店铺</Text>
      </ActionBar.IconButton>
    </ActionBar>
  )
}

```

## API

### ActionBar Props

|     参数     | 说明                                                                      | 类型        |       默认值     |
|-------------|--------------------------------------------------------------------------|-------------| -------------- |
| justify     | 主轴对齐方式，可选值为 `start` `end` `center` `space-around` `space-between`  | _string_   | `space-between` |
| fixed       | 是否固定在底部                                                              | _boolean_   |     `false`    |
| placeholder | 固定在底部时，是否在标签位置生成一个等高的占位元素                                 | _boolean_   |     `false`     |

### ActionBar.ButtonGroup Props

| 参数        | 说明                         | 类型 | 默认值 |
|-----------|----------------------------| --- | --- |
| flex      | 列元素宽度                      | _number_ | - |
| shape | 按钮形状,可选值为 `circle` `round` | _string_ | `square` |

### ActionBar.Button Props

| 参数        | 说明                         | 类型 | 默认值 |
|-----------|----------------------------| --- | --- |
| shape     | 按钮形状,可选值为 `circle` `round` | _string_ | `square` |
| color     | 按钮颜色,可选值为 `danger` `warning` | _string_ | `danger` |
| icon | 左侧[图标](/components/icon)或[图片](/components/image) | _ReactNode_ | - |
| size | 尺寸，可选值为 `large` `small` `mini` | _string_ | `medium` |
| formType | 原生 button 标签的 type 属性 | _string_ | `button` |
| block | 是否为块级元素 | _boolean_ | `false` |
| disabled | 是否禁用按钮 | _boolean_ | `false` |
| hairline | 是否使用 0.5px 边框 | _boolean_ | `false` |
| loading | 是否显示为加载状态 | _boolean \ LoadingProps_ | `false` |
| variant | 按钮变种，可选值为 `contained` `text` `outlined` | _string_ | `contained` |

### ActionBar.IconButton Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| badge  | 徽标内容    | _ReactNode_        | - |



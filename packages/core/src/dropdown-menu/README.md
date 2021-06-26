# DropdownMenu 下拉菜单

### 介绍

向下弹出的菜单列表。

### 引入

```js
import { DropdownMenu } from "@taroify/core"
// or
import DropdownMenu from "@taroify/core/dropdown-menu"
```

## 代码演示

### 基础用法

```tsx
import { DropdownMenu } from "@taroify/core"

function BasicDropdownMenu() {
  const [activeKey, setActiveKey] = useState<DropdownMenu.Key>()
  const [option1, setOption1] = useState<DropdownMenu.Value>()
  const [option2, setOption2] = useState<DropdownMenu.Value>()
  return (
    <DropdownMenu activeKey={activeKey} onChange={setActiveKey}>
      <DropdownMenu.Item value={option1} onChange={setOption1}>
        <DropdownMenu.Option value={0}>全部商品</DropdownMenu.Option>
        <DropdownMenu.Option value={1}>新款商品</DropdownMenu.Option>
        <DropdownMenu.Option value={2}>活动商品</DropdownMenu.Option>
      </DropdownMenu.Item>
      <DropdownMenu.Item value={option2} onChange={setOption2}>
        <DropdownMenu.Option value={0}>默认排序</DropdownMenu.Option>
        <DropdownMenu.Option value={1}>好评排序</DropdownMenu.Option>
        <DropdownMenu.Option value={2}>销量排序</DropdownMenu.Option>
      </DropdownMenu.Item>
    </DropdownMenu>
  )
}
```

### 自定义菜单内容

可以通过 `DropdownMenu.Item` 组件自定义内容。

```tsx
import { DropdownMenu } from "@taroify/core"

function DropdownMenuWithCustomContent() {
  const [activeKey, setActiveKey] = useState<DropdownMenu.Key>()
  const [option1, setOption1] = useState<DropdownMenu.Value>()
  return (
    <DropdownMenu activeKey={activeKey} onChange={setActiveKey}>
      <DropdownMenu.Item value={option1} onChange={setOption1}>
        <DropdownMenu.Option value={0}>全部商品</DropdownMenu.Option>
        <DropdownMenu.Option value={1}>新款商品</DropdownMenu.Option>
        <DropdownMenu.Option value={2}>活动商品</DropdownMenu.Option>
      </DropdownMenu.Item>
      <DropdownMenu.Item title="筛选">
        <Cell title="包邮" align="center">
          switch
        </Cell>
        <Cell title="团购" align="center">
          switch
        </Cell>
        <View style="padding: 5px 16px;">
          <Button color="danger" block shape="round">
            确认
          </Button>
        </View>
      </DropdownMenu.Item>
    </DropdownMenu>
  )
}
```

### 自定义选中态颜色

通过 `activeColor` 属性可以自定义菜单标题和选项的选中态颜色。

```tsx
import { DropdownMenu } from "@taroify/core"

function DropdownMenuWithCustomColor() {
  const [activeKey, setActiveKey] = useState<DropdownMenu.Key>()
  const [option1, setOption1] = useState<DropdownMenu.Value>()
  const [option2, setOption2] = useState<DropdownMenu.Value>()
  return (
    <DropdownMenu activeKey={activeKey} activeColor="#1989fa" onChange={setActiveKey}>
      <DropdownMenu.Item value={option1} onChange={setOption1}>
        <DropdownMenu.Option value={0}>全部商品</DropdownMenu.Option>
        <DropdownMenu.Option value={1}>新款商品</DropdownMenu.Option>
        <DropdownMenu.Option value={2}>活动商品</DropdownMenu.Option>
      </DropdownMenu.Item>
      <DropdownMenu.Item value={option2} onChange={setOption2}>
        <DropdownMenu.Option value={0}>默认排序</DropdownMenu.Option>
        <DropdownMenu.Option value={1}>好评排序</DropdownMenu.Option>
        <DropdownMenu.Option value={2}>销量排序</DropdownMenu.Option>
      </DropdownMenu.Item>
    </DropdownMenu>
  )
}
```

### 向上展开

将 `direction` 属性值设置为 `up`，菜单即可向上展开。

```tsx
import { DropdownMenu } from "@taroify/core"

function UpDropdownMenu() {
  const [activeKey, setActiveKey] = useState<DropdownMenu.Key>()
  const [option1, setOption1] = useState<DropdownMenu.Value>()
  const [option2, setOption2] = useState<DropdownMenu.Value>()
  return (
    <DropdownMenu activeKey={activeKey} direction="up" onChange={setActiveKey}>
      <DropdownMenu.Item value={option1} onChange={setOption1}>
        <DropdownMenu.Option value={0}>全部商品</DropdownMenu.Option>
        <DropdownMenu.Option value={1}>新款商品</DropdownMenu.Option>
        <DropdownMenu.Option value={2}>活动商品</DropdownMenu.Option>
      </DropdownMenu.Item>
      <DropdownMenu.Item value={option2} onChange={setOption2}>
        <DropdownMenu.Option value={0}>默认排序</DropdownMenu.Option>
        <DropdownMenu.Option value={1}>好评排序</DropdownMenu.Option>
        <DropdownMenu.Option value={2}>销量排序</DropdownMenu.Option>
      </DropdownMenu.Item>
    </DropdownMenu>
  )
}
```

### 禁用菜单

```tsx
import { DropdownMenu } from "@taroify/core"

function DisabledDropdownMenu() {
  const [activeKey, setActiveKey] = useState<DropdownMenu.Key>()
  return (
    <DropdownMenu activeKey={activeKey} onChange={setActiveKey}>
      <DropdownMenu.Item disabled>
        <DropdownMenu.Option value={0}>全部商品</DropdownMenu.Option>
        <DropdownMenu.Option value={1}>新款商品</DropdownMenu.Option>
        <DropdownMenu.Option value={2}>活动商品</DropdownMenu.Option>
      </DropdownMenu.Item>
      <DropdownMenu.Item disabled>
        <DropdownMenu.Option value={0}>默认排序</DropdownMenu.Option>
        <DropdownMenu.Option value={1}>好评排序</DropdownMenu.Option>
        <DropdownMenu.Option value={2}>销量排序</DropdownMenu.Option>
      </DropdownMenu.Item>
    </DropdownMenu>
  )
}
```

## API

### DropdownMenu Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| activeKey | 当前选中的 DropdownMenu.Item key | _number \| string_ | - |
| activeColor | 菜单标题和选项的选中态颜色 | _string_ | `#ee0a24` |
| direction | 菜单展开方向，可选值为`up` | _string_ | `down` |
| zIndex | 菜单栏 z-index 层级 | _number \| string_ | `10` |
| duration | 动画时长，单位秒 | _number \| string_ | `0.2` |

### DropdownMenu.Item Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前选中项对应的 value | _number \| string_ | - |
| title | 菜单项标题 | _string_ | 当前选中项文字 |
| disabled | 是否禁用菜单 | _boolean_ | `false` |

### DropdownMenu.Item Events

| 事件名 | 说明                          | 回调参数 |
| ------ | ----------------------------- | -------- |
| change | 点击选项导致 value 变化时触发 | value    |
| open   | 打开菜单栏时触发              | -        |
| close  | 关闭菜单栏时触发              | -        |
| opened | 打开菜单栏且动画结束后触发    | -        |
| closed | 关闭菜单栏且动画结束后触发    | -        |

### DropdownMenu.Option Props

| 键名  | 说明                                   | 类型               |
| ----- | -------------------------------------- | ------------------ |
| value | 标识符                                 | _number \| string_  |
| icon  | 左侧图标或图片                           |   _ReactNode_       |
| title | 展示 DropdownMenu 选中的 title 内容      | _ReactNode_         |

## 常见问题

### 父元素设置 transform 后，下拉菜单的位置错误？

把 `DropdownItem` 嵌套在 `Tabs` 等组件内部使用时，可能会遇到下拉菜单位置错误的问题。这是因为在 Chrome 浏览器中，transform 元素内部的 fixed 布局会降级成 absolute
布局，导致下拉菜单的布局异常。

将 `DropdownItem` 的 `teleport` 属性设置为 `body` 即可避免此问题：

```html

<van-dropdown-menu>
  <van-dropdown-item teleport="body" />
  <van-dropdown-item teleport="body" />
</van-dropdown-menu>
```

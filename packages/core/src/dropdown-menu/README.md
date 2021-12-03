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
  const [value, setValue] = useState()
  const [option1, setOption1] = useState()
  const [option2, setOption2] = useState()
  return (
    <DropdownMenu value={value} onChange={setValue}>
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
  const [value, setValue] = useState()
  const [option1, setOption1] = useState()
  const [switch1, setSwitch1] = useState(true)
  const [switch2, setSwitch2] = useState(false)
  return (
    <DropdownMenu value={value} onChange={setValue}>
      <DropdownMenu.Item value={option1} onChange={setOption1}>
        <DropdownMenu.Option value={0}>全部商品</DropdownMenu.Option>
        <DropdownMenu.Option value={1}>新款商品</DropdownMenu.Option>
        <DropdownMenu.Option value={2}>活动商品</DropdownMenu.Option>
      </DropdownMenu.Item>
      <DropdownMenu.Item title="筛选">
        <Cell title="包邮" align="center">
          <Switch size="24" checked={switch1} onChange={setSwitch1} />
        </Cell>
        <Cell title="团购" align="center">
          <Switch size="24" checked={switch2} onChange={setSwitch2} />
        </Cell>
        <View style="padding: 5px 16px;">
          <Button color="danger" block shape="round" onClick={() => setValue(undefined)}>
            确认
          </Button>
        </View>
      </DropdownMenu.Item>
    </DropdownMenu>
  )
}
```

### 自定义选中态颜色

通过 `css` 可以自定义菜单标题和选项的选中态颜色。

```tsx
import { DropdownMenu } from "@taroify/core"

function DropdownMenuWithCustomColor() {
  const [value, setValue] = useState()
  const [option1, setOption1] = useState()
  const [option2, setOption2] = useState()
  return (
    <DropdownMenu className="custom-color" value={value} onChange={setValue}>
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

```scss
.custom-color {
  .taroify-dropdown-menu-title--active {
    .taroify-dropdown-menu-title__content {
      color: #1989fa;
    }
  }

  .taroify-dropdown-menu-option--active {
    color: #1989fa;

    .taroify-dropdown-menu-option__icon {
      color: #1989fa;
    }
  }
}
```

### 向上展开

将 `direction` 属性值设置为 `up`，菜单即可向上展开。

```tsx
import { DropdownMenu } from "@taroify/core"

function UpDropdownMenu() {
  const [value, setValue] = useState()
  const [option1, setOption1] = useState()
  const [option2, setOption2] = useState()
  return (
    <DropdownMenu value={value} direction="up" onChange={setValue}>
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
  const [value, setValue] = useState()
  return (
    <DropdownMenu value={value} onChange={setValue}>
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
| value | 当前选中的 DropdownMenu.Item 的 标识 | _React.Key_ | - |
| direction | 菜单展开方向，可选值为`up` | _string_ | `down` |
| zIndex | 菜单栏 z-index 层级 | _number \| string_ | `10` |

### DropdownMenu.Item Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前选中项对应的 value | _any_ | - |
| title | 菜单项标题 | _string_ | 当前选中项文字 |
| disabled | 是否禁用菜单 | _boolean_ | `false` |

### DropdownMenu.Item Events

| 事件名 | 说明                          | 回调参数 |
| ------ | ----------------------------- | -------- |
| onChange | 点击选项导致 value 变化时触发 | _value: any_    |

### DropdownMenu.Option Props

| 键名  | 说明                                   | 类型               |
| ----- | -------------------------------------- | ------------------ |
| value | 标识符                                 | _any_  |
| icon  | 左侧[图标](/components/icon)或[图片](/components/image) |   _ReactNode_       |
| title | 展示 DropdownMenu 选中的 title 内容      | _ReactNode_         |

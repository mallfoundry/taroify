# DropdownMenu 下拉菜单

### 介绍

向下弹出的菜单列表。

### 引入

```tsx
import { DropdownMenu } from "@taroify/core"
```

## 代码演示

### 基础用法

```tsx
import { DropdownMenu } from "@taroify/core"

function BasicDropdownMenu() {
  const [options] = useState([
    { title: "默认排序", value: 0 },
    { title: "好评排序", value: 1 },
    { title: "销量排序", value: 2 },
  ])
  return (
    <DropdownMenu>
      <DropdownMenu.Item>
        <DropdownMenu.Option value={0}>全部商品</DropdownMenu.Option>
        <DropdownMenu.Option value={1}>新款商品</DropdownMenu.Option>
        <DropdownMenu.Option value={2}>活动商品</DropdownMenu.Option>
      </DropdownMenu.Item>
      <DropdownMenu.Item options={options} />
    </DropdownMenu>
  )
}
```

### 自定义菜单内容

可以通过 `DropdownMenu.Item` 组件自定义内容。

```tsx
import { DropdownMenu } from "@taroify/core"
import { Key } from "react"

function DropdownMenuWithCustomContent() {
  const [value, setValue] = useState<Key | false>()
  const [option1, setOption1] = useState(0)
  const [switch1, setSwitch1] = useState(true)
  const [switch2, setSwitch2] = useState(false)
  const [options] = useState([
    {
      title: (
        <View>
          默认<View>排序</View>
        </View>
      ),
      value: 0,
    },
    { title: "好评排序", value: 1 },
    { title: "销量排序", value: 2 },
  ])
  return (
    <DropdownMenu value={value} onChange={setValue}>
      <DropdownMenu.Item
        value={option1}
        onChange={setOption1}
        options={options}
      ></DropdownMenu.Item>
      <DropdownMenu.Item title="筛选">
        <Cell title="包邮" align="center">
          <Switch size="24" checked={switch1} onChange={setSwitch1} />
        </Cell>
        <Cell title="团购" align="center">
          <Switch size="24" checked={switch2} onChange={setSwitch2} />
        </Cell>
        <View style="padding: 5px 16px;">
          <Button color="danger" block shape="round" onClick={() => setValue(false)}>
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
  return (
    <DropdownMenu className="custom-color">
      <DropdownMenu.Item>
        <DropdownMenu.Option value={0}>全部商品</DropdownMenu.Option>
        <DropdownMenu.Option value={1}>新款商品</DropdownMenu.Option>
        <DropdownMenu.Option value={2}>活动商品</DropdownMenu.Option>
      </DropdownMenu.Item>
      <DropdownMenu.Item>
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
  --dropdown-menu-title-active-color: #1989fa;
  --dropdown-menu-option-active-color: #1989fa;
}
```

### 向上展开

将 `direction` 属性值设置为 `up`，菜单即可向上展开。

```tsx
import { DropdownMenu } from "@taroify/core"

function UpDropdownMenu() {
  return (
    <DropdownMenu direction="up">
      <DropdownMenu.Item>
        <DropdownMenu.Option value={0}>全部商品</DropdownMenu.Option>
        <DropdownMenu.Option value={1}>新款商品</DropdownMenu.Option>
        <DropdownMenu.Option value={2}>活动商品</DropdownMenu.Option>
      </DropdownMenu.Item>
      <DropdownMenu.Item>
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
  return (
    <DropdownMenu>
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

### 阻止滑动穿透

在 h5 上设置 lock 即可阻止滑动穿透 \
若要在微信小程序上支持，还需下面两项设置 \
1.设置滑动容器高度(--dropdown-menu-item-content-max-height)，不设置超长时无法滑动 \
2.当下拉展开时，禁用外层滑动(通过 PageMeta，或者你包裹的滑动容器)，不设置无法阻止下拉反方向的滑动

```tsx
function BasicDropdownMenu() {
  const [options] = useState(
    [
      { title: "默认排序", value: 0 },
      { title: "好评排序", value: 1 },
      { title: "销量排序", value: 2 },
    ].concat(Array.from({ length: 20 }, (_, i) => ({ title: "选项" + i, value: 3 + i }))),
  )
  const [opened, setOpened] = useState(false)
  const getScrollHeight = useCallback((len) => {
    return len < 5 ? len * 46 : 5 * 46
  }, [])
  return (
    <>
      <PageMeta pageStyle={opened ? "overflow: hidden;" : ""} />
      <DropdownMenu>
        {/* @ts-ignore */}
        <DropdownMenu.Item
          style={{ "--dropdown-menu-item-content-max-height": getScrollHeight(23) + "px" }}
          options={options}
          lock
          onOpen={() => setOpened(true)}
          onClose={() => setOpened(false)}
        />
        {/* @ts-ignore */}
        <DropdownMenu.Item
          style={{ "--dropdown-menu-item-content-max-height": getScrollHeight(4) + "px" }}
          lock
          onOpen={() => setOpened(true)}
          onClose={() => setOpened(false)}
        >
          <DropdownMenu.Option value={0}>全部商品</DropdownMenu.Option>
          <DropdownMenu.Option value={1}>新款商品</DropdownMenu.Option>
          <DropdownMenu.Option value={2}>活动商品</DropdownMenu.Option>
          <DropdownMenu.Option value={3}>活动商品2</DropdownMenu.Option>
        </DropdownMenu.Item>
      </DropdownMenu>
    </>
  )
}
```

## API

### DropdownMenu Props

| 参数         | 说明                                 | 类型        | 默认值  |
| ------------ | ------------------------------------ | ----------- | ------- |
| defaultValue | 默认选中的 DropdownMenu.Item 的 标识 | _React.Key_ | -       |
| value        | 当前选中的 DropdownMenu.Item 的 标识 | _React.Key_ | -       |
| direction    | 菜单展开方向，可选值为`up`           | _string_    | `down`  |
| backdropType | 背景板位置，可选值 `inner` `outer`   | _string_    | `inner` |

### DropdownMenu.Item Props

| 参数         | 说明                   | 类型                             | 默认值         |
| ------------ | ---------------------- | -------------------------------- | -------------- |
| defaultValue | 默认选中项对应的 value | _any_                            | -              |
| value        | 当前选中项对应的 value | _any_                            | -              |
| title        | 菜单项标题             | _string_                         | 当前选中项文字 |
| disabled     | 是否禁用菜单           | _boolean_                        | `false`        |
| lock         | 是否锁定背景滚动       | _boolean_                        | `false`        |
| options      | 选项数组               | 同下方 DropdownMenu.Option Props | -              |

### DropdownMenu.Item Events

| 事件名   | 说明                          | 回调参数     |
| -------- | ----------------------------- | ------------ |
| onChange | 点击选项导致 value 变化时触发 | _value: any_ |
| onOpen   | 打开菜单栏时触发              | -            |
| onClose  | 关闭菜单栏时触发              | -            |
| onOpened | 打开菜单栏且动画结束后触发    | -            |
| onClosed | 关闭菜单栏且动画结束后触发    | -            |

### DropdownMenu.Option Props

| 键名  | 说明                                                    | 类型        |
| ----- | ------------------------------------------------------- | ----------- |
| value | 标识符                                                  | _any_       |
| icon  | 左侧[图标](/components/icon)或[图片](/components/image) | _ReactNode_ |
| title | 展示 DropdownMenu 选中的 title 内容                     | _ReactNode_ |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider](/components/config-provider/) 组件。

| 名称                                            | 默认值                                             | 描述 |
| ----------------------------------------------- | -------------------------------------------------- | ---- |
| --dropdown-menu-height                          | _48px \* $hd_                                      | -    |
| --dropdown-menu-background-color                | _var(--white)_                                     | -    |
| --dropdown-menu-z-index                         | _11_                                               | -    |
| --dropdown-menu-box-shadow                      | _0 2px * $hd 12px * $hd rgba(100, 101, 102, 0.12)_ | -    |
| --dropdown-menu-title-font-size                 | _15px \* $hd_                                      | -    |
| --dropdown-menu-title-color                     | _var(--text-color)_                                | -    |
| --dropdown-menu-title-padding                   | _0 var(--padding-xs)_                              | -    |
| --dropdown-menu-title-line-height               | _var(--line-height-lg)_                            | -    |
| --dropdown-menu-title-active-opacity            | _var(--active-opacity)_                            | -    |
| --dropdown-menu-title-active-color              | _var(--danger-color)_                              | -    |
| --dropdown-menu-title-disabled-color            | _var(--gray-6)_                                    | -    |
| --dropdown-menu-item-z-index                    | _calc(var(--dropdown-menu-z-index) - 1)_           | -    |
| --dropdown-menu-item-content-max-height         | _80%_                                              | -    |
| --dropdown-menu-item-content-animation-duration | _var(--animation-duration-fast)_                   | -    |
| --dropdown-menu-option-active-color             | _var(--danger-color)_                              | -    |

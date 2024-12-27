# FixedNav 悬浮导航

### 介绍

伸缩式交互，用于快捷导航

请升级 `taroify` 到 >= `v0.1.2-alpha.0` 版本来使用该组件。

### 引入

```tsx
import { FixedNav } from "@taroify/core"
```

## 代码演示

### 基础用法

```tsx
const list = [
  {
    id: 1,
    text: "首页",
    icon: <WapHomeOutlined />,
  },
  {
    id: 2,
    text: "分类",
    icon: <AppsOutlined />,
  },
  {
    id: 3,
    text: "购物车",
    num: 2,
    icon: <ShoppingCartOutlined />,
  },
  {
    id: 4,
    text: "我的",
    icon: <UserOutlined />,
  },
]

const App = () => {
  const [open, setOpen] = useState(false)

  return <FixedNav open={open} onChange={setOpen} data={list} position={{ top: "150px" }} />
}
```

### 位置在左侧

```tsx
const list = [
  {
    id: 1,
    text: "首页",
    icon: <WapHomeOutlined />,
  },
  {
    id: 2,
    text: "分类",
    icon: <AppsOutlined />,
  },
  {
    id: 3,
    text: "购物车",
    num: 2,
    icon: <ShoppingCartOutlined />,
  },
  {
    id: 4,
    text: "我的",
    icon: <UserOutlined />,
  },
]

const App = () => {
  const [open, setOpen] = useState(false)

  return (
    <FixedNav
      open={open2}
      onChange={setOpen2}
      data={list}
      type="left"
      backdrop={false}
      position={{ top: "300px" }}
    />
  )
}
```

### 自定义内容

```tsx
const CustomerFixedNav = () => {
  const [open, setOpen] = useState(false)

  return (
    <FixedNav
      open={open}
      onChange={setOpen}
      type="left"
      backdrop={false}
      position={{ top: "400px" }}
      content={
        <>
          <GiftOutlined color="#FFF" />
          <span className="fixed-nav-text">{open ? "开" : "关"}</span>
        </>
      }
    >
      <ul className="taroify-fixed-nav_content customer">
        <li className="taroify-fixed-nav_content_item">我</li>
        <li className="taroify-fixed-nav_content_item">是</li>
        <li className="taroify-fixed-nav_content_item">自</li>
        <li className="taroify-fixed-nav_content_item">定</li>
        <li className="taroify-fixed-nav_content_item">义</li>
      </ul>
    </FixedNav>
  )
}
```

```scss
.fixed-nav-demo {
  .fixed-nav-text {
    color: #fff;
    line-height: 26px;
    width: 48px;
    font-size: 24px;
  }

  .taroify-fixed-nav_content {
    &.customer {
      border-radius: 0 50px 50px 0;
      margin: 0;
      padding-left: 160px;
      padding-right: 40px;
      right: auto;
    }

    &_item {
      align-items: center;
      color: #1a1a1a;
      display: flex;
      flex: 1;
      flex-direction: column;
      flex-shrink: 0;
      height: 100%;
      justify-content: center;
      min-width: 100px;
      position: relative;
      font-size: 28px;
    }
  }
}
```

## API

### Flex Props

| 参数         | 说明             | 类型               | 默认值                          |
| ------------ | ---------------- | ------------------ | ------------------------------- |
| open         | 是否打开         | _boolean_          | `false`                         |
| data         | 悬浮导航内数据   | _FixedNavItem[]_   | `[]`                            |
| backdrop     | 是否显示遮罩层   | _boolean_          | `true`                          |
| activeText   | 收起按钮文案     | _string_           | `收起导航`                      |
| inactiveText | 展开按钮文案     | _string_           | `快速导航`                      |
| type         | 悬浮导航方向     | _left \| right_    | `right`                         |
| position     | 悬浮导航垂直位置 | _FixedNavPosition_ | `{top: 'auto', bottom: 'auto'}` |
| content      | 自定义按钮       | _ReactNode_        | `-`                             |

### Events

| 事件名   | 说明             | 回调参数         |
| -------- | ---------------- | ---------------- |
| onChange | 展开收起按钮回调 | _value: boolean_ |
| onClick  | 选择之后触发     | _item_           |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider](/components/config-provider/) 组件。

| 名称                          | 默认值                   | 描述 |
| ----------------------------- | ------------------------ | ---- |
| --fixed-nav-z-index           | _1010_                   | -    |
| --fixed-nav-z-content-index   | _1009_                   | -    |
| --fixed-nav-button-background | _var(--blue, $blue)_     | -    |
| --fixed-nav-button-font-size  | _12px \* $hd_            | -    |
| --fixed-nav-background-color  | _var(--white, $white)_   | -    |
| --fixed-nav-color             | _var(--gray-8, $gray-8)_ | -    |

# Tabs 标签页

### 介绍

选项卡组件，用于在不同的内容区域之间进行切换。

### 引入

```ts
import { Tabs } from "@taroify/core"
```

## 代码演示

### 基础用法

通过 `value` 绑定当前激活标签对应的索引值，默认情况下启用第一个标签。

```tsx
import { Tabs } from "@taroify/core"

function BasicTabs() {
  const [value, setValue] = useState(0)
  return (
    <Tabs value={value} onChange={setValue}>
      <Tabs.TabPane title="标签 1">内容 1</Tabs.TabPane>
      <Tabs.TabPane title="标签 2">内容 2</Tabs.TabPane>
      <Tabs.TabPane title="标签 3">内容 3</Tabs.TabPane>
      <Tabs.TabPane title="标签 4">内容 4</Tabs.TabPane>
    </Tabs>
  )
}
```

### 通过标识匹配

在 `Tabs.TabPane` 标签指定 `value` 属性的情况下，`Tabs.defaultValue` 的值为当前标签的 `value`。

```tsx
<Tabs defaultValue="a">
  <Tabs.TabPane value="a" title="标签 1">
    内容 1
  </Tabs.TabPane>
  <Tabs.TabPane value="b" title="标签 2">
    内容 2
  </Tabs.TabPane>
  <Tabs.TabPane value="c" title="标签 3">
    内容 3
  </Tabs.TabPane>
  <Tabs.TabPane value="d" title="标签 4">
    内容 4
  </Tabs.TabPane>
</Tabs>
```

### 标签栏滚动

标签数量超过 5 个时，标签栏可以在水平方向上滚动，切换时会自动将当前标签居中。

```tsx
<Tabs>
  <Tabs.TabPane title="标签 1">内容 1</Tabs.TabPane>
  <Tabs.TabPane title="标签 2">内容 2</Tabs.TabPane>
  <Tabs.TabPane title="标签 3">内容 3</Tabs.TabPane>
  <Tabs.TabPane title="标签 4">内容 4</Tabs.TabPane>
  <Tabs.TabPane title="标签 5">内容 5</Tabs.TabPane>
  <Tabs.TabPane title="标签 6">内容 6</Tabs.TabPane>
  <Tabs.TabPane title="标签 7">内容 7</Tabs.TabPane>
</Tabs>
```

### 禁用标签

设置 `disabled` 属性即可禁用标签，如果需要监听禁用标签的点击事件，可以在 `Tabs` 上监听`onClick` 事件。

```tsx
<Tabs>
  <Tabs.TabPane title="标签 1">内容 1</Tabs.TabPane>
  <Tabs.TabPane title="标签 2" disabled>
    内容 2
  </Tabs.TabPane>
  <Tabs.TabPane title="标签 3">内容 3</Tabs.TabPane>
</Tabs>
```

### 样式风格

`Tabs` 支持两种样式风格：`line` 和`card`，默认为 `line` 样式，可以通过 `theme` 属性切换样式风格。

```tsx
<Tabs theme="card">
  <Tabs.TabPane title="标签 1">内容 1</Tabs.TabPane>
  <Tabs.TabPane title="标签 2">内容 2</Tabs.TabPane>
  <Tabs.TabPane title="标签 3">内容 3</Tabs.TabPane>
</Tabs>
```

### 点击事件

可以在 `Tabs` 上绑定 `onTabClick` 事件，事件传参为标签对应的标识符和标题。

```tsx
import { Tabs, Toast } from "@taroify/core"

function TabsWithTabClick() {
  return (
    <>
      <Toast id="toast" />
      <Tabs onTabClick={({ title }) => Toast.open(title)}>
        <Tabs.TabPane title="标签 1">内容 1</Tabs.TabPane>
        <Tabs.TabPane title="标签 2">内容 2</Tabs.TabPane>
        <Tabs.TabPane title="标签 3">内容 3</Tabs.TabPane>
      </Tabs>
      <Toast id="toast" />
    </>
  )
}
```

### 粘性布局

通过 `sticky` 属性可以开启粘性布局，粘性布局下，标签页滚动到顶部时会自动吸顶。

```tsx
<Tabs sticky>
  <Tabs.TabPane title="标签 1">内容 1</Tabs.TabPane>
  <Tabs.TabPane title="标签 2">内容 2</Tabs.TabPane>
  <Tabs.TabPane title="标签 3">内容 3</Tabs.TabPane>
  <Tabs.TabPane title="标签 4">内容 4</Tabs.TabPane>
</Tabs>
```

### 自定义标签

通过 `title` 插槽可以自定义标签内容。

```tsx
import { Tabs } from "@taroify/core"
import { MoreOutlined } from "@taroify/icons"

function TabsWithCustomTitle() {
  return (
    <Tabs>
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

### 切换动画

通过 `animated` 属性可以开启切换标签内容时的转场动画。

```tsx
<Tabs animated>
  <Tabs.TabPane title="标签 1">内容 1</Tabs.TabPane>
  <Tabs.TabPane title="标签 2">内容 2</Tabs.TabPane>
  <Tabs.TabPane title="标签 3">内容 3</Tabs.TabPane>
  <Tabs.TabPane title="标签 4">内容 4</Tabs.TabPane>
</Tabs>
```

### 滑动切换

通过 `swipeable` 属性可以开启滑动切换标签页。

```tsx
<Tabs animated swipeable>
  <Tabs.TabPane title="标签 1">内容 1</Tabs.TabPane>
  <Tabs.TabPane title="标签 2">内容 2</Tabs.TabPane>
  <Tabs.TabPane title="标签 3">内容 3</Tabs.TabPane>
  <Tabs.TabPane title="标签 4">内容 4</Tabs.TabPane>
</Tabs>
```

## API

### Tabs Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultValue | 绑定默认选中标签的标识符 | _number \| string_ | `0` |
| value | 绑定当前选中标签的标识符 | _number \| string_ | `0` |
| theme | 样式风格类型，可选值为 `card` | _string_ | `line` |
| duration | 动画时间，单位毫秒 | _number \| string_ | `300` |
| animated | 是否开启切换标签内容时的转场动画 | _boolean_ | `false` |
| bordered | 是否显示标签栏外边框，仅在 `type="line"` 时有效 | _boolean_ | `false` |
| ellipsis | 是否省略过长的标题文字 | _boolean_ | `true` |
| sticky | 是否使用粘性定位布局 | _boolean \| { offsetTop }_ | `false` |
| swipeable | 是否开启手势左右滑动切换 | _boolean_ | `false` |
| lazyRender | 是否延迟渲染未展示的选项卡 | _boolean_ | `false` |

### Tabs.Pane Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 标签值，作为匹配的值 | _number \| string_ | 标签的索引值 |
| title | 标题 | _ReactNode_ | - |
| disabled | 是否禁用标签 | _boolean_ | `false` |
| children | 标签面板内容 | _ReactNode_ | - |

### Tabs Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| onTabClick | 点击标签时触发 | _event : Tabs.TabEvent_ |
| onChange | 当前激活的标签改变时触发 | _value: any, event : Tabs.TabEvent_ |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider](/components/config-provider/) 组件。

| 名称                           | 默认值                                             | 描述  |
|------------------------------|-------------------------------------------------|-----|
| --tabs-active-color          | _var(--danger-color)_                           | -   |
| --tabs-wrap-height           | _44px * $hd_                                    | -   |
| --tabs-card-height           | _30px * $hd_                                    | -   |
| --tabs-card-margin           | _0 var(--padding-md)_                           | -   |
| --tabs-card-border-width     | _var(--border-width-base, $border-width-base))_ | -   |
| --tabs-card-border-color     | _var(--tabs-active-color)_                      | -   |
| --tabs-card-border-radius    | _var(--border-radius-sm)_                       | -   |
| --tabs-nav-background-color  | _var(--white)_                                  | -   |
| --tabs-line-width            | _40px * $hd_                                    | -   |
| --tabs-line-height           | _3px * $hd_                                     | -   |
| --tabs-line-border-radius    | _var(--tabs-line-height)_                       | -   |
| --tabs-line-background-color | _var(--tabs-active-color)_                      | -   |
| --tab-color                  | _var(--gray-7)_                                 | -   |
| --tab-padding                | _0 var(--padding-base)_                         | -   |
| --tab-font-size              | _var(--font-size-md)_                           | -   |
| --tab-line-height            | _var(--line-height-md)_                         | -   |
| --tab-active-color           | _var(--text-color)_                             | -   |
| --tab-active-font-weight     | _var(--font-weight-bold)_                       | -   |
| --tab-disabled-color         | _var(--gray-5)_                                 | -   |

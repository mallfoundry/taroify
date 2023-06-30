# BackTop 回到顶部

### 介绍

返回页面顶部的操作按钮。

### 引入

```tsx
import { BackTop } from "@taroify/core"
```

## 代码演示

### 基础用法

请滚动右侧的示例页面，当页面滚动 200px 时，右下角会出现返回顶部按钮。

```tsx
const list = [...Array(50).keys()];
<View>
  <Cell.Group>
    {arr.map((v) => {
      return (
        <Cell key={v}>{v}</Cell>
      )
    })}
  </Cell.Group>
  <BackTop />
</View>
```

### 自定义位置

通过 right 和 bottom 属性来设置组件距离右侧和底部的位置。

```tsx
function CustomContent) {
  const list = [...Array(50).keys()];

  return (
    <View>
      <Cell.Group>
        {list.map((v) => {
          return (
            <Cell key={v}>{v}</Cell>
          )
        })}
      </Cell.Group>
      <BackTop />
    </View>
  )
}
```

### 自定义内容

使用 `children` 来自定义组件展示的内容。

```tsx
function CustomContent() {
  const list = [...Array(50).keys()];

  return (
    <View>
      <Cell.Group>
        {list.map((v) => {
          return (
            <Cell key={v}>{v}</Cell>
          )
        })}
      </Cell.Group>
      <BackTop>返回顶部</BackTop>
    </View>
  )
}
```

```css
.custom-back-top {
  width: 160px;
  font-size: 28px;
  text-align: center;
}
```

### 瞬间滚动

当设置 `immediate` 属性后，页面滚动的过程不再有过渡效果，而是瞬间滚动到顶部。

```tsx
function SetImmediate() {
  const list = [...Array(50).keys()];

  return (
    <View>
      <Cell.Group>
        {list.map((v) => {
          return (
            <Cell key={v}>{v}</Cell>
          )
        })}
      </Cell.Group>
      <BackTop immediate />
    </View>
  )
}
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| right | 距离页面右侧的距离，默认单位为 `px` | _number_ | `30` |
| bottom | 	距离页面底部的距离，默认单位为 `px` | _number_ | `40` |
| offset | 	滚动高度达到此参数值时才显示组件 | _number_ | `200` |
| immediate | 是否瞬间滚动到顶部 | _boolean_ | `false` |
| zIndex | 设置组件的 z-index 层级 | _number_ | `100` |

### Event

| 事件 | 说明 | 回调参数 |
| --- | --- | --- |
| onClick | 点击组件时触发 | _event:ITouchEvent_ |

### 注意

非 `H5` 项目需要显式调用 `onClick`

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider](/components/config-provider/) 组件。

| 名称                                      | 默认值                            | 描述  |
|-----------------------------------------|--------------------------------|-----|
| --back-top-size                         | _80px_                         | -   |
| --back-top-icon-size                    | _40px_                         | -   |
| --back-top-right                        | _60px_                         | -   |
| --back-top-bottom                       | _80px_                         | -   |
| --back-top-z-index                      | _100_                          | -   |
| --back-top-text-color                   | _#fff_                         | -   |
| --back-top-background                   | _var(--blue, $blue)_           | -   |

# Sticky 粘性布局

### 介绍

Sticky 组件与 CSS 中 `position: sticky` 属性实现的效果一致，当组件在屏幕范围内时，会按照正常的布局排列，当组件滚出屏幕范围时，始终会固定在屏幕顶部。

### 引入

```tsx
import { Sticky } from "@taroify/core"
// or
import Sticky from "@taroify/core/sticky"
```

## 代码演示

### 基础用法

将内容包裹在 `Sticky` 组件内即可。

```tsx
<Sticky>
  <Button color="primary">吸底距离</Button>
</Sticky>
```

### 吸顶距离

通过 `offsetTop` 属性可以设置组件在吸顶时与顶部的距离。

```tsx
<Sticky offsetTop={100}>
  <Button color="primary">吸顶距离</Button>
</Sticky>
```

### 指定容器

通过 `container` 属性可以指定组件的容器，页面滚动时，组件会始终保持在容器范围内，当组件即将超出容器底部时，会固定在容器的底部。

```tsx
function StickyWithContainer() {
  const container = useRef()
  return (
    <View ref={container}>
      <Sticky container={container}>
        <Button color="warning">指定容器</Button>
      </Sticky>
    </View>
  )
}
```

### 吸底距离

将 `position` 设置为 `bottom` 可以让组件吸附在底部。通过 `offsetBottom` 属性可以设置组件在吸底时与底部的距离。

```tsx
<Sticky position="bottom" offsetBottom={50}>
  <Button color="primary">吸底距离</Button>
</Sticky>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| position | 吸附位置，可选值为 `bottom` | _string_ | `top` |
| offsetTop | 吸顶时与顶部的距离，支持 `px` `vw` `vh` `rem` 单位，默认 `px` | _number \| string_ | `0` |
| offsetBottom | 吸底时与底部的距离，支持 `px` `vw` `vh` `rem` 单位，默认 `px` | _number \| string_ | `0` |
| container | 容器对应的 HTML 节点 | _Element_ | - |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| onChange | 当吸顶状态改变时触发 | _fixed: boolean_ |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider](/components/config-provider/) 组件。

| 名称               | 默认值  | 描述  |
|------------------|------|-----|
| --sticky-z-index | _99_ | -   |

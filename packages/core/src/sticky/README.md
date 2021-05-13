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

通过 `offset.top` 属性可以设置组件在吸顶时与顶部的距离。

```tsx
<Sticky offset={{ top: "50px" }}>
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

将 `position` 设置为 `bottom` 可以让组件吸附在底部。通过 `offset.bottom` 属性可以设置组件在吸底时与底部的距离。

```tsx
<Sticky position="bottom" offset={{ bottom: "50px" }}>
  <Button color="primary">吸底距离</Button>
</Sticky>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| position | 吸附位置，可选值为 `bottom` | _string_ | `top` |
| offset | 吸顶时的距离，支持 `px` `vw` `vh` `rem` 单位，默认 `px` | _{ top, bottom }_ | `0` |
| zIndex | 吸顶时的 zIndex | _number \| string_ | `99` |
| container | 容器对应的 HTML 节点 | _Element_ | - |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change `v3.0.10` | 当吸顶状态改变时触发 | _isFixed: boolean_ |
| scroll | 滚动时触发 | _{ scrollTop: number, isFixed: boolean }_ |

# FloatingBubble 浮动气泡

### 介绍

悬浮在页面边缘的可点击气泡。

请升级 `taroify` 到 >= `v0.1.1-alpha.1` 版本来使用该组件。

### 引入

```tsx
import { FloatingBubble } from "@taroify/core"
```

## 代码演示

### 基础用法

浮动气泡默认展示在右下角，并允许在 y 轴方向上下拖拽，你可以通过 `icon` 属性设置气泡的图标。

```tsx
function BasicFloatingBubble() {
  const onClick = () => {
    showToast({
      title: "点击气泡",
      icon: "none",
      duration: 1000,
    })
  }

  return <FloatingBubble icon={<ChatOutlined />} onClick={onClick} />
}
```

### 自由拖拽和磁吸

允许 x 和 y 轴方向拖拽，吸附到 x 轴方向最近一边。

```tsx
function CustomFloatingBubble() {
  const onOffsetChange = (x: number, y: number) => {
    showToast({
      title: `x: ${x.toFixed(0)}, y: ${y.toFixed(0)}`,
      icon: "none",
      duration: 1000,
    })
  }

  return (
    <FloatingBubble
      axis="xy"
      magnetic="x"
      icon={<ChatOutlined />}
      onOffsetChange={onOffsetChange}
    />
  )
}
```

## API

### Flex Props

| 参数     | 说明                                                    | 类型                         | 默认值           |
| -------- | ------------------------------------------------------- | ---------------------------- | ---------------- |
| offset   | 控制气泡位置                                            | OffsetType                   | `默认右下角坐标` |
| axis     | 拖拽的方向，`xy` 代表自由拖拽，`lock` 代表禁止拖拽      | _x_ \| _y_ \| _xy_ \| _lock_ | `y`              |
| magnetic | 自动磁吸的方向                                          | _x_ \| _y_                   | `-`              |
| icon     | 左侧[图标](/components/icon)或[图片](/components/image) | _ReactNode_                  | `-`              |
| gap      | 气泡与窗口的最小间距，单位为 `px`                       | _Number_                     | `48`             |

### Events

| 事件名         | 说明                         | 回调参数               |
| -------------- | ---------------------------- | ---------------------- |
| onClick        | 点击组件时触发               | _ITouchEvent_          |
| onOffsetChange | 由用户拖拽导致位置改变后触发 | _x: string, y: string_ |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider](/components/config-provider/) 组件。

| 名称                            | 默认值                 | 描述 |
| ------------------------------- | ---------------------- | ---- |
| --floating-bubble-size          | _96px_                 | -    |
| --floating-bubble-initial-gap   | _48px_                 | -    |
| --floating-bubble-background    | _var(--blue, $blue)_   | -    |
| --floating-bubble-color         | _var(--white, $white)_ | -    |
| --floating-bubble-border-radius | _999px_                | -    |
| --floating-bubble-z-index       | _999_                  | -    |
| --floating-bubble-duratio       | _0.3s_                 | -    |
| --floating-bubble-icon-size     | _56px_                 | -    |

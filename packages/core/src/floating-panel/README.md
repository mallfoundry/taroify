# FloatingPanel 浮动面板

### 介绍

浮动在页面底部的面板，可以上下拖动来浏览内容，常用于提供额外的功能或信息。

### 引入

```tsx
import { FloatingPanel } from "@taroify/core"
```

## 代码演示

### 基础用法

FloatingPanel 的默认高度为 `100px`，用户可以拖动来展开面板，使高度达到 `60%` 的屏幕高度。

```tsx
<FloatingPanel>
  <Cell.Group>
    <Cell>1</Cell>
    <Cell>2</Cell>
    <Cell>3</Cell>
    <Cell>4</Cell>
    <Cell>5</Cell>
    <Cell>6</Cell>
    <Cell>7</Cell>
    <Cell>8</Cell>
    <Cell>9</Cell>
    <Cell>10</Cell>
    <Cell>11</Cell>
    <Cell>12</Cell>
    <Cell>13</Cell>
  </Cell.Group>
</FloatingPanel>
```

### 自定义锚点

你可以通过 `anchors` 属性来设置 FloatingPanel 的锚点位置，并通过 `height` 来控制当前面板的显示高度。
比如，使面板的高度在 `100px`、40% 屏幕高度和 70% 屏幕高度三个位置停靠：

```tsx
function CustomAnchors() {
  const windowHeight = useMemo(() => getSystemInfoSync().windowHeight, [])

  const anchors = useMemo(
    () => [200, Math.round(0.4 * windowHeight), Math.round(0.7 * windowHeight)],
    [windowHeight],
  )

  return (
    <FloatingPanel anchors={anchors} height={anchors[0]}>
      <Cell.Group>
        <Cell>1</Cell>
        <Cell>2</Cell>
        <Cell>3</Cell>
        <Cell>4</Cell>
        <Cell>5</Cell>
        <Cell>6</Cell>
        <Cell>7</Cell>
        <Cell>8</Cell>
        <Cell>9</Cell>
        <Cell>10</Cell>
        <Cell>11</Cell>
        <Cell>12</Cell>
        <Cell>13</Cell>
      </Cell.Group>
    </FloatingPanel>
  )
}
```

### 仅头部拖拽

默认情况下，FloatingPanel 的头部区域和内容区域都可以被拖拽，你可以通过 `contentDraggable` 属性来禁用内容区域的拖拽。

```tsx
function HeadDragOnly() {
  return (
    <FloatingPanel contentDraggable={false}>
      <Cell.Group>
        <Cell>1</Cell>
        <Cell>2</Cell>
        <Cell>3</Cell>
        <Cell>4</Cell>
        <Cell>5</Cell>
        <Cell>6</Cell>
        <Cell>7</Cell>
        <Cell>8</Cell>
        <Cell>9</Cell>
        <Cell>10</Cell>
        <Cell>11</Cell>
        <Cell>12</Cell>
        <Cell>13</Cell>
      </Cell.Group>
    </FloatingPanel>
  )
}
```

## API

### Flex Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| height | 当前面板的显示高度 | _number_ | `0` |
| anchors | 设置自定义锚点, 单位 `px` | _number[]_ | `[100, window.innerWidth * 0.6]` |
| duration | 动画时长，单位秒，设置为 0 可以禁用动画 | _number_ | `0.3` |
| contentDraggable | 允许拖拽内容容器 | _boolean_ | `true` |
| safeAreaInsetBottom | 是否开启底部安全区适配 | _boolean_ | `true` |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider](/components/config-provider/) 组件。

| 名称                                      | 默认值                            | 描述  |
|-----------------------------------------|--------------------------------|-----|
| --floating-panel-z-index                | _1010_                         | -   |
| --floating-panel-rounded-border-radius  | _16px * $hd_                   | -   |
| --floating-panel-header-height          | _60px_                         | -   |
| --floating-panel-bar-height             | _6px_                          | -   |
| --floating-panel-bar-width              | _40px_                         | -   |
| --floating-panel-bar-color              | _var(--gray-5, $gray-5)_       | -   |
| --floating-panel-background             | _var(--background-color-light)_| -   |

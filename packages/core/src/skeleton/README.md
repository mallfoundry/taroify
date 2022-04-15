# Skeleton 骨架屏

### 介绍

用于在内容加载过程中展示一组占位图形。

### 引入

```tsx
import { Skeleton } from "@taroify/core"
// or
import Skeleton from "@taroify/core/swiper"
```

## 代码演示

### 基础用法

```tsx
<Skeleton variant="circle" />
<WhiteSpace />
<Skeleton style={{ width: "40%" }} />
<WhiteSpace size="20px" />
<Skeleton />
<WhiteSpace />
<Skeleton />
<WhiteSpace />
<Skeleton style={{ width: "60%" }} />
```

### 动画效果

```tsx
<Skeleton />
<WhiteSpace />
<Skeleton animation={false} />
<WhiteSpace />
<Skeleton animation="wave" />
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| variant | 骨架屏形状，可选值为 `circle` | _string_ | `rect` |
| animation | 动画效果，可选值为 `wave` | _string \| boolean_ | `pulse` |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider](/components/config-provider/) 组件。

| 名称                                         | 默认值                           | 描述  |
|--------------------------------------------|-------------------------------|-----|
| --skeleton-height                          | _16px * $hd_                  | -   |
| --skeleton-background-color                | _var(--active-color)_         | -   |
| --skeleton-circle-size                     | _32px * $hd_                  | -   |
| --skeleton-circle-width                    | _var(--skeleton-circle-size)_ | -   |
| --skeleton-circle-height                   | _var(--skeleton-circle-size)_ | -   |
| --skeleton-circle-border-radius            | _var(--border-radius-max)_    | -   |
| --skeleton-pulse-animation-duration        | _1.5s_                        | -   |
| --skeleton-pulse-animation-timing-function | _ease-in-out_                 | -   |
| --skeleton-pulse-animation-delay           | _0.5s_                        | -   |
| --skeleton-wave-animation-duration         | _1.6s_                        | -   |
| --skeleton-wave-animation-timing-function  | _linear_                      | -   |
| --skeleton-wave-animation-delay            | _0.5s_                        | -   |

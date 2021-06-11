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

# FixedView 固定视图

### 介绍

用于固定在顶部或底部的视图。

## 代码演示

### 基础用法

```tsx
<FixedView position="top">固定在顶部</FixedView>
<FixedView position="bottom">固定在底部</FixedView>
```

## API

### Props

| 参数          | 说明                        | 类型        | 默认值 |
|-------------|---------------------------|-----------|-----|
| position    | 固定位置，可选值 `top` `bottom`   | _string_  | -   |
| safeArea    | 安全区域，可选值 `top` `bottom`   | _string_  | -   |
| placeholder | 固定在底部时，是否在标签位置生成一个等高的占位元素 | _boolean_ | -   |

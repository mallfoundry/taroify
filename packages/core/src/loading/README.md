# Loading 加载

### 介绍

加载图标，用于表示加载中的过渡状态。

### 引入

```tsx
import { Loading } from "@taroify/core"
```

## 代码演示

### 加载类型

通过 `type` 属性可以设置加载图标的类型，默认为 `circular`，可选值为 `spinner`。

```tsx
<Loading />
<Loading type="spinner" />
```

### 自定义颜色

通过 `css` 设置加载图标的颜色。

```tsx
<Loading />
<Loading type="spinner" />
```

```scss
.custom-color {
  color: #1989fa;
  
  .taroify-loading__text {
    color: #1989fa;
  }
}
```

### 自定义大小

通过 `size` 属性设置加载图标的大小，默认单位为 `px`。

```tsx
<Loading size="24px" />
<Loading type="spinner" size="24px" />
```

### 加载文案

可以使用默认插槽在图标的右侧插入加载文案。

```tsx
<Loading size="24px">加载中...</Loading>
```

### 垂直排列

设置 `vertical` 属性后，图标和文案会垂直排列。

```tsx
<Loading size="24px" direction="vertical">加载中...</Loading>
```

### 自定义文案颜色

通过 `css` 设置加载文案的颜色。

```tsx
<!-- 可修改文案和加载图标的颜色 -->
<Loading className="custom-color" />

<!-- 只修改文案颜色 -->
<Loading className="custom-text-color" />
```

```scss
.custom-text-color {
  .taroify-loading__text {
    color: #1989fa;
  }
}
```

## API

### Props

| 参数       | 说明                          | 类型               | 默认值     |
| ---------- | ----------------------------- | ------------------ | ---------- |
| type       | 类型，可选值为 `spinner`      | _string_           | `circular` |
| size       | 加载图标大小，默认单位为 `px` | _number \| string_ | `30px`     |
| direction | 排列方向，可选值为 `horizontal` | _string_ | `vertical` |
| children   | 加载文案    | _ReactNode_          | -    |

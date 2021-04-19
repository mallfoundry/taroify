# Loading 加载

### 介绍

加载图标，用于表示加载中的过渡状态。

### 引入

```jsx
import { Loading } from "@taroify/core"
```

## 代码演示

### 加载类型

通过 `type` 属性可以设置加载图标的类型，默认为 `circular`，可选值为 `spinner`。

```jsx
<Loading />
<Loading type="spinner" />
```

### 自定义颜色

通过 `color` 属性设置加载图标的颜色。

```jsx
<Loading color="#1989fa" />
<Loading type="spinner" color="#1989fa" />
```

### 自定义大小

通过 `size` 属性设置加载图标的大小，默认单位为 `px`。

```jsx
<Loading size="24px" />
<Loading type="spinner" size="24px" />
```

### 加载文案

可以使用默认插槽在图标的右侧插入加载文案。

```jsx
<Loading size="24px">加载中...</Loading>
```

### 垂直排列

设置 `vertical` 属性后，图标和文案会垂直排列。

```jsx
<Loading size="24px" vertical>加载中...</Loading>
```

### 自定义文案颜色

通过 `color` 或者 `textColor` 属性设置加载文案的颜色。

```jsx
<!-- 可修改文案和加载图标的颜色 -->
<Loading color="#0094ff" />

<!-- 只修改文案颜色 -->
<Loading textColor="#0094ff" />
```

## API

### Props

| 参数       | 说明                          | 类型               | 默认值     |
| ---------- | ----------------------------- | ------------------ | ---------- |
| color      | 颜色                          | _string_           | `#c9c9c9`  |
| type       | 类型，可选值为 `spinner`      | _string_           | `circular` |
| size       | 加载图标大小，默认单位为 `px` | _number \| string_ | `30px`     |
| textSize  | 文字大小，默认单位为 `px`     | _number \| string_ | `14px`     |
| textColor | 文字颜色                      | _string_           | `#c9c9c9`  |
| vertical   | 是否垂直排列图标和文字内容    | _boolean_          | `false`    |
| children   | 加载文案    | _ReactNode_          | -    |

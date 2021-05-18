# Progress 进度条

### 介绍

用于展示操作的当前进度。

### 引入

```tsx
import { Progress } from "@taroify/core"
// or
import Progress from "@taroify/core/progress"
```

## 代码演示

### 基础用法

进度条默认为蓝色，使用 `percentage` 属性来设置当前进度。

```tsx
<Progress percentage={50} />
```

### 线条粗细

通过 `stroke-width` 可以设置进度条的粗细。

```html

<van-progress :percentage="50" stroke-width="8" />
```

### 置灰

设置 `inactive` 属性后进度条将置灰。

```tsx
<Progress percentage={50} inactive />
```

### 样式定制

可以使用 `pivot-text` 属性自定义文字，`color` 属性自定义进度条颜色。

```tsx
<Progress percentage={25} color="#f2826a" />
<Progress percentage={50} color="#ee0a24" />
<Progress percentage={75} color="linear-gradient(to right, #be99ff, #7232dd)" />
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| percentage | 进度百分比 | _number \| string_ | `0` |
| strokeWidth | 进度条粗细，默认单位为`px` | _number \| string_ | `4px` |
| color | 进度条颜色 | _string_ | `#1989fa` |
| trackColor | 轨道颜色 | _string_ | `#e5e5e5` |
| textColor | 进度文字颜色 | _string_ | `white` |
| inactive | 是否置灰 | _boolean_ | `false` |
| label | 进度文字 | _boolean \| ReactNode_ | `true` |

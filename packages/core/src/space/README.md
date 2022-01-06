# Space 间距

### 介绍

设置组件之间的间距。

### 引入

```tsx
import { Button, Space } from "@taroify/core"
// or
import Space from "@taroify/core/space"
```

## 代码演示

### 基础用法

```tsx
<Space>
  <Button color="primary">主要按钮</Button>
  <Button color="primary">主要按钮</Button>
  <Button color="primary">主要按钮</Button>
</Space>
```

### 垂直

```tsx
<Space direction="vertical">
  <Button color="primary">主要按钮</Button>
  <Button color="primary">主要按钮</Button>
  <Button color="primary">主要按钮</Button>
</Space>
```
### 间隙

```tsx
<Space size="large">
  <Button color="primary">主要按钮</Button>
  <Button color="primary">主要按钮</Button>
  <Button color="primary">主要按钮</Button>
</Space>
```

### 居中

```tsx
<Space justify="center">
  <Button color="primary">主要按钮</Button>
  <Button color="primary">主要按钮</Button>
</Space>
```

### 不换行

```tsx
<Space wrap="nowrap">
  <Button color="primary">主要按钮</Button>
  <Button color="primary">主要按钮</Button>
  <Button color="primary">主要按钮</Button>
  <Button color="primary">主要按钮</Button>
</Space>
```


## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| direction | 垂直排列方式 可选值 `horizontal` `vertical` | _string_ | `horizontal` |
| size | 间距，可选值为 `mini` `small` `medium` `large` | _string_ | `small` |
| wrap | 子元素的换行方式，可选值为 `nowrap` `wrap` `wrap-reverse` | _boolean_ | `wrap` |
| justify | 主轴对齐方式，可选值为 `start` `end` `center` `space-around` `space-between` | _string_ | `start` |
| align | 交叉轴对齐方式，可选值为 `start` `center` `end` `baseline` `stretch` | _string_ | `start` |

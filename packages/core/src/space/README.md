# Skeleton Space

### 介绍

组件库提供了<Space>布局的组件，使您更有效率的进行flex布局。。

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
<Space size="small">
  <Button color="primary">主要按钮</Button>
  <Button color="primary">主要按钮</Button>
  <Button color="primary">主要按钮</Button>
</Space>
```
### 间隙

```tsx
<Space size="small">
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
<Space wrap>
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
| direction | 垂直排列方式 可选值 `horizontal`|`vertical` | _string_ | `horizontal` |
| size | 间距，可选值为 `small` `medium` `large` | _string_ | `small` |
| justify | 水平排列方式 可选值为`start` `end` `center` `space-around` `space-between`| _string_ | `start` |
| wrap | 是否超出换行| _boolean_ | `false` |
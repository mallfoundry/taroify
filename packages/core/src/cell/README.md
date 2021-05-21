# Cell 单元格

### 介绍

单元格为列表中的单个展示项。

### 引入

```tsx
import { Cell } from "@taroify/core"
```

## 代码演示

### 基础用法

`Cell` 可以单独使用，也可以与 `Cell.Group` 搭配使用，`Cell.Group` 可以为 `Cell` 提供上下外边框。

```tsx
<Cell label="单元格">内容</Cell>
<Cell label="单元格" brief="描述信息">内容</Cell>
```

### 单元格大小

通过 `size` 属性可以控制单元格的大小。

```tsx
<Cell label="单元格">内容</Cell>
<Cell label="单元格" brief="描述信息" size="large">内容</Cell>
```

### 展示图标

通过 `startIcon` 属性在标题左侧展示图标。

```tsx
<Cell startIcon={<LocationOutlined />} label="单元格">内容</Cell>
```

### 只设置 value

只设置 `value` 时，内容会靠左对齐。

```tsx
<Cell>内容</Cell>
```

### 展示箭头

通过 `startIcon` 属性在标题右侧展示箭头，并且可以通过不同图标控制箭头方向。

```tsx
<Cell label="单元格" endIcon={<Arrow />} clickable />
<Cell label="单元格" endIcon={<Arrow />} clickable>内容</Cell>
<Cell label="单元格" endIcon={<ArrowDown />} clickable>内容</Cell>
```

### 分组标题

通过 `Cell.Group` 的 `title` 属性可以指定分组标题。

```tsx
<Cell.Group title="分组 1">
  <Cell label="单元格">内容</Cell>
</Cell.Group>
<Cell.Group title="分组 2">
  <Cell label="单元格">内容</Cell>
</Cell.Group>
```

### 对齐方式

通过 `align` 属性可以改变 `Cell` 的左右内容的对齐方式。

```tsx
<Cell label="单元格" brief="align start" size="large" align="start">内容</Cell>
<Cell label="单元格" brief="align center" size="large" align="center">内容</Cell>
<Cell label="单元格" brief="align end" size="large" align="end">内容</Cell>
```

## API

### CellGroup Props

| 参数   | 说明           | 类型      | 默认值 |
| ------ | -------------- | --------- | ------ |
| title  | 分组标题       | _string_  | `-`    |
| bordered | 是否显示外边框 | _boolean_ | `true` |

### Cell Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 左侧标题 | _number \| string_ | - |
| children | 右侧内容 | _number \| string_ | - |
| brief | 标题下方的描述信息 | _string_ | - |
| size | 单元格大小，可选值为 `large` | _string_ | - |
| startIcon | 左侧[图标名称](/components/icon)或图片链接 | _string_ | - |
| bordered | 是否显示内边框 | _boolean_ | `true` |
| clickable | 是否开启点击反馈 | _boolean_ | `false` |
| required | 是否显示表单必填星号 | _boolean_ | `false` |
| align | 对齐方式，可选值为 `start` `center` `end` | _string_ | - |

### Cell Events

| 事件名 | 说明             | 回调参数            |
| ------ | ---------------- | ------------------- |
| click  | 点击单元格时触发 | _event: MouseEvent_ |

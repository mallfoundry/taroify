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
<Cell title="单元格">内容</Cell>
<Cell title="单元格" brief="描述信息">内容</Cell>
```

### 单元格大小

通过 `size` 属性可以控制单元格的大小。

```tsx
<Cell title="单元格">内容</Cell>
<Cell title="单元格" brief="描述信息" size="large">内容</Cell>
```

### 展示图标

通过 `icon` 属性在标题左侧展示图标。

```tsx
<Cell icon={<LocationOutlined />} title="单元格">内容</Cell>
```

### 只设置 value

只设置 `value` 时，内容会靠左对齐。

```tsx
<Cell>内容</Cell>
```

### 展示箭头

通过 `rightIcon` 属性在标题右侧展示箭头，并且可以通过不同图标控制箭头方向。

```tsx
<Cell title="单元格" rightIcon={<Arrow />} clickable />
<Cell title="单元格" rightIcon={<Arrow />} clickable>内容</Cell>
<Cell title="单元格" rightIcon={<ArrowDown />} clickable>内容</Cell>
```

### 分组标题

通过 `Cell.Group` 的 `title` 属性可以指定分组标题。

```tsx
<Cell.Group title="分组 1">
  <Cell title="单元格">内容</Cell>
</Cell.Group>
<Cell.Group title="分组 2">
  <Cell title="单元格">内容</Cell>
</Cell.Group>
```

### 对齐方式

通过 `align` 属性可以改变 `Cell` 的左右内容的对齐方式。

```tsx
<Cell title="单元格" brief="align start" size="large" align="start">内容</Cell>
<Cell title="单元格" brief="align center" size="large" align="center">内容</Cell>
<Cell title="单元格" brief="align end" size="large" align="end">内容</Cell>
```

## API

### Cell.Group Props

| 参数       | 说明          | 类型        | 默认值     |
|----------|-------------|-----------|---------|
| title    | 分组标题        | _string_  | `-`     |
| inset    | 是否展示为圆角卡片风格 | _boolean_ | `false` |
| bordered | 是否显示外边框     | _boolean_ | `true`  |

### Cell Props

| 参数        | 说明                                               | 类型          | 默认值     |
|-----------|--------------------------------------------------|-------------|---------|
| title     | 左侧标题                                             | _number \| string_ | - |
| children  | 右侧内容                                             | _number \| string_ | - |
| brief     | 标题下方的描述信息                                        | _string_    | -       |
| size      | 单元格大小，可选值为 `large`                               | _string_    | -       |
| icon      | 左侧[图标](/components/icon)或[图片](/components/image) | _ReactNode_ | -       |
| rightIcon | 右侧[图标](/components/icon)或[图片](/components/image) | _ReactNode_ | -       |
| bordered  | 是否显示内边框                                          | _boolean_   | `true`  |
| clickable | 是否开启点击反馈                                         | _boolean_   | `false` |
| required  | 是否显示表单必填星号                                       | _boolean_   | `false` |
| align     | 对齐方式，可选值为 `start` `center` `end`                 | _string_    | -       |

### Cell Events

| 事件名     | 说明       | 回调参数                |
|---------|----------|---------------------|
| onClick | 点击单元格时触发 | _event: MouseEvent_ |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider](/components/config-provider/) 组件。

| 名称                               | 默认值                                                                       | 描述  |
|----------------------------------|---------------------------------------------------------------------------|-----|
| --cell-font-size                 | _var(--font-size-md)_                                                     | -   |
| --cell-line-height               | _24px * $hd_                                                              | -   |
| --cell-color                     | _var(--text-color)_                                                       | -   |
| --cell-background-color          | _var(--white)_                                                            | -   |
| --cell-border-color              | _var(--border-color)_                                                     | -   |
| --cell-value-color               | _var(--gray-6)_                                                           | -   |
| --cell-active-color              | _var(--active-color)_                                                     | -   |
| --cell-required-color            | _var(--danger-color)_                                                     | -   |
| --cell-icon-size                 | _16px * $hd_                                                              | -   |
| --cell-icon-margin-left          | _4px * $hd_                                                               | -   |
| --cell-right-icon-margin-right   | _4px * $hd_                                                               | -   |
| --cell-brief-margin-top          | _var(--padding-base)_                                                     | -   |
| --cell-brief-font-size           | _var(--font-size-sm)_                                                     | -   |
| --cell-brief-line-height         | _var(--line-height-sm)_                                                   | -   |
| --cell-brief-color               | _var(--gray-6)_                                                           | -   |
| --cell-vertical-padding          | _10px * $hd_                                                              | -   |
| --cell-horizontal-padding        | _var(--padding-md)_                                                       | -   |
| --cell-vertical-padding-large    | _var(--padding-sm)_                                                       | -   |
| --cell-title-font-size-large     | _var(--font-size-lg)_                                                     | -   |
| --cell-subtitle-font-size-large  | _var(--font-size-md)_                                                     | -   |
| --cell-group-background-color    | _var(--white)_                                                            | -   |
| --cell-group-title-color         | _var(--gray-6)_                                                           | -   |
| --cell-group-title-padding       | _var(--padding-md) var(--padding-md) var(--padding-xs)_                   | -   |
| --cell-group-title-font-size     | _var(--font-size-md)_                                                     | -   |
| --cell-group-title-line-height   | _16px * $hd_                                                              | -   |
| --cell-group-inset-padding       | _0 var(--padding-md)_                                                     | -   |
| --cell-group-inset-border-radius | _var(--border-radius-lg)_                                                 | -   |
| --cell-group-inset-title-padding | _var(--padding-md) var(--padding-md) var(--padding-xs) var(--padding-xl)_ | -   |

# Divider 分割线

### 介绍

用于将内容分隔为多个区域。

### 引入

```ts
import { Divider } from "@taroify/core"
// or
import Divider from "@taroify/core/divider"
```

## 代码演示

### 基础用法

默认渲染一条水平分割线。

```tsx
<Divider />
```

### 展示文字

通过插槽在可以分割线中间插入内容。

```tsx
<Divider>文本</Divider>
```

### 内容位置

通过 `orientation` 指定内容所在位置。

```tsx
<Divider>
  <Divider.Text orientation="left">文字</Divider.Text>
</Divider>
<Divider>
  <Divider.Text orientation="right">文字</Divider.Text>
</Divider>
```

### 虚线

添加 `dashed` 属性使分割线渲染为虚线。

```tsx
<Divider dashed>文本</Divider>
```

### 自定义样式

可以使用 `className` 属性，也可以直接通过 `style` 属性设置分割线的样式。

```tsx
<Divider style={{ color: "#1989fa", borderColor: "#1989fa", padding: "0 16px" }}>
  文本
</Divider>
```

## API

### Divider Props

| 参数       | 说明           | 类型        | 默认值     |
|----------|--------------|-----------|---------|
| dashed   | 是否使用虚线       | _boolean_ | `false` |
| hairline | 是否使用 0.5px 线 | _boolean_ | `true`  |

### Divider.Text Props

| 参数          | 说明                       | 类型       | 默认值      |
|-------------|--------------------------|----------|----------|
| orientation | 内容位置，可选值为 `left` `right` | _string_ | `center` |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider](/components/config-provider/) 组件。

| 名称                            | 默认值                            | 描述  |
|-------------------------------|--------------------------------|-----|
| --divider-margin              | _var(--padding-md) 0_          | -   |
| --divider-color               | _var(--gray-6)_                | -   |
| --divider-font-size           | _var(--font-size-md)_          | -   |
| --divider-line-height         | _24px * $hd_                   | -   |
| --divider-border-color        | _var(--border-color)_          | -   |
| --divider-border-width        | _var(--border-width-base) 0 0_ | -   |
| --divider-content-padding     | _var(--padding-md)_            | -   |
| --divider-content-left-width  | _10%_                          | -   |
| --divider-content-right-width | _10%_                          | -   |

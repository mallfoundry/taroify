# Badge 徽标

### 介绍

在右上角展示徽标数字或小红点。

### 引入

```ts
import { Badge } from "@taroify/core"
// or
import Badge from "@taroify/core/badge"
```

## 代码演示

### 基础用法

设置 `content` 属性后，Badge 会在子元素的右上角显示对应的徽标，也可以通过 `dot` 来显示小红点。

```tsx
<Badge content={5}>
  <View className="badge-block" />
</Badge>
<Badge content="10">
  <View className="badge-block" />
</Badge>
<Badge content="Hot">
  <View className="badge-block" />
</Badge>
<Badge dot>
  <View className="badge-block" />
</Badge>
```

```scss
.badge-block {
  width: 40px * 2;
  height: 40px* 2;
  background: #f2f3f5ff;
  border-radius: 4px * 2;
}
```

### 最大值

设置 `max` 属性后，当 `content` 的数值超过最大值时，会自动显示为 `{max}+`。

```tsx
<Badge content={10} max={9}>
  <View className="badge-block" />
</Badge>
<Badge content={21} max={20}>
  <View className="badge-block" />
</Badge>
<Badge content={100} max={99}>
  <View className="badge-block" />
</Badge>
```

### 自定义颜色

通过 `color` 属性来设置徽标的颜色。

```tsx
<Badge className="custom-color" content={5}>
  <View className="badge-block" />
</Badge>
<Badge className="custom-color" content={10}>
  <View className="badge-block" />
</Badge>
<Badge className="custom-color" content="Hot">
  <View className="badge-block" />
</Badge>
<Badge className="custom-color" dot>
  <View className="badge-block" />
</Badge>
```

```scss
.custom-color {
  --badge-background-color: #1989fa;
}
```

### 自定义徽标内容

通过 `content` 属性可以自定义徽标的内容，比如插入一个图标。

```tsx
<Badge content={<Success className="badge-icon" />}>
  <View className="badge-block" />
</Badge>
<Badge content={<Cross className="badge-icon" />}>
  <View className="badge-block" />
</Badge>
<Badge content={<Down className="badge-icon" />}>
  <View className="badge-block" />
</Badge>
```

```scss
.badge-icon {
  display: block;
  margin-left: 0;
  font-size: 10px * 2;
  line-height: 16px * 2;
}
```

### 自定义徽标位置

通过 `position` 属性来设置徽标的位置。

```tsx
<Badge content={10} position="top-left">
  <View className="badge-block" />
</Badge>
<Badge content={10} position="top-right">
  <View className="badge-block" />
</Badge>
<Badge content={10} position="bottom-left">
  <View className="badge-block" />
</Badge>
<Badge content={10} position="bottom-right">
  <View className="badge-block" />
</Badge>
```

### 独立展示

当 Badge 没有子元素时，会作为一个独立的元素进行展示。

```tsx
<Badge content="20" />
<Badge content={100} max={99} />
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | 徽标内容 | _ReactNode_ | - |
| dot | 是否展示为小红点 | _boolean_ | `false` |
| max | 最大值，超过最大值会显示 `{max}+`，仅当 content 为数字时有效 | _number \| string_ | - |
| position | 徽标位置，可选值为 `top-left` `bottom-left` `bottom-right` | _string_ | `top-right` |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider](/components/config-provider/) 组件。

| 名称                       | 默认值                                                     | 描述  |
|--------------------------|---------------------------------------------------------|-----|
| --badge-size             | _16px * $hd_                                            | -   |
| --badge-color            | _var(--white)_                                          | -   |
| --badge-padding          | _0 3px * $hd_                                           | -   |
| --badge-font-family      | _-apple-system-font, helvetica neue, arial, sans-serif_ | -   |
| --badge-font-size        | _var(--font-size-sm)_                                   | -   |
| --badge-font-weight      | _var(--font-weight-bold)_                               | -   |
| --badge-border-width     | _var(--border-width-base)_                              | -   |
| --badge-border-color     | _var(--white)_                                          | -   |
| --badge-border-radius    | _var(--border-radius-max)_                              | -   |
| --badge-background-color | _var(--red)_                                            | -   |
| --badge-dot-color        | _var(--badge-background-color)_                         | -   |
| --badge-dot-size         | _8PX_                                                   | -   |

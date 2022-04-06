# Rate 评分

### 介绍

用于对事物进行评级操作。

### 引入

```tsx
import { Rate } from "@taroify/core"
```

## 代码演示

### 基础用法

通过 `value` 来绑定当前评分值。

```tsx
<Rate value={3} />
```

### 自定义图标

通过 `fullIcon` 属性设置选中时的图标，`voidIcon` 属性设置未选中时的图标。

```tsx
<Rate defaultValue={3} icon={<Like />} emptyIcon={<LikeOutlined />} />
```

### 自定义样式

通过 `size` 属性设置图标大小，`css` 设置选中时的颜色，`emptyIcon` 设置未选中时的颜色。

```tsx
 <Rate className="custom-color" defaultValue={3} allowHalf size={25} emptyIcon={<Star />} />
```

```scss
.custom-color {
  --rate-icon-empty-color: #eee;
  --rate-icon-full-color: #ffd21e;
}
```

### 半星

设置 `allowHalf` 属性后可以选中半星。

```tsx
<Rate defaultValue={3} allowHalf />
```

### 自定义数量

通过 `count` 属性设置评分总数。

```tsx
<Rate defaultValue={3} count={6} />
```

### 禁用状态

通过 `disabled` 属性来禁用评分。

```tsx
<Rate defaultValue={3} disabled />
```

### 只读状态

通过 `readonly` 属性将评分设置为只读状态。

```tsx
<Rate defaultValue={3} readonly />
```

### 只读状态显示小数

设置 `readonly` 和 `allowHalf` 属性后，Rate 组件可以展示任意小数结果。

```tsx
<Rate defaultValue={3.3} readonly allowHalf />
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultValue | 默认当前分值 | _number_ | - |
| value | 当前分值 | _number_ | - |
| count | 图标总数 | _number \| string_ | `5` |
| size | 图标大小，默认单位为`px` | _number \| string_ | `20px` |
| gutter | 图标间距，默认单位为`px` | _number \| string_ | `4px` |
| icon | 选中时的图标 | _string_ | `<Star />` |
| emptyIcon | 未选中时的图标 | _string_ | `<StarOutlined />` |
| allowHalf | 是否允许半选 | _boolean_ | `false` |
| readonly | 是否为只读状态，只读状态下无法修改评分 | _boolean_ | `false` |
| disabled | 是否禁用评分 | _boolean_ | `false` |
| touchable | 是否可以通过滑动手势选择评分 | _boolean_ | `true` |

### Events

| 事件名 | 说明                     | 回调参数 |
| ------ | ------------------------ | -------- |
| onChange | 当前分值变化时触发的事件 | _value :number_ |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider](/components/config-provider/) 组件。

| 名称                       | 默认值                   | 描述  |
|--------------------------|-----------------------|-----|
| rate-icon-size           | _20px * $hd_          | -   |
| rate-icon-gutter         | _var(--padding-base)_ | -   |
| rate-icon-empty-color    | _var(--gray-5)_       | -   |
| rate-icon-full-color     | _var(--danger-color)_ | -   |
| rate-icon-disabled-color | _var(--gray-5)_       | -   |

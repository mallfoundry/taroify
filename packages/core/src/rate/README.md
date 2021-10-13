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
function BasicRate() {
  const [value, setValue] = useState(3)
  return <Rate value={value} onChange={setValue} />
}
```

### 自定义图标

通过 `fullIcon` 属性设置选中时的图标，`voidIcon` 属性设置未选中时的图标。

```tsx
function CustomIconRate() {
  const [value, setValue] = useState(3)
  return <Rate fullIcon={<Like />} voidIcon={<LikeOutlined />} value={value} onChange={setValue} />
}
```

### 自定义样式

通过 `size` 属性设置图标大小，`color` 属性设置选中时的颜色，`voidColor` 设置未选中时的颜色。

```tsx
function CustomStyledRate() {
  const [value, setValue] = useState(3)
  return (
    <Rate
      className="custom-color"
      allowHalf
      size={25}
      voidIcon={<Star />}
      value={value}
      onChange={setValue}
    />
  )
}
```

```scss
.custom-color {
  .taroify-rate__icon {
    color: #eee;

    &--full {
      color: #ffd21e;
    }
  }
}
```

### 半星

设置 `allowHalf` 属性后可以选中半星。

```tsx
function HalfRate() {
  const [value, setValue] = useState(3)
  return <Rate allowHalf value={value} onChange={setValue} />
}
```

### 自定义数量

通过 `count` 属性设置评分总数。

```tsx
function Count6Rate() {
  const [value, setValue] = useState(3)
  return <Rate count={6} value={value} onChange={setValue} />
}

```

### 禁用状态

通过 `disabled` 属性来禁用评分。

```tsx
function DisabledRate() {
  const [value, setValue] = useState(3)
  return <Rate disabled value={value} onChange={setValue} />
}
```

### 只读状态

通过 `readonly` 属性将评分设置为只读状态。

```tsx
function ReadonlyRate() {
  const [value, setValue] = useState(3)
  return <Rate readonly value={value} onChange={setValue} />
}
```

### 只读状态显示小数

设置 `readonly` 和 `allowHalf` 属性后，Rate 组件可以展示任意小数结果。

```tsx
function ReadonlyHalfRate() {
  const [value, setValue] = useState(3.3)
  return <Rate readonly allowHalf value={value} onChange={setValue} />
}
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
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
| onChange | 当前分值变化时触发的事件 | 当前分值 |

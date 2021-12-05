# Switch 开关

### 介绍

用于在打开和关闭状态之间进行切换。

### 引入

```tsx
import { Switch } from "@taroify/core"
```

## 代码演示

### 基础用法

通过 `checked` 绑定开关的选中状态，`true` 表示开，`false` 表示关。

```tsx
<Switch />
```

### 禁用状态

通过 `disabled` 属性来禁用开关，禁用状态下开关不可点击。

```tsx
<Switch disabled />
```

### 加载状态

通过 `loading` 属性设置开关为加载状态，加载状态下开关不可点击。

```tsx
<Switch loading />
```

### 自定义大小

通过 `size` 属性自定义开关的大小。

```tsx
<Switch size="24" />
```

### 自定义颜色

通过 `css` 设置打开与关闭时的背景色。

```tsx
<Switch className="custom-color" />
```

```scss
.custom-color {
  --switch-background-color: #dcdee0;
  --switch-checked-color: #ee0a24;
}
```

### 搭配单元格使用

```tsx
<Cell align="center" title="标题" rightIcon={<Switch size="24" />} />
```

## API

### Props

| 参数           | 说明                     | 类型               | 默认值    |
| -------------- | ------------------------ | ------------------ | --------- |
| defaultChecked | 默认开关选中状态             | _boolean_              | `false`   |
| checked        | 开关选中状态             | _boolean_              | `false`   |
| loading        | 是否为加载状态           | _boolean_          | `false`   |
| disabled       | 是否为禁用状态           | _boolean_          | `false`   |
| size           | 开关尺寸，默认单位为`px` | _number \| string_ | `30px`    |

### Events

| 事件名 | 说明               | 回调参数            |
| ------ | ------------------ | ------------------- |
| onChange | 开关状态切换时触发 | _value: boolean_        |

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
function BasicSwitch() {
  const [checked, setChecked] = useState(false)
  return <Switch checked={checked} onChange={setChecked} />
}
```

### 禁用状态

通过 `disabled` 属性来禁用开关，禁用状态下开关不可点击。

```tsx
<Switch checked disabled />
```

### 加载状态

通过 `loading` 属性设置开关为加载状态，加载状态下开关不可点击。

```tsx
<Switch checked loading />
```

### 自定义大小

通过 `size` 属性自定义开关的大小。

```tsx
<Switch checked size="24" />
```

### 自定义颜色

通过 `css` 设置打开与关闭时的背景色。

```tsx
<Switch className="custom-color" checked />
```

```scss
.custom-color.taroify-switch {
  background: #dcdee0;

  &--checked {
    background: #ee0a24;

    .taroify-switch__loading {
      color: #ee0a24;
    }
  }
}
```

### 搭配单元格使用

```tsx
function SwitchWithCell() {
  const [checked, setChecked] = useState(false)
  return (
    <Cell
      align="center"
      title="标题"
      rightIcon={<Switch checked={checked} onChange={setChecked} size="24" />}
    />
  )
}
```

## API

### Props

| 参数           | 说明                     | 类型               | 默认值    |
| -------------- | ------------------------ | ------------------ | --------- |
| checked        | 开关选中状态             | _any_              | `false`   |
| loading        | 是否为加载状态           | _boolean_          | `false`   |
| disabled       | 是否为禁用状态           | _boolean_          | `false`   |
| size           | 开关尺寸，默认单位为`px` | _number \| string_ | `30px`    |

### Events

| 事件名 | 说明               | 回调参数            |
| ------ | ------------------ | ------------------- |
| onChange | 开关状态切换时触发 | _value: boolean_        |
| onClick  | 点击时触发         | _event: MouseEvent_ |

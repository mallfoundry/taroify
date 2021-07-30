# Radio 单选框

### 介绍

在一组备选项中进行单选。

### 引入

```tsx
import { Radio } from "@taroify/core";
```

## 代码演示

### 基础用法

通过 `value` 绑定值当前选中项的 name。

```tsx
function BasicRadio() {
  const [value, setValue] = useState("1")
  return (
    <Radio.Group value={value} onChange={setValue}>
      <Radio name="1">单选框 1</Radio>
      <Radio name="2">单选框 2</Radio>
    </Radio.Group>
  )
}
```

### 水平排列

将 `direction` 属性设置为 `horizontal` 后，单选框组会变成水平排列。

```tsx
function HorizontalRadio() {
  const [value, setValue] = useState("1")
  return (
    <Radio.Group direction="horizontal" value={value} onChange={setValue}>
      <Radio name="1">单选框 1</Radio>
      <Radio name="2">单选框 2</Radio>
    </Radio.Group>
  )
}
```

### 禁用状态

通过 `disabled` 属性禁止选项切换，在 `Radio` 上设置 `disabled` 可以禁用单个选项。

```tsx
function DisabledRadio() {
  const [value, setValue] = useState("1")
  return (
    <Radio.Group disabled value={value} onChange={setValue}>
      <Radio name="1">单选框 1</Radio>
      <Radio name="2">单选框 2</Radio>
    </Radio.Group>
  )
}
```

### 自定义形状

将 `shape` 属性设置为 `square`，单选框的形状会变成方形。

```tsx
function SquareRadio() {
  const [value, setValue] = useState("1")
  return (
    <Radio.Group value={value} onChange={setValue}>
      <Radio name="1" shape="square">
        单选框 1
      </Radio>
      <Radio name="2" shape="square">
        单选框 2
      </Radio>
    </Radio.Group>
  )
}
```

### 自定义颜色

通过 `color` 属性设置选中状态的图标颜色。

```tsx
function CustomColorRadio() {
  const [value, setValue] = useState("1")
  return (
    <Radio.Group color="#ee0a24" value={value} onChange={setValue}>
      <Radio name="1">单选框 1</Radio>
      <Radio name="2">单选框 2</Radio>
    </Radio.Group>
  )
}
```

### 自定义大小

通过 `size` 属性可以自定义图标的大小。

```tsx
function CustomSizeRadio() {
  const [value, setValue] = useState("1")
  return (
    <Radio.Group size={24} value={value} onChange={setValue}>
      <Radio name="1">单选框 1</Radio>
      <Radio name="2">单选框 2</Radio>
    </Radio.Group>
  )
}
```

### 自定义图标

通过 `icon` 属性自定义图标。

```tsx
function CustomIconRadio() {
  const [value, setValue] = useState("1")
  return (
    <Radio.Group value={value} onChange={setValue}>
      <Radio
        name="1"
        icon={
          <Image
            src={`https://img.yzcdn.cn/vant/user-${value === "1" ? "active" : "inactive"}.png`}
            style={{
              width: "25px",
              height: "20px",
            }}
          />
        }
      >
        单选框 1
      </Radio>
      <Radio
        name="2"
        icon={
          <Image
            src={`https://img.yzcdn.cn/vant/user-${value === "2" ? "active" : "inactive"}.png`}
            style={{
              width: "25px",
              height: "20px",
            }}
          />
        }
      >
        单选框 1
      </Radio>
    </Radio.Group>
  )
}
```

### 与 Cell 组件一起使用

此时你需要再引入 `Cell` 和 `Cell.Group` 组件。

```tsx
function RadioCellGroup() {
  const [value, setValue] = useState("1")

  return (
    <Radio.Group value={value} onChange={setValue}>
      <Cell.Group clickable>
        <Cell title="单选框 1">
          <Radio name="1" />
        </Cell>
        <Cell title="单选框 2">
          <Radio name="2" />
        </Cell>
      </Cell.Group>
    </Radio.Group>
  )
}
```

## API

### Radio Props

| 参数           | 说明                      | 类型               | 默认值    |
| -------------- | ------------------------- | ------------------ | --------- |
| name           | 标识符                    | _any_              | -         |
| shape          | 形状，可选值为 `square`   | _string_           | `round`   |
| disabled       | 是否为禁用状态            | _boolean_          | `false`   |
| size           | 图标大小，默认单位为`px`  | _number \| string_ | `20px`    |
| color          | 选中状态颜色              | _string_           | `#1989fa` |

### RadioGroup Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前选中项的标识符 | _any_ | - |
| disabled | 是否禁用所有单选框 | _boolean_ | `false` |
| direction | 排列方向，可选值为`horizontal` | _string_ | `vertical` |
| size | 所有单选框的图标大小，默认单位为`px` | _number \| string_ | `20px` |
| color | 所有单选框的选中状态颜色 | _string_ | `#1989fa` |

### Radio Events

| 事件名 | 说明             | 回调参数            |
| ------ | ---------------- | ------------------- |
| onClick  | 点击单选框时触发 | _event: ITouchEvent_ |

### RadioGroup Events

| 事件名 | 说明                     | 回调参数       |
| ------ | ------------------------ | -------------- |
| onChange | 当绑定值变化时触发的事件 | _name: string_ |

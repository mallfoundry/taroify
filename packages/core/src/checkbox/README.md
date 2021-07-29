# Checkbox 复选框

### 介绍

在一组备选项中进行多选。

### 引入

```tsx
import { Checkbox } from "@taroify/core"
```

## 代码演示

### 基础用法

通过 `checked` 绑定复选框的勾选状态。

```tsx
function BasicCheckbox() {
  const [value, setValue] = useState(false)
  return (
    <Checkbox checked={value} onChange={setValue}>
      复选框
    </Checkbox>
  )
}
```

### 禁用状态

通过设置 `disabled` 属性可以禁用复选框。

```tsx
<Checkbox disabled checked={false}>复选框</Checkbox>
<Checkbox disabled checked>复选框</Checkbox>
```

### 自定义形状

将 `shape` 属性设置为 `square`，复选框的形状会变成方形。

```tsx
<Checkbox shape="square">自定义形状</Checkbox>
```

### 自定义颜色

通过 `color` 属性设置选中状态的图标颜色。

```tsx
function CheckboxWithCustomColor() {
  const [value, setValue] = useState(false)
  return (
    <Checkbox color="#ee0a24" checked={value} onChange={setValue}>
      自定义颜色
    </Checkbox>
  )
}
```

### 自定义大小

通过 `size` 属性可以自定义图标的大小。

```tsx
<Checkbox size={24} checked>自定义大小</Checkbox>
```

### 自定义图标

通过 `icon` 属性自定义图标。

```tsx
function CheckboxWithCustomIcon() {
  const [value, setValue] = useState(false)

  return (
    <Checkbox
      icon={
        <Image
          src={`https://img.yzcdn.cn/vant/user-${value ? "active" : "inactive"}.png`}
          style={{
            width: "25px",
            height: "20px",
          }}
        />
      }
      checked={value}
      onChange={setValue}
    >
      自定义图标
    </Checkbox>
  )
}
```

### 复选框组

复选框可以与复选框组一起使用，复选框组通过 `value` 数组绑定复选框的勾选状态。

```tsx
function BasicCheckboxGroup() {
  const [value, setValue] = useState(["a", "b"])

  return (
    <Checkbox.Group value={value} onChange={setValue}>
      <Checkbox name="a">复选框 a</Checkbox>
      <Checkbox name="b">复选框 b</Checkbox>
    </Checkbox.Group>
  )
}
```

### 水平排列

将 `direction` 属性设置为 `horizontal` 后，复选框组会变成水平排列。

```tsx
function HorizontalCheckboxGroup() {
  const [value, setValue] = useState<string[]>([])

  return (
    <Checkbox.Group direction="horizontal" value={value} onChange={setValue}>
      <Checkbox name="a">复选框 a</Checkbox>
      <Checkbox name="b">复选框 b</Checkbox>
    </Checkbox.Group>
  )
}
```

### 限制最大可选数

通过 `max` 属性可以限制复选框组的最大可选数。

```tsx
function MaxCheckboxGroup() {
  const [value, setValue] = useState<string[]>([])

  return (
    <Checkbox.Group max={2} value={value} onChange={setValue}>
      <Checkbox name="a">复选框 a</Checkbox>
      <Checkbox name="b">复选框 b</Checkbox>
      <Checkbox name="c">复选框 c</Checkbox>
    </Checkbox.Group>
  )
}
```

### 搭配单元格组件使用

此时你需要再引入 `Cell` 和 `Cell.Group` 组件，并通过 `Checkbox` 实例上的 toggle 方法触发切换。

```tsx
function CheckboxCellGroup() {
  const [value, setValue] = useState<string[]>([])

  return (
    <Checkbox.Group max={2} value={value} onChange={setValue}>
      <Cell.Group clickable>
        <Cell title="复选框 a">
          <Checkbox name="a" />
        </Cell>
        <Cell title="复选框 b">
          <Checkbox name="b" />
        </Cell>
      </Cell.Group>
    </Checkbox.Group>
  )
}
```

## API

### Checkbox Props

| 参数           | 说明                      | 类型               | 默认值    |
| -------------- | ------------------------- | ------------------ | --------- |
| checked        | 是否为选中状态            | _boolean_          | `false`   |
| name           | 标识符                    | _any_              | -         |
| shape          | 形状，可选值为 `square`   | _string_           | `round`   |
| disabled       | 是否禁用复选框            | _boolean_          | `false`   |
| size      | 图标大小，默认单位为 `px` | _number \| string_ | `20px`    |
| color  | 选中状态颜色              | _string_           | `#1989fa` |

### CheckboxGroup Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 所有选中项的标识符 | _any[]_ | - |
| disabled | 是否禁用所有复选框 | _boolean_ | `false` |
| max | 最大可选数，`0` 为无限制 | _number \| string_ | `0` |
| direction | 排列方向，可选值为 `horizontal` | _string_ | `vertical` |
| size | 所有复选框的图标大小，默认单位为 `px` | _number \| string_ | `20px` |
| color | 所有复选框的选中状态颜色 | _string_ | `#1989fa` |

### Checkbox Events

| 事件名 | 说明                     | 回调参数            |
| ------ | ------------------------ | ------------------- |
| onChange | 当绑定值变化时触发的事件 | _checked: boolean_  |
| onClick  | 点击复选框时触发         | _event: ITouchEvent_ |

### CheckboxGroup Events

| 事件名 | 说明                     | 回调参数       |
| ------ | ------------------------ | -------------- |
| onChange | 当绑定值变化时触发的事件 | _names: any[]_ |

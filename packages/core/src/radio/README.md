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
<Radio.Group defaultValue="1">
  <Radio name="1">单选框 1</Radio>
  <Radio name="2">单选框 2</Radio>
</Radio.Group>
```

### 水平排列

将 `direction` 属性设置为 `horizontal` 后，单选框组会变成水平排列。

```tsx
<Radio.Group defaultValue="1" direction="horizontal">
  <Radio name="1">单选框 1</Radio>
  <Radio name="2">单选框 2</Radio>
</Radio.Group>
```

### 禁用状态

通过 `disabled` 属性禁止选项切换，在 `Radio` 上设置 `disabled` 可以禁用单个选项。

```tsx
<Radio.Group defaultValue="1" disabled>
  <Radio name="1">单选框 1</Radio>
  <Radio name="2">单选框 2</Radio>
</Radio.Group>
```

### 自定义形状

将 `shape` 属性设置为 `square`，单选框的形状会变成方形。

```tsx
<Radio.Group defaultValue="1">
  <Radio name="1" shape="square">
    单选框 1
  </Radio>
  <Radio name="2" shape="square">
    单选框 2
  </Radio>
</Radio.Group>
```

### 自定义颜色

通过 `css` 属性设置选中状态的图标颜色。

```tsx
<Radio.Group className="custom-color" defaultValue="1">
  <Radio name="1">单选框 1</Radio>
  <Radio name="2">单选框 2</Radio>
</Radio.Group>
```

```scss
.custom-color {
  --radio-checked-icon-background-color: #ee0a24;
  --radio-checked-icon-border-color: #ee0a24;
}
```

### 自定义大小

通过 `size` 属性可以自定义图标的大小。

```tsx
<Radio.Group defaultValue="1" size={24}>
  <Radio name="1">单选框 1</Radio>
  <Radio name="2">单选框 2</Radio>
</Radio.Group>
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
<Radio.Group defaultValue="1">
  <Cell.Group clickable>
    <Cell title="单选框 1">
      <Radio name="1" />
    </Cell>
    <Cell title="单选框 2">
      <Radio name="2" />
    </Cell>
  </Cell.Group>
</Radio.Group>
```

## API

### Radio Props

| 参数           | 说明                      | 类型               | 默认值    |
| -------------- | ------------------------- | ------------------ | --------- |
| name           | 标识符                    | _any_              | -         |
| shape          | 形状，可选值为 `square`   | _string_           | `round`   |
| disabled       | 是否为禁用状态            | _boolean_          | `false`   |
| size           | 图标大小，默认单位为`px`  | _number \| string_ | `20px`    |

### Radio.Group Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultValue | 默认选中项的标识符 | _any_ | - |
| value | 当前选中项的标识符 | _any_ | - |
| disabled | 是否禁用所有单选框 | _boolean_ | `false` |
| direction | 排列方向，可选值为`horizontal` | _string_ | `vertical` |
| size | 所有单选框的图标大小，默认单位为`px` | _number \| string_ | `20px` |

### Radio.Group Events

| 事件名 | 说明                     | 回调参数       |
| ------ | ------------------------ | -------------- |
| onChange | 当绑定值变化时触发的事件 | _name: string_ |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider](/components/config-provider/) 组件。

| 名称                                     | 默认值                              | 描述  |
|----------------------------------------|----------------------------------|-----|
| --radio-size                           | _20px * $hd_                     | -   |
| --radio-font-size                      | _var(--font-size-lg)_            | -   |
| --radio-border-color                   | _var(--gray-5)_                  | -   |
| --radio-transition-duration            | _var(--animation-duration-fast)_ | -   |
| --radio-gap                            | _var(--padding-sm)_              | -   |
| --radio-label-margin                   | _var(--padding-xs)_              | -   |
| --radio-label-color                    | _var(--text-color)_              | -   |
| --radio-label-line-height              | _var(--radio-size)_              | -   |
| --radio-disabled-label-color           | _var(--gray-5)_                  | -   |
| --radio-icon-font-size                 | _var(--radio-size)_              | -   |
| --radio-checked-icon-color             | _var(--white)_                   | -   |
| --radio-checked-icon-border-color      | _var(--primary-color)_           | -   |
| --radio-checked-icon-background-color  | _var(--primary-color)_           | -   |
| --radio-disabled-icon-color            | _var(--gray-5)_                  | -   |
| --radio-disabled-icon-border-color     | _var(--gray-5)_                  | -   |
| --radio-disabled-icon-background-color | _var(--border-color)_            | -   |

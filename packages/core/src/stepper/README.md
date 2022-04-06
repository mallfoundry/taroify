# Stepper 步进器

### 介绍

步进器由增加按钮、减少按钮和输入框组成，用于在一定范围内输入、调整数字。

### 引入

```tsx
import { Stepper } from "@taroify/core";
```

## 代码演示

### 基础用法

```tsx
<Stepper />
```

### 步长设置

通过 `step` 属性设置每次点击增加或减少按钮时变化的值，默认为 `1`。

```tsx
<Stepper step={2} />
```

### 限制输入范围

通过 `min` 和 `max` 属性限制输入值的范围。

```tsx
<Stepper min={5} max={8} />
```

### 禁用状态

通过设置 `disabled` 属性来禁用步进器，禁用状态下无法点击按钮或修改输入框。

```tsx
<Stepper disabled />
```

### 禁用输入框

通过设置 `Stepper.Input` 组件的 `disabled` 属性来禁用输入框，此时按钮仍然可以点击。

```tsx
<Stepper>
  <Stepper.Button />
  <Stepper.Input disabled />
  <Stepper.Button />
</Stepper>
```

### 固定小数位数

通过设置 `precision` 属性可以保留固定的小数位数。

```tsx
<Stepper precision={2} />
```

### 自定义大小

通过 `Stepper.Input` 组件的 `width` 属性设置输入框宽度，通过 `size` 属性设置按钮大小和输入框高度。

```tsx
<Stepper size="32">
  <Stepper.Button />
  <Stepper.Input disabled width="40" />
  <Stepper.Button />
</Stepper>
```

### 圆角风格

将 `shape` 设置为 `circular` 来展示圆角风格的步进器。

```tsx
<Stepper shape="circular" size="22" />
```

## API

### Stepper Props

| 参数 | 说明                     | 类型 | 默认值 |
| --- |------------------------| --- | --- |
| defaultValue | 默认输入的值                 | _number \| string_ | - |
| value | 当前输入的值                 | _number \| string_ | - |
| min | 最小值                    | _number \| string_ | `1` |
| max | 最大值                    | _number \| string_ | - |
| step | 步长，每次点击时改变的值           | _number \| string_ | `1` |
| size | 按钮大小以及输入框高度，默认单位为 `px` | _number \| string_ | `28px` |
| precision| 固定显示的小数位数              | _number \| string_ | - |
| shape | 样式风格，可选值为 `square` `circular`    | _string_ | `rounded` |
| placeholder | 输入框占位提示文字              | _string_ | - |
| disabled | 是否禁用步进器                | _boolean_ | `false` |
| longPress | 是否开启长按手势               | _boolean_ | `true` |

### Stepper.Input Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| width | 输入框宽度，默认单位为 `px` | _number \| string_ | `32px` |
| disabled | 是否禁用输入框 | _boolean_ | `false` |

### Stepper.Button Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| disabled | 是否禁用按钮 | _boolean_ | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| onChange | 当绑定值变化时触发的事件 | _value: string_ |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider](/components/config-provider/) 组件。

| 名称                                                  | 默认值                                           | 描述  |
|-----------------------------------------------------|-----------------------------------------------|-----|
| --stepper-active-background-color                   | _#e8e8e8_                                     | -   |
| --stepper-background-color                          | _var($active-color)_                          | -   |
| --stepper-input-width                               | _32px * $hd_                                  | -   |
| --stepper-input-height                              | _28px * $hd_                                  | -   |
| --stepper-input-margin                              | _0 2px * $hd_                                 | -   |
| --stepper-input-font-size                           | _var(--font-size-md)_                         | -   |
| --stepper-input-line-height                         | _normal_                                      | -   |
| --stepper-input-color                               | _var(--text-color)_                           | -   |
| --stepper-input-background-color                    | _var(--stepper-background-color)_             | -   |
| --stepper-input-disabled-color                      | _var(--gray-5)_                               | -   |
| --stepper-input-disabled-background-color           | _var(--active-color)_                         | -   |
| --stepper-button-icon-color                         | _var(--text-color)_                           | -   |
| --stepper-button-disabled-color                     | _var(--gray-5)_                               | -   |
| --stepper-button-disabled-background-color          | _var(--background-color)_                     | -   |
| --stepper-rounded-button-border-radius              | _var(--border-radius-md)_                     | -   |
| --stepper-rounded-decrease-button-border-radius     | _var(--stepper-rounded-button-border-radius)_ | -   |
| --stepper-rounded-increase-button-border-radius     | _var(--stepper-rounded-button-border-radius)_ | -   |
| --stepper-circular-decrease-button-color            | _var(--danger-color)_                         | -   |
| --stepper-circular-decrease-button-background-color | _var(--white)_                                | -   |
| --stepper-circular-decrease-button-border-color     | _var(--danger-color)_                         | -   |
| --stepper-circular-increase-button-color            | _var(--white)_                                | -   |
| --stepper-circular-increase-button-background-color | _var(--danger-color)_                         | -   |

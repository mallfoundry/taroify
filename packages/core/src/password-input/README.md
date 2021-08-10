# PasswordInput 密码输入框

### 介绍

带网格的输入框组件，可以用于输入密码、短信验证码等场景，通常与[数字键盘](/components/number-keyboard/)组件配合使用。

### 引入

```tsx
import { PasswordInput } from "@taroify/core";
```

## 代码演示

### 基础用法

搭配数字键盘组件来实现密码输入功能。

```tsx
<PasswordInput value="123" />
```

### 自定义长度

通过 `length` 属性来设置密码长度。

```tsx
<PasswordInput length={6} value="123" />
```

### 格子间距

通过 `gutter` 属性来设置格子之间的间距。

```tsx
<PasswordInput gutter={10} value="123" />
```

### 明文展示

将 `mask` 设置为 `false` 可以明文展示输入的内容，适用于短信验证码等场景。

```tsx
<PasswordInput mask={false} value="123" />
```

### 提示信息

通过 `info` 属性设置提示信息，通过 `error` 属性设置错误提示，例如当输入六位时提示密码错误。

```tsx
<PasswordInput info="密码为 6 位数字" value="123" />
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 密码值 | _string_ | `''` |
| length | 密码最大长度 | _number \| string_ | `6` |
| gutter | 输入框格子之间的间距，如 `20px` `2em`，默认单位为`px` | _number \| string_ | `0` |
| mask | 是否隐藏密码内容 | _boolean_ | `true` |
| focused | 是否已聚焦，聚焦时会显示光标 | _boolean_ | `false` |
| info | 输入框下方文字提示 | _string_ | - |
| error | 输入框下方错误提示 | _boolean_ | - |

### Events

| 事件名 | 说明             | 回调参数 |
| ------ | ---------------- | -------- |
| onFocus  | 输入框聚焦时触发 | -        |

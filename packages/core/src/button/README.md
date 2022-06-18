# Button 按钮

### 介绍

按钮用于触发一个操作，如提交表单。

### 引入

```jsx
import { Button } from "@taroify/core"
```

## 代码演示

### 按钮颜色

按钮支持 `default`、`primary`、`info`、`success`、`warning`、`danger` 六种颜色，默认为 `default`。

```jsx
<Button color="primary">主要按钮</Button>
<Button color="info">信息按钮</Button>
<Button color="success">成功按钮</Button>
<Button color="warning">警告按钮</Button>
<Button color="danger">危险按钮</Button>
<Button color="default">默认按钮</Button>
```

### 文本按钮

通过 `variant="text"` 属性将按钮设置为文本按钮。

```jsx
<Button variant="text" color="primary">主要按钮</Button>
<Button variant="text" color="info">信息按钮</Button>
<Button variant="text" color="success">成功按钮</Button>
<Button variant="text" color="warning">警告按钮</Button>
<Button variant="text" color="danger">危险按钮</Button>
<Button variant="text" color="default">默认按钮</Button>
```

### 轮廓按钮

通过 `variant="contained"` 属性将按钮设置为轮廓按钮。

```jsx
<Button variant="outlined" color="primary">主要按钮</Button>
<Button variant="outlined" color="info">信息按钮</Button>
<Button variant="outlined" color="success">成功按钮</Button>
<Button variant="outlined" color="warning">警告按钮</Button>
<Button variant="outlined" color="danger">危险按钮</Button>
<Button variant="outlined" color="default">默认按钮</Button>
```

### 细边框

设置 `hairline` 属性可以展示 0.5px 的细边框。

```jsx
<Button variant="outlined" color="primary" hairline>主要按钮</Button>
<Button variant="outlined" color="info" hairline>信息按钮</Button>
<Button variant="outlined" color="success" hairline>成功按钮</Button>
<Button variant="outlined" color="warning" hairline>警告按钮</Button>
<Button variant="outlined" color="danger" hairline>危险按钮</Button>
<Button variant="outlined" color="default" hairline>默认按钮</Button>
```

### 禁用状态

通过 `disabled` 属性来禁用按钮，禁用状态下按钮不可点击。

```jsx
<Button variant="contained" color="primary" disabled>主要按钮</Button>
<Button variant="contained" color="info" disabled>信息按钮</Button>
<Button variant="contained" color="success" disabled>成功按钮</Button>
<Button variant="contained" color="warning" disabled>警告按钮</Button>
<Button variant="contained" color="danger" disabled>危险按钮</Button>
<Button variant="contained" color="default" disabled>默认按钮</Button>
```

### 加载状态

通过 `loading` 属性设置按钮为加载状态，可以通过 `{type: "spinner"}` 设置加载类型。

```tsx
<Button color="success" loading />
<Button color="success" loading={{ type: "spinner" }} />
<Button color="primary" loading>加载中...</Button>
```

### 按钮形状

通过 `shape="square"` 设置方形按钮，通过 `shape="round"` 设置圆形按钮。

```jsx
<Button variant="contained" color="primary" shape="square">方形按钮</Button>
<Button variant="contained" color="primary" shape="round">圆形按钮</Button>
```

### 图标按钮

通过 `icon` 属性设置按钮图标，支持 Icon 组件里的所有图标，也可以传入图标 URL。

```jsx
<Button variant="contained" color="primary" icon={<DoneOutlined />} />
<Button variant="contained" color="primary" icon={<DoneOutlined />}>主要按钮</Button>
<Button variant="outlined" color="primary" icon={<DoneOutlined />}>轮廓按钮</Button>
```

### 按钮尺寸

支持 `large`、`medium`、`small`、`mini` 四种尺寸，默认为 `medium`。

```jsx
<Button color="primary" size="large">大号按钮</Button>
<Button color="primary" size="medium">普通按钮</Button>
<Button color="primary" size="small">小型按钮</Button>
<Button color="primary" size="mini">迷你按钮</Button>
```

### 块级元素

按钮在默认情况下为行内块级元素，通过 `block` 属性可以将按钮的元素类型设置为块级元素。

```jsx
<Button color="primary" block>块级按钮</Button>
```

### 自定义颜色

通过 `css` 属性可以自定义按钮的颜色。

```tsx
<Button style={{ backgroundColor: "#7232dd", color: "#fff" }}>单色按钮</Button>
<Button style={{ borderColor: "#7232dd", color: "#7232dd" }}>单色按钮</Button>
<Button style={{ background: "linear-gradient(to right, #ff6034, #ee0a24)", color: "#fff" }}>渐变色按钮</Button>
```

### 按钮组

```tsx
<Button.Group variant="contained" color="primary" shape="round">
  <Button> <ArrowLeft /> 上一步</Button>
  <Button> <Replay /> 刷新</Button>
  <Button>下一步 <Arrow /></Button>
</Button.Group>

<Button.Group variant="outlined" shape="round" size="small">
  <Button> <ArrowLeft /> 上一步</Button>
  <Button><Replay /> 刷新</Button>
  <Button>下一步 <Arrow /></Button>
</Button.Group>

<Button.Group variant="text" color="primary" shape="round">
  <Button> <ArrowLeft /> 上一步</Button>
  <Button> <Replay /> 刷新</Button>
  <Button>下一步 <Arrow /></Button>
</Button.Group>
```

## API

### Props

| 参数       | 说明                                               | 类型                                                      | 默认值         |
|----------|--------------------------------------------------|---------------------------------------------------------|-------------|
| variant  | 按钮变种，可选值为 `contained` `text` `outlined`          | _string_                                                | `contained` |
| color    | 按钮颜色，可选值为 `primary` `success` `warning` `danger` | _string_                                                | `default`   |
| size     | 尺寸，可选值为 `large` `small` `mini`                   | _string_                                                | `medium`    |
| shape    | 按钮形状，可选值为 `square` `round`                       | _string_                                                | `square`    |
| icon     | 左侧[图标](/components/icon)或[图片](/components/image) | _ReactNode_                                             | -           |
| formType | 原生 button 标签的 type 属性                            | _string_                                                | `button`    |
| block    | 是否为块级元素                                          | _boolean_                                               | `false`     |
| disabled | 是否禁用按钮                                           | _boolean_                                               | `false`     |
| hairline | 是否使用 0.5px 边框                                    | _boolean_                                               | `false`     |
| loading  | 是否显示为加载状态                                        | _boolean \| [LoadingProps](/components/loading/#props)_ | `false`     |
| children | 按钮文字                                             | _string_                                                | -           |


### Button.Group Props

| 参数       | 说明                                               | 类型        | 默认值         |
|----------|--------------------------------------------------|-----------|-------------|
| variant  | 按钮变种，可选值为 `contained` `text` `outlined`          | _string_  | `contained` |
| color    | 按钮颜色，可选值为 `primary` `success` `warning` `danger` | _string_  | `default`   |
| size     | 尺寸，可选值为 `large` `small` `mini`                   | _string_  | `medium`    |
| shape    | 按钮形状，可选值为 `round`                                | _string_  | `square`    |
| block    | 是否为块级元素                                          | _boolean_ | -           |
| disabled | 是否禁用按钮                                           | _boolean_ | -           |
| hairline | 是否使用 0.5px 边框                                    | _boolean_ | -           |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider](/components/config-provider/) 组件。

| 名称                                | 默认值                                      | 描述  |
|-----------------------------------|------------------------------------------|-----|
| --button-line-height              | _1.2_                                    | -   |
| --button-border-width             | _var(--border-width-base)_               | -   |
| --button-border-radius            | _var(--border-radius-sm)_                | -   |
| --button-border-radius-max        | _var(--border-radius-max)_               | -   |
| --button-transition-duration      | _var(--animation-duration-fast)_         | -   |
| --button-disabled-opacity         | _var(--disabled-opacity)_                | -   |
| --button-loading-icon-size        | _20px * $hd_                             | -   |
| --button-height-mini              | _24px * $hd_                             | -   |
| --button-padding-mini             | _0 var(--padding-base)_                  | -   |
| --button-font-size-mini           | _var(--font-size-xs)_                    | -   |
| --button-height-small             | _32px * $hd_                             | -   |
| --button-padding-small            | _0 var(--padding-xs)_                    | -   |
| --button-font-size-small          | _var(--font-size-sm)_                    | -   |
| --button-height-medium            | _44px * $hd_                             | -   |
| --button-padding-medium           | _0 var(--padding-md)_                    | -   |
| --button-font-size-medium         | _var(--font-size-md)_                    | -   |
| --button-height-large             | _50px * $hd_                             | -   |
| --button-font-size-large          | _var(--font-size-lg)_                    | -   |
| --button-default-color            | _var(--text-color)_                      | -   |
| --button-default-background-color | _var(--white)_                           | -   |
| --button-default-border-color     | _var(--border-color)_                    | -   |
| --button-primary-color            | _var(--white)_                           | -   |
| --button-primary-background-color | _var(--primary-color)_                   | -   |
| --button-primary-border-color     | _var(--button-primary-background-color)_ | -   |
| --button-info-color               | _var(--white)_                           | -   |
| --button-info-background-color    | _var(--info-color)_                      | -   |
| --button-info-border-color        | _var(--button-info-background-color)_    | -   |
| --button-success-color            | _var(--white)_                           | -   |
| --button-success-background-color | _var(--success-color)_                   | -   |
| --button-success-border-color     | _var(--button-success-background-color)_ | -   |
| --button-warning-color            | _var(--white)_                           | -   |
| --button-warning-background-color | _var(--warning-color)_                   | -   |
| --button-warning-border-color     | _var(--button-warning-background-color)_ | -   |
| --button-danger-color             | _var(--white)_                           | -   |
| --button-danger-background-color  | _var(--danger-color)_                    | -   |
| --button-danger-border-color      | _var(--button-danger-background-color)_  | -   |

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

### 轮廓按钮

通过 `variant="contained"` 属性将按钮设置为轮廓按钮，轮廓按钮的文字为按钮颜色，背景为白色。

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

通过 `loading` 属性设置按钮为加载状态，加载状态下默认会隐藏按钮文字，可以通过 `loading-text` 设置加载状态下的文字。

```html

<van-button loading type="primary" />
<van-button loading type="primary" loading-type="spinner" />
<van-button loading type="primary" loading-text="加载中..." />
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

通过 `color` 属性可以自定义按钮的颜色。

```html

<van-button color="#7232dd">单色按钮</van-button>
<van-button color="#7232dd" plain>单色按钮</van-button>
<van-button color="linear-gradient(to right, #ff6034, #ee0a24)">
  渐变色按钮
</van-button>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| variant | 按钮变种，可选值为 `contained` `text` `outlined` | _string_ | `contained` |
| color | 按钮颜色，可选值为 `primary` `success` `warning` `danger` | _string_ | `default` |
| size | 尺寸，可选值为 `large` `small` `mini` | _string_ | `medium` |
| shape | 按钮形状，可选值为 `circle` `round` | _string_ | `square` |
| icon | 左侧图标或图片 | _ReactNode_ | - |
| formType | 原生 button 标签的 type 属性 | _string_ | `button` |
| block | 是否为块级元素 | _boolean_ | `false` |
| disabled | 是否禁用按钮 | _boolean_ | `false` |
| hairline | 是否使用 0.5px 边框 | _boolean_ | `false` |
| loading | 是否显示为加载状态 | _boolean_ | `false` |
| children | 按钮文字 | _string_ | - |

### Events

| 事件名      | 说明                                   | 回调参数            |
| ---------- | ------------------------------------- | ------------------- |
| click      | 点击按钮，且按钮状态不为加载或禁用时触发      | _event: MouseEvent_ |
| touchstart | 开始触摸按钮时触发                       | _event: TouchEvent_ |

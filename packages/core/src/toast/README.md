# Toast 轻提示

### 介绍

在页面中间弹出黑色半透明提示，用于消息通知、加载提示、操作结果提示等场景。

### 引入

```jsx
import { Toast } from "@taroify/core"
```

## 代码演示

### 文字提示

```jsx
<Toast open>文字提示</Toast>
```

### 加载提示

使用 `type="loading"` 方法展示加载提示，通过 `forbidClick` 属性可以禁用背景点击。

```jsx
<Toast open type="loading">加载中...</Toast>
```

### 成功/失败提示

使用 `type="success"` 展示成功提示，使用 `type="fail"` 展示失败提示。

```jsx
<Toast open type="success">成功文案</Toast>
<Toast open type="fail">失败文案</Toast>
```

### 自定义图标

通过 `icon` 选项可以自定义图标，支持传入[图标名称](/components/icon)或图片链接。

```jsx
<Toast open icon={<LikeOutlined />}>自定义图标</Toast>
<Toast open icon={<Loading />}>加载中...</Toast>
```

### 自定义位置

Toast 默认渲染在屏幕正中位置，通过 `placement` 属性可以控制 Toast 展示的位置。

```jsx
<Toast open placement="top">顶部展示</Toast>
<Toast open placement="bottom">底部展示</Toast>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| open | 是否显示弹出层 | _boolean_ | `false` |
| type | 提示类型，可选值为 `loading` `success`<br>`fail` `html` | _string_ | `text` |
| icon | 自定义图标，支持传入[图标名称](/components/icon)或图片链接 | _ReactNode_ | _ |
| placement | 弹出位置，可选值为 `top` `bottom` | _string_ | `center` |
| duration | 动画时长，单位秒 | _number \| string_ | `0.3` |
| backdrop | 是否显示遮罩层 | _boolean \| static_ | `true` |
| children | 文本内容 | _ReactNode_ | `""` |

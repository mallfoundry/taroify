# Toast 轻提示

### 介绍

在页面中间弹出黑色半透明提示，用于消息通知、加载提示、操作结果提示等场景。

### 函数调用

由于小程序不支持 DOM 操作，因此需要手动在页面（page）里挂载一个 Toast 组件并指定 id 为 `toast`。

```tsx
import { Cell, Toast } from "@taroify/core"

function ImperativeToast() {
  return (
    <>
      <Toast id="toast" />
      <Cell
        title="函数调用"
        clickable
        rightIcon={<ArrowRight />}
        onClick={() => Toast.open("文字提示")}
      />
    </>
  )
}
```

### 组件调用

```tsx
import { Cell, Toast } from "@taroify/core"

function BasicToast() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Toast open={open} onClose={setOpen}>文字提示</Toast>
      <Cell title="基础用法" clickable onClick={() => setOpen(true)} />
    </>
  )
}
```

## 代码演示

### 文字提示

由于小程序不支持 DOM 操作，因此需要手动在页面（page）里挂载一个 Toast 组件并指定 id 为 `toast`。

```tsx
function TextToast() {
  return (
    <>
      <Toast id="toast" />
      <Cell
        clickable
        title="文字提示"
        rightIcon={<ArrowRight />}
        onClick={() => Toast.open("文字提示")}
      />
    </>
  )
}
```

### 加载提示

使用 `type="loading"` 方法展示加载提示。

```tsx
<Toast open type="loading">加载中...</Toast>
```

### 成功/失败提示

使用 `type="success"` 展示成功提示，使用 `type="fail"` 展示失败提示。

```tsx
<Toast open type="success">成功文案</Toast>
<Toast open type="fail">失败文案</Toast>
```

### 自定义图标

通过 `icon` 选项可以自定义图标，支持传入[图标名称](/components/icon)或图片链接。

```tsx
<Toast open icon={<LikeOutlined />}>自定义图标</Toast>
<Toast open icon={<Image style={{ width: "1em", height: "1em" }}
                         src="https://img01.yzcdn.cn/vant/logo.png" />}>
  自定义图片
</Toast>
<Toast open icon={<Loading />}>加载中...</Toast>
```

### 自定义位置

Toast 默认渲染在屏幕正中位置，通过 `position` 属性可以控制 Toast 展示的位置。

```tsx
<Toast open position="top">顶部展示</Toast>
<Toast open position="bottom">底部展示</Toast>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultOpen | 默认是否显示弹出层 | _boolean_ | `false` |
| open | 是否显示弹出层 | _boolean_ | `false` |
| type | 提示类型，可选值为 `loading` `success`<br>`fail` `html` | _string_ | `text` |
| icon | 自定义图标，支持传入[图标名称](/components/icon)或图片链接 | _ReactNode_ | - |
| position | 弹出位置，可选值为 `top` `bottom` | _string_ | `center` |
| duration | 动画时长，单位毫秒 | _number \| string_ | `300` |
| backdrop | 是否显示遮罩层 | _boolean_ | `false` |
| children | 文本内容 | _ReactNode_ | - |
| onClose | 关闭时的回调函数 | _(open : boolean) => void_ | - |

### Options

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| selector | 自定义节点选择器 | _string_ | `toast` |
| type | 提示类型，可选值为 `loading` `success`<br>`fail` `html` | _string_ | `text` |
| icon | 自定义图标，支持传入[图标](/components/icon)或[图片](/components/image) | _ReactNode_ | - |
| position | 弹出位置，可选值为 `top` `bottom` | _string_ | `center` |
| duration | 动画时长，单位毫秒 | _number \| string_ | `300` |
| backdrop | 是否显示遮罩层 | _boolean_ | `false` |
| message | 文本内容 | _ReactNode_ | - |
| onClose | 关闭时的回调函数 | _(open : boolean) => void_ | - |

### 方法

| 方法名 | 参数 | 返回值 | 介绍 |
| --- | --- | --- | --- |
| Toast.open | _options \| message_ | - | 展示提示 |
| Toast.loading | _options \| message_ | - | 展示加载提示 |
| Toast.success | _options \| message_ | - | 展示成功提示 |
| Toast.fail | _options \| message_ | - | 展示失败提示 |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider](/components/config-provider/) 组件。

| 名称                               | 默认值                                   | 描述  |
|----------------------------------|---------------------------------------|-----|
| --toast-width                    | _88px * $hd_                          | -   |
| --toast-width                    | _88px * $hd_                          | -   |
| --toast-min-height               | _88px * $hd_                          | -   |
| --toast-max-width                | _70%_                                 | -   |
| --toast-padding                  | _var(--padding-md)_                   | -   |
| --toast-font-size                | _var(--font-size-md)_                 | -   |
| --toast-line-height              | _var(--line-height-md)_               | -   |
| --toast-color                    | _var(--white)_                        | -   |
| --toast-background-color         | _rgba(var(--black-rgb), $alpha: 0.7)_ | -   |
| --toast-border-radius            | _var(--border-radius-lg)_             | -   |
| --toast-transition-duration      | _var(--animation-duration-fast)_      | -   |
| --toast-icon-font-size           | _36px * $hd_                          | -   |
| --toast-icon-color               | _var(--white)_                        | -   |
| --toast-loading-padding          | _3px * $hd_                           | -   |
| --toast-loading-color            | _var(--white)_                        | -   |
| --toast-text-min-width           | _96px * $hd_                          | -   |
| --toast-text-padding             | _var(--padding-xs) var(--padding-sm)_ | -   |
| --toast-position-distance        | _20%_                                 | -   |
| --toast-position-top-distance    | _var(--toast-position-distance)_      | -   |
| --toast-position-bottom-distance | _var(--toast-position-distance)_      | -   |

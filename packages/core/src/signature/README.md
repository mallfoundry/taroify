# Signature 签名

### 介绍

用于签名场景的组件，基于 Canvas 实现。

### 引入

```ts
import { Signature } from "@taroify/core"
```

## 代码演示

### 基础用法

Canvas实例提供两个方法

- `getImage`
  - `image`：签名对应的图片，为 base64 字符串格式。若签名为空，则返回空字符串。
  - `canvas`：Canvas 元素。
- `clear`：清空

```tsx
import { Signature, SignatureInstance, Flex, Button } from "@taroify/core"

function BasicSignature() {
  const ref = useRef<SignatureInstance>(null)
  return <>
    <Signature ref={ref} />
    <Flex justify="end">
      <Button size="small" onClick={() => { ref.current?.clear() }} style={{ marginRight: "1rem" }}>取消</Button>
      <Button size="small" color="primary" onClick={() => { console.log(ref.current?.getImage()) }}>确认</Button>
    </Flex>
  </>
}
```

### 自定义颜色

通过 `penColor` 来自定义笔触颜色。

```tsx
<Signature penColor="#ff0000" />
```

### 自定义线宽

通过 `lineWidth` 来自定义线条宽度。

```tsx
<Signature lineWidth={6} />
```

### 自定义背景颜色

通过 `backgroundColor` 来自定义背景颜色。

```tsx
<Signature backgroundColor="#eee" />
```

## API

### Signature Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 导出图片类型 | _string_ | `png` |
| penColor | 笔触颜色，默认黑色 | _string_ | `#000` |
| lineWidth | 线条宽度 | _number_ | `3` |
| backgroundColor | 背景颜色 | _string_ | - |
| canvasId| canvas id | _string_ | `taroify-canvas` |

### Signature Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| onStart | 开始签名时触发 | - |
| onEnd | 结束签名时触发 | - |
| onSigning | 签名过程中触发 | - |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider](/components/config-provider/) 组件。

| 名称 | 默认值 | 描述 |
| --- | --- | --- |
| --signature-padding | _var(--van-padding-xs)_ | - |
| --signature-content-height | _200px_ | 画布高度 |
| --signature-content-background | _var(--background-color-2)_ | 画布背景色 |
| --signature-content-border | _1px dotted #dadada_ | 画布边框样式 |
| --signature-border-radius | _8px_ | 画布圆角 |

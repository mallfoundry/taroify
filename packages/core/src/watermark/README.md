# Watermark 水印

### 介绍

在页面上添加特定的文字或图案作为水印，可用于防止信息盗用。

请升级 `taroify` 到 >= `v0.1.1-alpha.11` 版本来使用该组件。

### 引入

```tsx
import { Watermark } from "@taroify/core"
```

## 代码演示

### 文字水印

通过 `content` 属性来设置水印的文字。

```tsx
<Watermark content="Taroify" />
```

### 图片水印

通过 `image` 属性来设置水印图片，并使用 `opacity` 来调整水印的整体透明度。

```tsx
<Watermark image="https://fastly.jsdelivr.net/npm/@vant/assets/vant-watermark.png" opacity={0.2} />
```

### 自定义间隔

通过 `gapX` 和 `gapY` 属性来控制多个重复水印之间的间隔。

```tsx
<Watermark
  image="https://fastly.jsdelivr.net/npm/@vant/assets/vant-watermark.png"
  gapX={30}
  gapY={10}
  opacity={0.2}
/>
```

### 自定义倾斜角度

通过 `rotate` 属性来控制水印的倾斜角度，默认值为`-11`。

```tsx
<Watermark
  image="https://fastly.jsdelivr.net/npm/@vant/assets/vant-watermark.png"
  rotate={22}
  opacity={0.2}
/>
```

### 显示范围

通过 `fullPage` 属性来控制水印的显示范围。

```tsx
<Watermark
  image="https://fastly.jsdelivr.net/npm/@vant/assets/vant-watermark.png"
  opacity={0.2}
  fullPage
/>
```

## API

### Props

| 参数      | 说明                                                        | 类型               | 默认值    |
| --------- | ----------------------------------------------------------- | ------------------ | --------- |
| width     | 水印宽度                                                    | _number_           | `80`      |
| height    | 水印高度                                                    | _number_           | `80`      |
| zIndex    | 水印的 z-index                                              | _number \| string_ | `100`     |
| content   | 文字水印的内容                                              | _string_           | -         |
| image     | 图片水印的内容，如果与 `content` 同时传入，优先使用图片水印 | _string_           | -         |
| rotate    | 水印的旋转角度                                              | _number_           | `-11`     |
| fullPage  | 水印是否全屏显示                                            | _boolean_          | `false`   |
| gapX      | 水印之间的水平间隔                                          | _number_           | `20`      |
| gapY      | 水印之间的垂直间隔                                          | _number_           | `20`      |
| textColor | 文字水印的颜色                                              | _string_           | `#dcdee0` |
| textSize  | 文字水印的大小                                              | _number_           | `20`      |
| opacity   | 水印的透明度                                                | _number_           | -         |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/config-provider)。

| 名称                | 默认值 | 描述                  |
| ------------------- | ------ | --------------------- |
| --watermark-z-index | _100_  | 根节点的 z-index 层级 |

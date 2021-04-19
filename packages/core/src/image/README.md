# Image 图片

### 介绍

增强版的 taro Image 组件，提供多种图片填充模式，支持图片懒加载、加载中提示、加载失败提示。

### 引入

```jsx
import { Image } from "@taroify/core"
```

## 代码演示

### 基础用法

基础用法与原生 `img` 标签一致，可以设置 `src`、`width`、`height`、`alt` 等原生属性。

```jsx
<Image width="100" height="100" src="https://img.yzcdn.cn/vant/cat.jpeg" />
```

### 填充模式

通过 `mode` 属性可以设置图片填充模式，可选值见下方表格。

```jsx
<Image
  width="10rem"
  height="10rem"
  mode="scaleToFill"
  src="https://img.yzcdn.cn/vant/cat.jpeg"
/>
```

### 圆形图片

通过 `round` 属性可以设置图片变圆。

```jsx
<Image
  round
  width="10rem"
  height="10rem"
  src="https://img.yzcdn.cn/vant/cat.jpeg"
/>
```

### 图片懒加载

设置 `lazyLoad` 属性来开启图片懒加载。

```jsx
<Image
  lazyLoad
  width="100"
  height="100"
  src="https://img.yzcdn.cn/vant/cat.jpeg"
/>
```

### 加载中提示

`Image` 组件提供了默认的加载中提示，支持通过 `placeholder` 插槽自定义内容。

```jsx
<Image src="https://img.yzcdn.cn/vant/cat.jpeg" placeholder />
```

### 加载失败提示

`Image` 组件提供了默认的加载失败提示，支持通过 `fallback` 插槽自定义内容。

```jsx
<Image src="https://img.yzcdn.cn/vant/cat.jpeg" fallback />
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| src | 图片链接 | _string_ | - |
| mode | 图片填充模式 | _string_ | `fill` |
| alt | 替代文本 | _string_ | - |
| width | 宽度，默认单位为 `px` | _number \| string_ | - |
| height | 高度，默认单位为 `px` | _number \| string_ | - |
| radius | 圆角大小，默认单位为 `px` | _number \| string_ | `0` |
| round | 是否显示为圆形 | _boolean_ | `false` |
| lazyLoad | 是否开启图片懒加载 | _boolean_ | `false` |
| placeholder | 加载时提示的[图标名称](/components/icon)或图片链接 | _ReactNode_ | `<Photo />` |
| fallback | 失败时提示的[图标名称](/components/icon)或图片链接 | _ReactNode_ | `<PhotoFail />` |

### Modes

| 名称         | 含义                                                   |
| ----------- | ----------------------------------------------------- |
| scaleToFill | 缩放模式，不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素           |
| aspectFit   | 缩放模式，保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来。 |
| aspectFill  | 缩放模式，保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。    |
| widthFix    | 缩放模式，宽度不变，高度自动变化，保持原图宽高比不变            |
| heightFix   | 缩放模式，高度不变，宽度自动变化，保持原图宽高比不变            |
| top         | 裁剪模式，不缩放图片，只显示图片的顶部区域                    |
| bottom      | 裁剪模式，不缩放图片，只显示图片的底部区域                    |
| center      | 裁剪模式，不缩放图片，只显示图片的中间区域                    |
| left        | 裁剪模式，不缩放图片，只显示图片的左边区域                    |
| right       | 裁剪模式，不缩放图片，只显示图片的右边区域                    |
| topLeft     | 裁剪模式，不缩放图片，只显示图片的左上边区域                  |
| topRight    | 裁剪模式，不缩放图片，只显示图片的右上边区域                  |
| bottomLeft  | 裁剪模式，不缩放图片，只显示图片的左下边区域                  |
| bottomRight | 裁剪模式，不缩放图片，只显示图片的右下边区域                  |

### Events

| 事件名 | 说明                 | 回调参数             |
| ------ | ------------------ | ------------------ |
| onClick  | 点击图片时触发     | _event: MouseEvent_ |
| onLoad   | 图片加载完毕时触发  | -                   |
| onError | 图片加载失败时触发   | -                   |

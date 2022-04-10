# Circle 环形进度条

### 介绍

圆环形的进度条组件，支持进度渐变动画。

### 引入

```tsx
import { Circle } from "@taroify/core"
```

## 代码演示

### 基础用法

`percent` 属性表示进度条的进度，监听 `onChange` 事件可以获得动画过程中的实时进度。

```tsx
function BasicCircle({ percent }: PercentProps) {
  const [currentPercent, setCurrentPercent] = useState(0)

  return (
    <Circle percent={70} onChange={setCurrentPercent}>
      {currentPercent.toFixed(0)}%
    </Circle>
  )
}
```

### 宽度定制

通过 `strokeWidth` 属性来控制进度条宽度。

```tsx
<Circle percent={70} strokeWidth={60}>
  宽度定制
</Circle>
```

### 颜色定制

通过 `color` 属性来控制进度条颜色，`layerColor` 属性来控制轨道颜色。

```tsx
<Circle percent={70} color="#ee0a24" layerColor="#ebedf0">
  颜色定制
</Circle>
```

### 渐变色

`color` 属性支持传入对象格式来定义渐变色。

```tsx
<Circle
  percent={70}
  color={{
    "0%": "#3fecff",
    "100%": "#6149f6",
  }}
>
  渐变色
</Circle>
```

### 逆时针方向

将 `clockwise` 设置为 `false`，进度会从逆时针方向开始。

```tsx
<Circle percent={70} clockwise={false} color="#07c160">
  逆时针方向
</Circle>
```

### 大小定制

通过 `size` 属性设置圆环直径。

```tsx
<Circle percent={70} size={120} color="#7232dd">
  大小定制
</Circle>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| percent | 当前进度 | _number_ | - |
| size | 圆环直径，默认单位为 `px` | _number \| string_ | `100px` |
| color | 进度条颜色，传入对象格式可以定义渐变色 | _string \| object_ | `#1989fa` |
| layerColor | 轨道颜色 | _string_ | `white` |
| fill | 填充颜色 | _string_ | `none` |
| speed | 动画速度（单位为 rate/s） | _number \| string_ | `0` |
| strokeWidth | 进度条宽度 | _number \| string_ | `40` |
| strokeLinecap | 进度条端点的形状，可选值为 `sqaure` `butt` | _string_ | `round` |
| clockwise | 是否顺时针增加 | _boolean_ | `true` |
| children | 文字 | _ReactNode_ | - |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider](/components/config-provider/) 组件。

| 名称                        | 默认值                       | 描述  |
|---------------------------|---------------------------|-----|
| --circle-size             | _100px * $hd_             | -   |
| --circle-width            | _var(--circle-size)_      | -   |
| --circle-height           | _var(--circle-size)_      | -   |
| --circle-color            | _var(--primary-color)_    | -   |
| --circle-hover-stroke     | _var(--circle-color)_     | -   |
| --circle-layer-stroke     | _var(--white)_            | -   |
| --circle-text-padding     | _0 var(--padding-base)_   | -   |
| --circle-text-color       | _var(--text-color)_       | -   |
| --circle-text-font-weight | _var(--font-weight-bold)_ | -   |
| --circle-text-font-size   | _var(--font-size-md)_     | -   |
| --circle-text-line-height | _var(--line-height-md)_   | -   |

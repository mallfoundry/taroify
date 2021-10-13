# Slider 滑块

### 介绍

滑动输入条，用于在给定的范围内选择一个值。

### 引入

```tsx
import { Slider } from "@taroify/core"
```

## 代码演示

### 基础用法

```tsx
function BasicSlider() {
  const [value, setValue] = useState(50)
  return <Slider value={value} onChange={setValue} />
}
```

### 双滑块

添加 `range` 属性就可以开启双滑块模式，确保 `value` 的值是一个数组。

```tsx
function RangeSlider() {
  const [value, setValue] = useState([20, 60])
  return <Slider range value={value} onChange={setValue} />
}
```

### 指定选择范围

```tsx
function ClampSlider() {
  const [value, setValue] = useState(0)
  return <Slider min={-50} max={50} value={value} onChange={setValue} />
}
```

### 禁用

```tsx
<Slider value={50} disabled />
```

### 指定步长

```tsx
function StepSlider() {
  const [value, setValue] = useState(50)
  return <Slider step={10} value={value} onChange={setValue} />
}
```

### 自定义样式

```tsx
function StyledSlider() {
  const [value, setValue] = useState(50)
  return <Slider className="custom-color" size={4} value={value} onChange={setValue} />
}
```

```scss
.custom-color {
  .taroify-slider__track {
    background-color: #ee0a24;
  }
}
```

### 自定义按钮

```tsx
function StyledThumbSlider() {
  const [value, setValue] = useState(50)
  return (
    <Slider className="custom-color" value={value} onChange={setValue}>
      <Slider.Thumb>
        <View className="custom-thumb">{value}</View>
      </Slider.Thumb>
    </Slider>
  )
}
```

```scss
.custom-thumb {
  width: 26px * 2;
  color: #fff;
  font-size: 10px * 2;
  line-height: 18px * 2;
  text-align: center;
  background-color: #ee0a24;
  border-radius: 100px * 2;
}
```

### 垂直方向

设置 `orientation="vertical"` 属性后，滑块会垂直展示，且高度为 100% 父元素高度。

```tsx
function VerticalSlider() {
  const [value, setValue] = useState(50)
  return <Slider orientation="vertical" value={value} onChange={setValue} />
}

function VerticalRangeSlider() {
  const [value, setValue] = useState([20, 60])
  return (
    <Slider
      range
      orientation="vertical"
      style={{ marginLeft: "100px" }}
      value={value}
      onChange={setValue}
    />
  )
}
```

## API

### Slider Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前进度百分比，在双滑块模式下为数组格式 | _number \| [number, number]_ | `0` |
| max | 最大值 | _number \| string_ | `100` |
| min | 最小值 | _number \| string_ | `0` |
| step | 步长 | _number \| string_ | `1` |
| size | 进度条高度，默认单位为 `px` | _number \| string_ | `2px` |
| range | 是否开启双滑块模式 | _boolean_ | `false` |
| disabled | 是否禁用滑块 | _boolean_ | `false` |
| readonly | 是否为只读状态，只读状态下无法修改滑块的值 | _boolean_ | `false` |
| orientation | 滑块按钮展示方向，`vertical` 为垂直展示 | _SliderOrientation_ | `horizontal` |

### Slider.Thumb Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| size | 滑块按钮大小，默认单位为 `px` |_number \| string_ | `24px` |

### Slider Events

| 事件名             | 说明                     | 回调参数            |
| ------------------ | ------------------------ | ------------------- |
| onChange             | 进度变化且结束拖动后触发 | _value: number_     |

# Swiper 轮播

### 介绍

用于循环播放一组图片或内容。

### 引入

```tsx
import { Swiper } from "@taroify/core"
// or
import Swiper from "@taroify/core/swiper"
```

## 代码演示

### 基础用法

每个 Swipe.Item 代表一张轮播卡片，可以通过 `autoplay` 属性设置自动轮播的间隔。

```tsx
<Swiper className="basic-swiper">
  <Swiper.Item>1</Swiper.Item>
  <Swiper.Item>2</Swiper.Item>
  <Swiper.Item>3</Swiper.Item>
  <Swiper.Item>4</Swiper.Item>
</Swiper>

<style>

</style>
```

```scss
.basic-swiper {
  .taroify-swiper-item {
    color: #fff;
    font-size: 20px * 2;
    background: #39a9ed;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
```

### 纵向滚动

设置 `vertical` 属性后滑块会纵向排列，此时需要指定滑块容器的高度。

```tsx
<Swiper className="vertical-swiper" direction="vertical">
  <Swiper.Item>1</Swiper.Item>
  <Swiper.Item>2</Swiper.Item>
  <Swiper.Item>3</Swiper.Item>
  <Swiper.Item>4</Swiper.Item>
</Swiper>
```

```scss
.vertical-swiper {
  .taroify-swiper-item {
    color: #fff;
    font-size: 20px * 2;
    background: #39a9ed;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
```

## API

### Swiper Props

| 参数             | 说明                     | 类型               | 默认值    |
| ---------------- | ------------------------ | ------------------ | --------- |
| autoplay         | 自动轮播间隔，单位为 ms  | _number \| string_ | -         |
| duration         | 动画时长，单位为 ms      | _number \| string_ | `500`     |
| width            | 滑块宽度，单位为 `px`    | _number \| string_ | `auto`    |
| height           | 滑块高度，单位为 `px`    | _number \| string_ | `auto`    |
| direction        | 轮播方向，可选值为 `vertical` | _string_     | `horizontal`   |
| touchable        | 是否可以通过手势滑动     | _boolean_          | `true`    |
| stopPropagation | 是否阻止滑动事件冒泡     | _boolean_          | `true`    |

### Swiper Events

| 事件名 | 说明                 | 回调参数            |
| ------ | -------------------- | ------------------- |
| change | 每一页轮播结束后触发 | index, 当前页的索引 |

### Swiper.Item Events

| 事件名 | 说明       | 回调参数            |
| ------ | ---------- | ------------------- |
| click  | 点击时触发 | _event: MouseEvent_ |

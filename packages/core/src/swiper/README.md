# Swiper 轮播

### 介绍

用于循环播放一组图片或内容。

### 引入

```tsx
import { Swiper } from "@taroify/core"
```

## 代码演示

### 基础用法

每个 Swipe.Item 代表一张轮播卡片，可以通过 `autoplay` 属性设置自动轮播的间隔。

```tsx
function BasicSwiper() {
  return (
    <Swiper className="basic-swiper" autoplay={4000}>
      <Swiper.Indicator />
      <Swiper.Item>1</Swiper.Item>
      <Swiper.Item>2</Swiper.Item>
      <Swiper.Item>3</Swiper.Item>
      <Swiper.Item>4</Swiper.Item>
    </Swiper>
  )
}
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

### 懒加载

当 Swiper 中含有图片时，可以通过 `lazyRender` 属性来开启懒加载模式。在懒加载模式下，只会渲染当前页和下一页。

```tsx
function ImageSwiper() {
  return (
    <Swiper className="image-swiper" lazyRender autoplay={4000}>
      <Swiper.Indicator />
      <Swiper.Item>
        <Image className="image" src="https://img01.yzcdn.cn/vant/apple-1.jpg" />
      </Swiper.Item>
      <Swiper.Item>
        <Image className="image" src="https://img01.yzcdn.cn/vant/apple-2.jpg" />
      </Swiper.Item>
      <Swiper.Item>
        <Image className="image" src="https://img01.yzcdn.cn/vant/apple-3.jpg" />
      </Swiper.Item>
      <Swiper.Item>
        <Image className="image" src="https://img01.yzcdn.cn/vant/apple-4.jpg" />
      </Swiper.Item>
    </Swiper>
  )
}
```

```scss
.image-swiper {
  .image {
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: 240px * 2;
    padding: 30px * 2 60px * 2;
    background: #fff;
    pointer-events: none;
  }
}
```

### 监听 change 事件

在每一页轮播结束后，会触发 `change` 事件。

```tsx
function SwiperWithOnChange() {
  return (
    <>
      <Toast id="toast" />
      <Swiper
        className="onchange-swiper"
        onChange={(value) => Toast.open(`当前 Swipe 索引：${value}`)}
      >
        <Swiper.Indicator />
        <Swiper.Item>1</Swiper.Item>
        <Swiper.Item>2</Swiper.Item>
        <Swiper.Item>3</Swiper.Item>
        <Swiper.Item>4</Swiper.Item>
      </Swiper>
    </>
  )
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

### 自定义滑块大小

滑块默认宽度为 `100%`，可以通过 `width` 属性设置单个滑块的宽度。纵向滚动模式下，可以通过 `height` 属性设置单个滑块的高度。

```tsx
function SwiperWithCustomWidth() {
  return (
    <Swiper loop={false} width={300}>
      <Swiper.Indicator />
      <Swiper.Item>1</Swiper.Item>
      <Swiper.Item>2</Swiper.Item>
      <Swiper.Item>3</Swiper.Item>
      <Swiper.Item>4</Swiper.Item>
    </Swiper>
  )
}
```

> 目前不支持在循环滚动模式下自定义滑块大小，因此需要将 loop 设置为 false。
>

### 自定义指示器

通过 `Swiper.Indicator` 组件可以自定义指示器的样式。

```tsx
function SwiperWithCustomIndicator() {
  const [value, setValue] = useState(0)

  return (
    <Swiper autoplay={4000} onChange={setValue}>
      <Swiper.Item>1</Swiper.Item>
      <Swiper.Item>2</Swiper.Item>
      <Swiper.Item>3</Swiper.Item>
      <Swiper.Item>4</Swiper.Item>
      <Swiper.Indicator className="custom-indicator">{value + 1}/4</Swiper.Indicator>
    </Swiper>
  )
}
```

```scss
.custom-indicator {
  position: absolute;
  right: 5px * 2;
  bottom: 5px * 2;
  padding: 2px * 2 5px * 2;
  font-size: 12px * 2;
  color: #ffffff;
  background: rgba(0, 0, 0, 0.1)_ | - |
}
```

## API

### Swiper Props

| 参数             | 说明                     | 类型               | 默认值    |
| ---------------- | ------------------------ | ------------------ | --------- |
| defaultValue     | 默认位置索引值           | _number_ | `0`       |
| value            | 位置索引值           | _number_ | `0`       |
| autoplay         | 自动轮播间隔，单位为 ms  | _number_ | -         |
| duration         | 动画时长，单位为 ms      | _number_ | `500`     |
| width            | 滑块宽度，单位为 `px`    | _number_ | `auto`    |
| height           | 滑块高度，单位为 `px`    | _number_ | `auto`    |
| direction        | 轮播方向，可选值为 `vertical` | _string_     | `horizontal`   |
| touchable        | 是否可以通过手势滑动     | _boolean_          | `true`    |
| lazyRender       | 是否延迟渲染未展示的轮播 | _boolean_          | `false`   |
| stopPropagation  | 是否阻止滑动事件冒泡     | _boolean_          | `true`    |

### Swiper Events

| 事件名 | 说明                 | 回调参数            |
| ------ | -------------------- | ------------------- |
| onChange | 每一页轮播结束后触发 | _(index: number)_ |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider](/components/config-provider/) 组件。

| 名称                                         | 默认值                              | 描述  |
|--------------------------------------------|----------------------------------|-----|
| --swiper-indicators-margin                 | _var(--padding-sm)_              | -   |
| --swiper-indicator-size                    | _6px * $hd_                      | -   |
| --swiper-indicator-width                   | _var(--swiper-indicator-size)_   | -   |
| --swiper-indicator-height                  | _var(--swiper-indicator-size)_   | -   |
| --swiper-indicator-opacity                 | _0.3_                            | -   |
| --swiper-indicator-background-color        | _var(--border-color)_            | -   |
| --swiper-indicator-transition-duration     | _var(--animation-duration-fast)_ | -   |
| --swiper-indicator-active-opacity          | _1_                              | -   |
| --swiper-indicator-active-background-color | _var(--blue)_                    | -   |

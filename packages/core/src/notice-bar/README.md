# NoticeBar 通知栏

### 介绍

用于循环播放展示一组消息通知。

### 引入

```tsx
import { NoticeBar } from "@taroify/core"
// or
import NoticeBar from "@taroify/core/notice-bar"
```

## 代码演示

### 基础用法

通过 `children` 属性设置通知栏的内容，通过 `NoticeBar.Icon` 组件设置通知栏左侧的图标。

```tsx
<NoticeBar scrollable>
  <NoticeBar.Icon>
    <VolumeOutlined />
  </NoticeBar.Icon>
  在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。
</NoticeBar>
```

### 滚动播放

通知栏的内容长度溢出时会自动开启滚动播放，通过 `scrollable` 属性可以控制该行为。

```tsx
<!-- 文字较短时，通过设置 scrollable 属性开启滚动播放 -->
<van-notice-bar scrollable text="技术是开发它的人的共同灵魂。" />
<NoticeBar scrollable>技术是开发它的人的共同灵魂。</NoticeBar>
<!-- 文字较长时，通过禁用 scrollable 属性关闭滚动播放 -->
<NoticeBar scrollable={false}>
  在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。
</NoticeBar>
```

### 多行展示

文字较长时，可以通过设置 `wordwrap` 属性来开启多行展示。

```tsx
<NoticeBar wordwrap scrollable={false}>
  在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。
</NoticeBar>
```

### 通知栏模式

通过 `NoticeBar.Action` 组件可以显示不同的通知栏模式。

```tsx
<NoticeBar scrollable={false}>
  技术是开发它的人的共同灵魂。
  <NoticeBar.Action>
    <Cross />
  </NoticeBar.Action>
</NoticeBar>
<WhiteSpace />
<NoticeBar scrollable={false}>
  技术是开发它的人的共同灵魂。
  <NoticeBar.Action>
    <ArrowRight />
  </NoticeBar.Action>
</NoticeBar>
```

### 自定义样式

通过 `style` 属性设置文本颜色和背景色。

```tsx
<NoticeBar style={{ color: "#1989fa", background: "#ecf9ff" }}>
  <NoticeBar.Icon>
    <InfoOutlined />
  </NoticeBar.Icon>
  技术是开发它的人的共同灵魂。
</NoticeBar>
```

### 垂直滚动

搭配 NoticeBar 和 Swiper 组件可以实现垂直滚动的效果。

```tsx
<NoticeBar>
  <NoticeBar.Icon>
    <VolumeOutlined />
  </NoticeBar.Icon>
  <Swiper className="notice-swiper" direction="vertical" autoplay={3000}>
    <Swiper.Item>内容 1</Swiper.Item>
    <Swiper.Item>内容 2</Swiper.Item>
    <Swiper.Item>内容 3</Swiper.Item>
  </Swiper>
</NoticeBar>
```

```scss
.notice-swiper {
  height: 40px * 2;
  line-height: 40px * 2;
}
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 通知栏自定义类名 | _string_ | - |
| style | 通知栏自定义样式 | _CSSProperties_ | - |
| children | 通知文本内容 | _ReactNode_ | - |
| delay | 动画延迟时间 (ms) | _number \| string_ | `1000` |
| speed | 滚动速率 (px/s) | _number \| string_ | `60` |
| scrollable | 是否开启滚动播放，内容长度溢出时默认开启 | _boolean_ | `false` |
| wordwrap | 是否开启文本换行，只在禁用滚动时生效 | _boolean_ | `false` |

### Events

| 事件名 | 说明                         | 回调参数            |
| ------ | ---------------------------- | ------------------- |
| onClick  | 点击通知栏时触发             | _event: MouseEvent_ |
| onReplay | 每当滚动栏重新开始滚动时触发 | -                   |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider](/components/config-provider/) 组件。

| 名称                            | 默认值                                   | 描述  |
|-------------------------------|---------------------------------------|-----|
| --notice-bar-height           | _40px * $hd_                          | -   |
| --notice-bar-padding          | _0 var(--padding-md)_                 | -   |
| --notice-bar-wordwrap-padding | _var(--padding-xs) var(--padding-md)_ | -   |
| --notice-bar-color            | _var(--orange-dark)_                  | -   |
| --notice-bar-font-size        | _var(--font-size-md)_                 | -   |
| --notice-bar-line-height      | _24px * $hd_                          | -   |
| --notice-bar-background-color | _var(--orange-light)_                 | -   |
| --notice-bar-icon-size        | _16px * $hd_                          | -   |
| --notice-bar-icon-min-width   | _24px * $hd_                          | -   |

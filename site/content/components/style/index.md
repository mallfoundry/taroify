# 内置样式

### 介绍

Vant 中默认包含了一些常用样式，可以直接通过 className 的方式使用。

### 文字省略

当文本内容长度超过容器最大宽度时，自动省略多余的文本。

```jsx
<!-- 最多显示一行 -->
<View class="taroify-ellipsis">这是一段最多显示一行的文字，多余的内容会被省略</View>

<!-- 最多显示两行 -->
<View class="taroify-ellipsis--l2">
  这是一段最多显示两行的文字，多余的内容会被省略
</View>

<!-- 最多显示三行 -->
<View class="taroify-ellipsis--l3">
  这是一段最多显示三行的文字，多余的内容会被省略
</View>
```

### 1px 边框

为元素添加 Retina 屏幕下的 1px 边框（即 hairline），基于伪类 transform 实现。

```jsx
<!-- 上边框 -->
<View class="taroify-hairline--top"></View>

<!-- 下边框 -->
<View class="taroify-hairline--bottom"></View>

<!-- 左边框 -->
<View class="taroify-hairline--left"></View>

<!-- 右边框 -->
<View class="taroify-hairline--right"></View>

<!-- 上下边框 -->
<View class="taroify-hairline--top-bottom"></View>

<!-- 全边框 -->
<View class="taroify-hairline--surround"></View>
```

### 动画

可以通过 `Transition` 组件使用内置的动画

```jsx
<!-- 淡入 -->
<Transition in={visible} name="fade">
  <View>Fade</View>
</Transition>

<!-- 上滑进入 -->
<Transition in={visible} name="slide-up">
  <View>Slide Up</View>
</Transition>

<!-- 下滑进入 -->
<Transition in={visible} name="slide-down">
  <View>Slide Down</View>
</Transition>

<!-- 左滑进入 -->
<Transition in={visible} name="slide-left">
  <View>Slide Left</View>
</Transition>

<!-- 右滑进入 -->
<Transition in={visible} name="slide-right">
  <View>Slide Right</View>
</Transition>
```

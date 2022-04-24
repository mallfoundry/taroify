# Navbar 导航栏

### 介绍

为页面提供导航功能，常用于页面顶部。

### 引入

```tsx
import { Navbar } from "@taroify/core"
// or
import Navbar from "@taroify/core/navbar"
```

## 代码演示

### 基础用法

```tsx
<Navbar title="标题">
  <Navbar.NavLeft>返回</Navbar.NavLeft>
  <Navbar.NavRight>按钮</Navbar.NavRight>
</Navbar>
```

### 使用 NavLeft 和 NavRight

```tsx
<Navbar>
  <Navbar.NavLeft>返回</Navbar.NavLeft>
  <Navbar.Title>标题</Navbar.Title>
  <Navbar.NavRight icon={<Search />} />
</Navbar>
```

## API

### Navbar Props

| 参数          | 说明                        | 类型        | 默认值     |
|-------------|---------------------------|-----------|---------|
| title       | 标题                        | _string_  | `''`    |
| bordered    | 是否显示下边框                   | _boolean_ | `true`  |
| fixed       | 是否固定在顶部                   | _boolean_ | `false` |
| safeArea    | 安全区域，可选值 `top` `bottom`   | _string_  | -       |
| placeholder | 固定在顶部时，是否在标签位置生成一个等高的占位元素 | _boolean_ | `false` |

### Navbar.NavLeft Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| icon | 左侧图标 | _Icon_ | - |
| children | 左侧文案 | _ReactNode_ | - |

### Navbar.NavRight Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| icon | 右侧图标 | _Icon_ | - |
| children | 右侧文案 | _ReactNode_ | - |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider](/components/config-provider/) 组件。

| 名称                         | 默认值                       | 描述  |
|----------------------------|---------------------------|-----|
| --navbar-z-index           | _1_                       | -   |
| --navbar-height            | _46px * $hd_              | -   |
| --navbar-line-height       | _var(--line-height-lg)_   | -   |
| --navbar-background-color  | _var(--white)_            | -   |
| --navbar-icon-margin-right | _var(--padding-base)_     | -   |
| --navbar-icon-font-size    | _16px * $hd_              | -   |
| --navbar-icon-color        | _var(--blue)_             | -   |
| --navbar-text-color        | _var(--blue)_             | -   |
| --navbar-title-font-size   | _var(--font-size-lg)_     | -   |
| --navbar-title-font-weight | _var(--font-weight-bold)_ | -   |
| --navbar-title-color       | _var(--text-color)_       | -   |

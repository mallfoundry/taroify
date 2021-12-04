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

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | _string_ | `''` |
| bordered | 是否显示下边框 | _boolean_ | `true` |
| fixed | 是否固定在顶部 | _boolean_ | `false` |
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

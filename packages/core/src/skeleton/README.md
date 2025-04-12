# Skeleton 骨架屏

### 介绍

用于在内容加载过程中展示一组占位图形。

### 引入

```tsx
import { Skeleton } from "@taroify/core"
```

## 代码演示

### 基础用法

通过 `title` 属性显示标题占位图，通过 `row` 属性配置占位段落行数。

```tsx
<Skeleton title row={3} />
```

### 显示头像

通过 `avatar` 属性显示头像占位图。

```tsx
<Skeleton title avatar row={3} />
```

### 展示子组件

将 `loading` 属性设置成 `false` 表示内容加载完成，此时会隐藏占位图，并显示 `Skeleton` 的子组件。

```tsx
<Skeleton title avatar row={3} loading={loading}>
  <View>实际内容</View>
</Skeleton>
```

### 自定义展示内容

通过 `template` 属性完成自定义内容的展示。

```tsx
const template = () => {
  return (
    <View
      style={{ display: "flex", width: "100%" }}
    >
      <Skeleton.Image />
      <View
        style={{ flex: 1, marginLeft: 16 }}
      >
        <Skeleton.Paragraph rowWidth="60%" />
        <Skeleton.Paragraph />
        <Skeleton.Paragraph />
        <Skeleton.Paragraph />
        <Skeleton.Paragraph />
        <Skeleton.Paragraph />
      </View>
    </View>
  )
}

<Skeleton template={template}/>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| row | 段落占位图行数 | _number \| string_ | `0` |
| rowWidth | 段落占位图宽度，可传数组来设置每一行的宽度 | _number \| string \| (number \| string)[]_ | `100%` |
| title | 是否显示标题占位图 | _boolean_ | `false` |
| avatar | 是否显示头像占位图 | _boolean_ | `false` |
| loading | 是否显示骨架屏，传 `false` 时会展示子组件内容 | _boolean_ | `true` |
| animate | 是否开启动画 | _boolean_ | `true` |
| round | 是否将标题和段落显示为圆角风格 | _boolean_ | `false` |
| titleWidth | 标题占位图宽度 | _number \| string_ | `40%` |
| avatarSize | 头像占位图大小 | _number \| string_ | `32px` |
| avatarShape | 头像占位图形状，可选值为 `square` | _square \| round_ | `round` |
| template | 骨架屏自定义 | _ReactNode_ | `-` |

### Skeleton.Paragraph Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| round | 是否将段落显示为圆角风格 | _boolean_ | `false` |
| rowWidth | 段落占位图宽度 | _number \| string_ | `100%` |

### Skeleton.Title Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| round | 是否将段落显示为圆角风格 | _boolean_ | `false` |
| titleWidth | 标题占位图宽度 | _number \| string_ | `100%` |

### Skeleton.Avatar Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| avatarSize | 头像占位图大小 | _number \| string_ | `32px` |
| avatarShape | 头像占位图形状，可选值为 `square` | _square \| round_ | `round` |

### Skeleton.Image Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| imageSize | 图片占位图大小 | _number \| string_ | `32px` |
| imageShape | 图片占位图形状，可选值为 `square` | _square \| round_ | `round` |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider](/components/config-provider/) 组件。

| 名称                                         | 默认值                         | 描述 |
|---------------------------------------------|-------------------------------|-----|
| --skeleton-avatar-size                      | _32px * $hd_                  | -   |
| --skeleton-avatar-background                | _var(--active-color)_         | -   |
| --skeleton-duration                         | _1.2s_                        | -   |
| --skeleton-paragraph-height                 | _16px * $hd_                  | -   |
| --skeleton-paragraph-background             | _var(--active-color)_         | -   |
| --skeleton-title-width                      | _40%_                         | -   |
| --skeleton-paragraph-margin-top             | _var(--padding-xs)_           | -   |
| --skeleton-image-size                       | _96px * $hd_                  | -   |
| --skeleton-image-radius                     | _24px * $hd_                  | -   |

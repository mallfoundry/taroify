# Grid 宫格

### 介绍

宫格可以在水平方向上把页面分隔成等宽度的区块，用于展示内容或进行页面导航。

### 引入

```ts
import { Grid } from "@taroify/core"
// or
import Grid from "@taroify/core/grid"
```

## 代码演示

### 基础用法

通过 `icon` 属性设置格子内的图标，`text` 属性设置文字内容。

```tsx
<Grid>
  <Grid.Item icon={<PhotoOutlined />} text="文字" />
  <Grid.Item icon={<PhotoOutlined />} text="文字" />
  <Grid.Item icon={<PhotoOutlined />} text="文字" />
  <Grid.Item icon={<PhotoOutlined />} text="文字" />
</Grid>
```

### 自定义列数

默认一行展示四个格子，可以通过 `columns` 自定义列数。

```tsx
<Grid columns={3}>
  <Grid.Item icon={<PhotoOutlined />} text="文字" />
  <Grid.Item icon={<PhotoOutlined />} text="文字" />
  <Grid.Item icon={<PhotoOutlined />} text="文字" />
  <Grid.Item icon={<PhotoOutlined />} text="文字" />
  <Grid.Item icon={<PhotoOutlined />} text="文字" />
  <Grid.Item icon={<PhotoOutlined />} text="文字" />
</Grid>
```

### 自定义内容

通过插槽可以自定义格子展示的内容。

```tsx
<Grid columns={3} bordered={false}>
  <Grid.Item>
    <Image className="grid-image" src="https://img.yzcdn.cn/vant/apple-1.jpg" />
  </Grid.Item>
  <Grid.Item>
    <Image className="grid-image" src="https://img.yzcdn.cn/vant/apple-2.jpg" />
  </Grid.Item>
  <Grid.Item>
    <Image className="grid-image" src="https://img.yzcdn.cn/vant/apple-3.jpg" />
  </Grid.Item>
</Grid>
```

```scss
.grid-image {
  width: 100%;
  height: 100%;
}
```

### 正方形格子

设置 `square` 属性后，格子的高度会和宽度保持一致。

```tsx
<Grid columns={4} square>
  <Grid.Item icon={<PhotoOutlined />} text="文字" />
  <Grid.Item icon={<PhotoOutlined />} text="文字" />
  <Grid.Item icon={<PhotoOutlined />} text="文字" />
  <Grid.Item icon={<PhotoOutlined />} text="文字" />
  <Grid.Item icon={<PhotoOutlined />} text="文字" />
  <Grid.Item icon={<PhotoOutlined />} text="文字" />
  <Grid.Item icon={<PhotoOutlined />} text="文字" />
  <Grid.Item icon={<PhotoOutlined />} text="文字" />
</Grid>
```

### 格子间距

通过 `gutter` 属性设置格子之间的距离。

```tsx
<Grid columns={4} gutter={10}>
  <Grid.Item icon={<PhotoOutlined />} text="文字" />
  <Grid.Item icon={<PhotoOutlined />} text="文字" />
  <Grid.Item icon={<PhotoOutlined />} text="文字" />
  <Grid.Item icon={<PhotoOutlined />} text="文字" />
  <Grid.Item icon={<PhotoOutlined />} text="文字" />
  <Grid.Item icon={<PhotoOutlined />} text="文字" />
  <Grid.Item icon={<PhotoOutlined />} text="文字" />
  <Grid.Item icon={<PhotoOutlined />} text="文字" />
</Grid>
```

### 内容横排

将 `direction` 属性设置为 `horizontal`，可以让宫格的内容呈横向排列。

```tsx
<Grid columns={3} direction="horizontal">
  <Grid.Item icon={<PhotoOutlined />} text="文字" />
  <Grid.Item icon={<PhotoOutlined />} text="文字" />
  <Grid.Item icon={<PhotoOutlined />} text="文字" />
</Grid>
```

### 徽标提示

设置 `badge=true` 属性后，会在图标右上角展示一个小红点。设置 `badge` 属性后，会在图标右上角展示相应的徽标。

```tsx
<Grid columns={2}>
  <Grid.Item icon={<HomeOutlined />} badge text="文字" />
  <Grid.Item icon={<Search />} badge="99+" text="文字" />
</Grid>
```

## API

### Grid Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | 列数 | _number \| string_ | `4` |
| iconSize | 图标大小，默认单位为`px` | _number \| string_ | `28px` |
| gutter | 格子之间的间距，默认单位为`px` | _number \| string_ | `0` |
| bordered | 是否显示边框 | _boolean_ | `true` |
| centered | 是否将格子内容居中显示 | _boolean_ | `true` |
| square | 是否将格子固定为正方形 | _boolean_ | `false` |
| clickable | 是否开启格子点击反馈 | _boolean_ | `false` |
| direction | 格子内容排列的方向，可选值为 `horizontal` | _string_ | `vertical` |

### Grid.Item Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| text | 文字 | _string_ | - |
| icon | [图标](/components/icon)或[图片](/components/image) | _ReactNode_ | - |
| badge | 图标右上角徽标的内容 | _boolean \| number \| string \| Badge_ | - |

### Grid.Item Events

| 事件名     | 说明      | 回调参数                |
|---------|---------|---------------------|
| onClick | 点击格子时触发 | _event: MouseEvent_ |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider](/components/config-provider/) 组件。

| 名称                                   | 默认值                                   | 描述  |
|--------------------------------------|---------------------------------------|-----|
| --grid-item-content-padding          | _var(--padding-md) var(--padding-xs)_ | -   |
| --grid-item-content-background-color | _var(--white)_                        | -   |
| --grid-item-content-active-color     | _var(--active-color)_                 | -   |
| --grid-item-icon-font-size           | _28px * $hd_                          | -   |
| --grid-item-text-color               | _var(--gray-7)_                       | -   |
| --grid-item-text-font-size           | _var(--font-size-sm)_                 | -   |

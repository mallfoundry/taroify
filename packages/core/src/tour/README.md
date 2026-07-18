# Tour 引导

### 介绍

用于分步引导用户了解产品功能，支持目标区域高亮、气泡定位和自定义内容。

### 引入

```tsx
import { Tour } from "@taroify/core"
```

## 代码演示

### 基础用法

通过 `list` 配置目标元素和引导内容。字符串类型的 `target` 会按元素 `id` 查找，也可以传入 React Ref。

```tsx
import { useState } from "react"
import { Button, Cell, Tour } from "@taroify/core"

function BasicTour() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Cell title="功能引导">
        <Button id="tour-basic-target" size="small" onClick={() => setOpen(true)}>
          开始
        </Button>
      </Cell>
      <Tour
        open={open}
        type="tile"
        placement="bottom-end"
        list={[
          {
            target: "tour-basic-target",
            content: "点击这里可以开始体验新功能",
          },
        ]}
        onClose={() => setOpen(false)}
      />
    </>
  )
}
```

### 步骤引导

`step` 类型会展示当前进度和上一步、下一步、完成按钮。每一步都可以单独设置气泡位置。

```tsx
const steps = [
  {
    target: "tour-step-1",
    content: "这里是首页入口",
  },
  {
    target: "tour-step-2",
    content: "在这里查看全部分类",
  },
  {
    target: "tour-step-3",
    content: "最后进入个人中心",
    placement: "top-end",
  },
]

<Tour
  open={open}
  title="功能介绍"
  list={steps}
  placement="top-start"
  onChange={(current) => console.log(current)}
  onClose={() => setOpen(false)}
/>
```

### 设置遮罩和偏移

`offset` 控制高亮区域相对于目标元素的纵向、横向扩展距离；`popoverOffset` 和 `arrowOffset` 可以单独调整每一步的气泡。

```tsx
<Tour
  open={open}
  maskWidth={60}
  maskHeight={50}
  offset={[8, 8]}
  list={[
    {
      target: "tour-offset-target",
      content: "自定义高亮和气泡偏移",
      popoverOffset: [20, 16],
      arrowOffset: -20,
    },
  ]}
  onClose={() => setOpen(false)}
/>
```

### 自定义内容

传入 `children` 可以完全自定义气泡内容。

```tsx
<Tour
  open={open}
  type="tile"
  list={[{ target: "tour-custom-target" }]}
  closeOnOverlayClick={false}
  onClose={() => setOpen(false)}
>
  <View className="custom-tour-content">
    <View>欢迎体验全新功能</View>
    <View onClick={() => setOpen(false)}>知道了</View>
  </View>
</Tour>
```

## API

### Props

| 参数                | 说明                                             | 类型                       | 默认值     |
| ------------------- | ------------------------------------------------ | -------------------------- | ---------- |
| defaultOpen         | 默认是否展示引导                                 | _boolean_                  | `false`    |
| open                | 是否展示引导                                     | _boolean_                  | `false`    |
| visible             | 是否展示引导，兼容 NutUI 写法，推荐使用 `open`   | _boolean_                  | `-`        |
| type                | 引导类型                                         | _step \| tile_             | `step`     |
| list                | 引导步骤                                         | _TourStep[]_               | `[]`       |
| placement           | 气泡位置                                         | _TourPlacement_            | `bottom`   |
| location            | 气泡位置，兼容 NutUI 写法，推荐使用 `placement`  | _TourPlacement_            | `-`        |
| offset              | 高亮区域纵向、横向扩展距离                       | _[number, number]_         | `[8, 10]`  |
| mask                | 是否显示遮罩                                     | _boolean_                  | `true`     |
| maskWidth           | 高亮区域宽度                                     | _number \| string_         | 目标宽度   |
| maskHeight          | 高亮区域高度                                     | _number \| string_         | 目标高度   |
| title               | 标题，设置后同时展示关闭按钮                     | _ReactNode_                | `-`        |
| next                | 下一步按钮内容                                   | _ReactNode_                | `下一步`   |
| prev                | 上一步按钮内容                                   | _ReactNode_                | `上一步`   |
| complete            | 完成按钮内容                                     | _ReactNode_                | `完成`     |
| showPrev            | 是否展示上一步按钮                               | _boolean_                  | `true`     |
| closeOnOverlayClick | 是否在点击遮罩后关闭                             | _boolean_                  | `true`     |
| lock                | 是否禁止背景滚动                                 | _boolean_                  | `true`     |
| children            | 自定义气泡内容                                   | _ReactNode_                | `-`        |
| onClose             | 引导关闭时触发                                   | _(opened, event) => void_  | `-`        |
| onChange            | 切换步骤时触发                                   | _(current) => void_        | `-`        |

### TourStep

| 参数          | 说明                                                      | 类型                       | 默认值 |
| ------------- | --------------------------------------------------------- | -------------------------- | ------ |
| target        | 目标元素的 `id`、CSS 选择器、DOM 元素或 React Ref         | _TourTarget_               | `-`    |
| content       | 引导内容                                                  | _ReactNode_                | `-`    |
| placement     | 当前步骤的气泡位置                                        | _TourPlacement_            | `-`    |
| location      | 当前步骤的气泡位置，兼容 NutUI 写法                       | _TourPlacement_            | `-`    |
| popoverOffset | 气泡在交叉轴、主轴方向的偏移量                            | _[number, number]_         | `[0, 12]` |
| arrowOffset   | 箭头在交叉轴方向的偏移量                                  | _number_                   | `0`    |

### TourPlacement

`top`、`top-start`、`top-end`、`bottom`、`bottom-start`、`bottom-end`、`left`、`left-start`、`left-end`、`right`、`right-start`、`right-end`。

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider](/components/config-provider/) 组件。

| 名称                                | 默认值                                      | 描述             |
| ----------------------------------- | ------------------------------------------- | ---------------- |
| --tour-z-index                      | _1100_                                      | 层级             |
| --tour-mask-color                   | _rgba(0, 0, 0, 0.7)_                       | 遮罩颜色         |
| --tour-mask-border-radius           | _var(--border-radius-lg)_                   | 高亮区域圆角     |
| --tour-popover-min-width            | _280px_                                     | 气泡最小宽度     |
| --tour-popover-max-width            | _calc(100vw - 64px)_                        | 气泡最大宽度     |
| --tour-popover-padding              | _24px_                                      | 气泡内边距       |
| --tour-popover-color                | _var(--text-color)_                         | 气泡文字颜色     |
| --tour-popover-background-color     | _var(--background-color-2)_                 | 气泡背景色       |
| --tour-popover-border-radius        | _var(--border-radius-md)_                   | 气泡圆角         |
| --tour-popover-box-shadow           | _0 8px 32px rgba(0, 0, 0, 0.12)_           | 气泡阴影         |
| --tour-arrow-size                   | _12px_                                      | 箭头大小         |
| --tour-content-font-size            | _var(--font-size-md)_                       | 内容字号         |
| --tour-content-line-height          | _var(--line-height-md)_                     | 内容行高         |
| --tour-footer-margin-top            | _24px_                                      | 底部上边距       |
| --tour-button-gap                   | _12px_                                      | 按钮间距         |
| --tour-button-padding               | _6px 16px_                                  | 按钮内边距       |
| --tour-button-font-size             | _var(--font-size-sm)_                       | 按钮字号         |
| --tour-button-border-radius         | _var(--border-radius-sm)_                   | 按钮圆角         |

# Tag 标签

### 介绍

用于标记关键词和概括主要内容。

### 引入

```ts
import { Tag } from "@taroify/core"
// or
import Tag from "@taroify/core/tag"
```

## 代码演示

### 基础用法

通过 `color` 属性控制标签颜色。

```tsx
<Tag>标签</Tag>
<Tag color="primary">标签</Tag>
<Tag color="info">标签</Tag>
<Tag color="success">标签</Tag>
<Tag color="warning">标签</Tag>
<Tag color="danger">标签</Tag>
```

### 空心样式

设置 `variant="outlined"` 属性设置为空心样式。

```tsx
<Tag color="primary" variant="outlined">标签</Tag>
```

### 圆角样式

通过 `shape="round"` 设置为圆角样式。

```tsx
<Tag color="primary" shape="round">标签</Tag>
```

### 右侧圆角样式

通过 `shape="roundRight"` 设置为圆角样式。

```tsx
<Tag color="primary" shape="roundRight">标签</Tag>
```

### 左侧圆角样式

通过 `shape="roundLeft"` 设置为圆角样式。

```tsx
<Tag color="primary" shape="roundLeft">标签</Tag>
```

### 可关闭标签

添加 `closeable` 属性表示标签是可关闭的，关闭标签时会触发 `onClose` 事件，在 `onClose` 事件中可以执行隐藏标签的逻辑。

```tsx
function CloseTag() {
  const [visible, setVisible] = useState(true)
  return (
    <>
      {visible && (
        <Tag color="primary" size="medium" closeable onClose={() => setVisible(false)}>
          标签
        </Tag>
      )}
    </>
  )
}
```

### 标签大小

通过 `size` 属性调整标签大小。

```tsx
<Tag color="primary" children="标签" />
<Tag color="primary" size="medium" children="标签" />
<Tag color="primary" size="large" children="标签" />
```

### 自定义颜色

通过 `color` 和 `textColor` 属性设置标签颜色。

```html

<Tag style={{ backgroundColor: "#7232dd" }} children="标签" />
<Tag style={{ backgroundColor: "#ffe1e1", color: "#ad0000" }} children="标签" />
<Tag color="#7232dd" variant="outlined">标签</Tag>
<Tag style={{ color: "#7232dd" }} variant="outlined" children="标签" />
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 自定义 CSS class  | _string_ | - |
| style | 自定义 CSS 样式 | _CSSProperties_ | - |
| size | 大小，可选值为 `large` `medium` | _string_ | - |
| color | 类型，可选值为 `primary` `info` `success` `danger` `warning` | _string_ | `default` |
| shape | 形状，可选值为 `round` `roundRight` `roundLeft` | _string_ | `square` |
| closeable | 是否为可关闭标签 | _boolean_ | `false` |

### Events

| 事件名 | 说明           | 回调参数            |
| ------ | -------------- | ------------------- |
| onClick  | 点击时触发     | _event: ITouchEvent_ |
| onClose  | 关闭标签时触发 | _event: ITouchEvent_ |

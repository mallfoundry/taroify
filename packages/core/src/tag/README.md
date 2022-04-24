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

通过 `shape="rounded"` 设置为圆角样式。

```tsx
<Tag color="primary" shape="rounded">标签</Tag>
```

### 右侧圆角样式

通过 `shape="roundedRight"` 设置为圆角样式。

```tsx
<Tag color="primary" shape="roundedRight">标签</Tag>
```

### 左侧圆角样式

通过 `shape="roundedLeft"` 设置为圆角样式。

```tsx
<Tag color="primary" shape="roundedLeft">标签</Tag>
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

```tsx
<Tag style={{ backgroundColor: "#7232dd" }} children="标签" />
<Tag style={{ backgroundColor: "#ffe1e1", color: "#ad0000" }} children="标签" />
<Tag style={{ color: "#7232dd" }} variant="outlined" children="标签" />
```

## API

### Props

| 参数        | 说明                                                    | 类型              | 默认值       |
|-----------|-------------------------------------------------------|-----------------|-----------|
| size      | 大小，可选值为 `large` `medium`                              | _string_        | -         |
| color     | 类型，可选值为 `primary` `info` `success` `danger` `warning` | _string_        | `default` |
| shape     | 形状，可选值为 `rounded` `roundedRight` `roundedLeft`        | _string_        | `square`  |
| closeable | 是否为可关闭标签                                              | _boolean_       | `false`   |

### Events

| 事件名     | 说明      | 回调参数                 |
|---------|---------|----------------------|
| onClick | 点击时触发   | _event: ITouchEvent_ |
| onClose | 关闭标签时触发 | _event: ITouchEvent_ |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider](/components/config-provider/) 组件。

| 名称                                 | 默认值                                                                    | 描述  |
|------------------------------------|------------------------------------------------------------------------|-----|
| --tag-padding                      | _var(0 var(--padding-base))_                                           | -   |
| --tag-color                        | _var(--white)_                                                         | -   |
| --tag-font-size                    | _var(--font-size-sm)_                                                  | -   |
| --tag-border-radius                | _2px * $hd_                                                            | -   |
| --tag-line-height                  | _16px * $hd_                                                           | -   |
| --tag-medium-padding               | _2px * $hd 6px * $hd_                                                  | -   |
| --tag-large-padding                | _var(--padding-base) var(--padding-xs)_                                | -   |
| --tag-large-border-radius          | _var(--border-radius-md)_                                              | -   |
| --tag-large-font-size              | _var(--font-size-md)_                                                  | -   |
| --tag-rounded-border-radius        | _var(--border-radius-max)_                                             | -   |
| --tag-rounded-right-padding        | _var(--tag-rounded-right-padding, 0 (6px * $hd) 0 var(--padding-base)_ | -   |
| --tag-rounded-left-padding         | _var(--tag-rounded-left-padding, 0 var(--padding-base) 0 (6px * $hd))_ | -   |
| --tag-rounded-right-medium-padding | _2px * $hd 8px * $hd 2px * $hd 6px * $hd_                              | -   |
| --tag-rounded-left-medium-padding  | _2px * $hd 6px * $hd 2px * $hd 8px * $hd_                              | -   |
| --tag-rounded-right-large-padding  | _var(--padding-base) 6px * $hd var(--padding-base) var(--padding-xs)_  | -   |
| --tag-rounded-left-large-padding   | _var(--padding-base) var(--padding-xs) var(--padding-base) 6px * $hd_  | -   |
| --tag-default-color                | _var(--gray-6)_                                                        | -   |
| --tag-default-background-color     | _var(--gray-6)_                                                        | -   |
| --tag-primary-color                | _var(--primary-color)_                                                 | -   |
| --tag-primary-background-color     | _var(--primary-color)_                                                 | -   |
| --tag-info-color                   | _var(--info-color)_                                                    | -   |
| --tag-info-background-color        | _var(--info-color)_                                                    | -   |
| --tag-success-color                | _var(--success-color)_                                                 | -   |
| --tag-success-background-color     | _var(--success-color)_                                                 | -   |
| --tag-warning-color                | _var(--warning-color)_                                                 | -   |
| --tag-warning-background-color     | _var(--warning-color)_                                                 | -   |
| --tag-danger-color                 | _var(--danger-color)_                                                  | -   |
| --tag-danger-background-color      | _var(--danger-color)_                                                  | -   |
| --tag-outlined-background-color    | _var(--white)_                                                         | -   |

# TextEllipsis 文本省略

### 介绍

对长文本进行省略，支持展开/收起。

请升级 `taroify` 到 >= `v0.1.1-alpha.9` 版本来使用该组件。

### 引入

```tsx
import { TextEllipsis } from "@taroify/core"
```

## 代码演示

### 基础用法

默认展示 `1` 行，超过 `1` 行显示省略号。

```tsx
<TextEllipsis content="慢慢来，不要急，生活给你出了难题，可也终有一天会给出答案。" />
```

### 展开/收起

超过行数支持展开/收起。

```tsx
<TextEllipsis
  content="似水流年是一个人所有的一切，只有这个东西，才真正归你所有。其余的一切，都是片刻的欢娱和不幸，转眼间就已跑到那似水流年里去了。"
  expandText="展开"
  collapseText="收起"
/>
```

### 自定义展示行数

通过设置 `rows` 限制展示行数。

```tsx
<TextEllipsis
  content="那一天我二十一岁，在我一生的黄金时代。我有好多奢望。我想爱，想吃，还想在一瞬间变成天上半明半暗的云。后来我才知道，生活就是个缓慢受锤的过程，人一天天老下去，奢望也一天天消失，最后变得像挨了锤的牛一样。可是我过二十一岁生日时没有预见到这一点。我觉得自己会永远生猛下去，什么也锤不了我。"
  rows={2}
  expandText="展开"
  collapseText="收起"
/>
```

### 自定义省略位置

通过设置 `position` 控制省略位置。

- 头部省略：

```tsx
<TextEllipsis
  content="那一天我二十一岁，在我一生的黄金时代。我有好多奢望。我想爱，想吃，还想在一瞬间变成天上半明半暗的云。后来我才知道，生活就是个缓慢受锤的过程，人一天天老下去，奢望也一天天消失，最后变得像挨了锤的牛一样。可是我过二十一岁生日时没有预见到这一点。我觉得自己会永远生猛下去，什么也锤不了我。"
  position="start"
  rows={3}
  expandText="展开"
  collapseText="收起"
/>
```

- 中部省略：

```tsx
<TextEllipsis
  content="那一天我二十一岁，在我一生的黄金时代。我有好多奢望。我想爱，想吃，还想在一瞬间变成天上半明半暗的云。后来我才知道，生活就是个缓慢受锤的过程，人一天天老下去，奢望也一天天消失，最后变得像挨了锤的牛一样。可是我过二十一岁生日时没有预见到这一点。我觉得自己会永远生猛下去，什么也锤不了我。"
  position="middle"
  rows={3}
  expandText="展开"
  collapseText="收起"
/>
```

### 手动控制

通过 ref 可以获取到 TextEllipsis 实例并调用实例方法

```tsx
const wrapRef = useRef<TextEllipsisInstance>(null);

const onClick = () => {
  wrapRef.current?.toggle(true)
}

return (
  <Block variant="card" title="方法调用">
    <TextEllipsis ref={wrapRef} content="那一天我二十一岁，在我一生的黄金时代。我有好多奢望。我想爱，想吃，还想在一瞬间变成天上半明半暗的云。后来我才知道，生活就是个缓慢受锤的过程，人一天天老下去，奢望也一天天消失，最后变得像挨了锤的牛一样。可是我过二十一岁生日时没有预见到这一点。我觉得自己会永远生猛下去，什么也锤不了我。" position="start" rows={3} expandText="展开" collapseText="收起" />
    <Button onClick={onClick}>展开</Button>
  </Block>
)
```

## API

### Props

| 参数         | 说明                                | 类型               | 默认值  |
| ------------ | ----------------------------------- | ------------------ | ------- |
| rows         | 展示的行数                          | _number \| string_ | `1`     |
| content      | 需要展示的文本                      | _string_           | -       |
| expandText   | 展开操作的文案                      | _string_           | -       |
| collapseText | 收起操作的文案                      | _string_           | -       |
| dots         | 省略号的文本内容                    | _string_           | `'...'` |
| position     | 省略位置，可选值为 `start` `middle` | _string_           | `'end'` |

### Events

| 事件名        | 说明                | 回调参数            |
| ------------- | ------------------- | ------------------- |
| onClickAction | 点击展开/收起时触发 | _expanded: boolean_ |

### 方法

通过 `ref` 可以获取到 TextEllipsis 实例并调用实例方法

| 方法名 | 说明     | 参数 | 返回值 |
| :----- | -------- | ---- | ------ |
| toggle `v0.7.0`  | 切换文本的展开状态，传 true 为展开，false 为收起，不传参为切换 | _expanded?: boolean_   | -      |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider](/components/config-provider/) 组件。

| 名称                               | 默认值          | 描述           |
| ---------------------------------- | --------------- | -------------- |
| --text-ellipsis-font-size          | _14px \* $hd_   | 文本字体大小   |
| --text-ellipsis-content-font-color | _var(--gray-8)_ | 文本字体颜色   |
| --text-ellipsis-line-height        | _1.6_           | 文本的行高     |
| --text-ellipsis-action-color       | _var(--blue)_   | 操作按钮的颜色 |

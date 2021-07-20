# IndexBar 索引栏

### 介绍

用于列表的索引分类显示和快速定位。

### 引入

```tsx
import { IndexBar } from '@taroify/core';
```

## 代码演示

### 基础用法

点击索引栏时，会自动跳转到对应的 `IndexBar.Anchor` 锚点位置。

```tsx
function BasicIndexBar() {
  const indexList: string[] = []
  const charCodeOfA = "A".charCodeAt(0)

  for (let i = 0; i < 26; i++) {
    indexList.push(String.fromCharCode(charCodeOfA + i))
  }

  return (
    <IndexBar>
      {_.map(indexList, (index) => {
        return (
          <Fragment key={index}>
            <IndexBar.Anchor index={index} />
            <Cell title="文本" />
            <Cell title="文本" />
            <Cell title="文本" />
          </Fragment>
        )
      })}
    </IndexBar>
  )
}
```

### 自定义索引列表

```tsx
function CustomIndexBar() {
  const customIndexList = [1, 2, 3, 4, 5, 6, 8, 9, 10]

  return (
    <IndexBar>
      {_.map(customIndexList, (index) => {
        return (
          <Fragment key={index}>
            <IndexBar.Anchor index={index}>标题{index}</IndexBar.Anchor>
            <Cell title="文本" />
            <Cell title="文本" />
            <Cell title="文本" />
          </Fragment>
        )
      })}
    </IndexBar>
  )
}
```

## API

### IndexBar Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| zIndex | z-index 层级 | _number \| string_ | `1` |
| sticky | 是否开启锚点自动吸顶 | _boolean_ | `true` |
| stickyOffsetTop | 锚点自动吸顶时与顶部的距离 | _number_ | `0` |
| highlightColor | 索引字符高亮颜色 | _string_ | `#ee0a24` |

### IndexBar.Anchor Props

| 参数  | 说明     | 类型               | 默认值 |
| ----- | -------- | ------------------ | ------ |
| index | 索引字符 | _number \| string_ | -      |
| children | 索引内容 | _ReactNode_ | -      |

### IndexBar Events

| 事件名 | 说明                         | 回调参数                  |
| ------ | ---------------------------- | ------------------------- |
| onSelect | 点击索引栏的字符时触发       | _index: number \| string_ |
| onChange | 当前高亮的索引字符变化时触发 | _index: number \| string_ |

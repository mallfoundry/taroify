# SwipeCell 滑动单元格

### 介绍

可以左右滑动来展示操作按钮的单元格组件。

### 引入

通过以下方式来全局注册组件，更多注册方式请参考[组件注册](#/zh-CN/advanced-usage#zu-jian-zhu-ce)。

```tsx
import { SwipeCell } from "@taroify/core"
// or
import SwipeCell from "@taroify/core/swipe-cell"
```

## 代码演示

### 基础用法

`SwipeCell` 组件提供了 `SwipeCell.Actions` 组件，用于定义两侧滑动区域的内容。

```tsx
<SwipeCell>
  <SwipeCell.Actions side="left">
    <Button variant="contained" shape="square" color="primary">选择</Button>
  </SwipeCell.Actions>
  <Cell bordered={false} title="单元格">
    内容
  </Cell>
  <SwipeCell.Actions side="right">
    <Button variant="contained" shape="square" color="danger">删除</Button>
    <Button variant="contained" shape="square" color="primary">收藏</Button>
  </SwipeCell.Actions>
</SwipeCell>
```

### 自定义内容

`SwipeCell` 可以嵌套任意内容，比如嵌套一个商品卡片。

```tsx
<SwipeCell className="custom-swipe-cell">
  <View className="custom-card">
    <Image className="custom-card__thumb" src="https://img01.yzcdn.cn/vant/ipad.jpeg" />
    <View className="custom-card__content">
      <View className="custom-card__title">商品标题</View>
    </View>
  </View>
  <SwipeCell.Actions side="right">
    <Button variant="contained" shape="square" color="danger">
      删除
    </Button>
    <Button variant="contained" shape="square" color="primary">
      收藏
    </Button>
  </SwipeCell.Actions>
</SwipeCell>
```

```scss
.custom-swipe-cell {

  .taroify-swipe-cell__actions {
    .taroify-button {
      height: 100%;
    }
  }

  .custom-card {
    background: #fff;
    position: relative;
    box-sizing: border-box;
    padding: 8px * 2 16px * 2;
    color: #323233;
    font-size: 12px;
    display: flex;

    &__thumb {
      position: relative;
      flex: none;
      width: 88px * 2;
      height: 88px * 2;
      margin-right: 8px * 2;
    }
  }
}

```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| disabled | 是否禁用滑动 | _boolean_ | `false` |
| stopPropagation | 是否阻止滑动事件冒泡 | _boolean_ | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| open | 打开时触发 | _{ position: 'left' \| 'right' }_ |
| close | 关闭时触发 | _{ position: 'left' \| 'right' \| 'cell' \| 'outside' }_ |

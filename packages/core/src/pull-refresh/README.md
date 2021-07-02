# PullRefresh 下拉刷新

### 介绍

用于提供下拉刷新的交互操作。

### 引入

```tsx
import { PullRefresh } from "@taroify/core"
```

## 代码演示

### 基础用法

下拉刷新时会触发 `onRefresh` 事件，在事件的回调函数中可以进行同步或异步操作，操作完成后将 `loading` 设置为 `false`，表示加载完成。

```tsx
function BasicPullRefresh() {
  const [loading, setLoading] = useState(false)
  const counterRef = useRef(0)
  return (
    <PullRefresh
      loading={loading}
      onRefresh={() => {
        setLoading(true)
        setTimeout(() => {
          counterRef.current += 1
          setLoading(false)
        }, 1000)
      }}
    >
      <View className="pull-text">
        {counterRef.current ? "刷新次数：" + counterRef.current : "下拉试试"}
      </View>
    </PullRefresh>
  )
}
```

### 完成提示

通过 `PullRefresh.Completed` 可以设置刷新成功后的顶部提示文案。

```tsx
function CompletedPullRefresh() {
  const [loading, setLoading] = useState(false)
  const counterRef = useRef(0)
  return (
    <PullRefresh
      loading={loading}
      onRefresh={() => {
        setLoading(true)
        setTimeout(() => {
          counterRef.current += 1
          setLoading(false)
        }, 1000)
      }}
    >
      <PullRefresh.Completed>刷新成功</PullRefresh.Completed>
      <View className="pull-text">
        {counterRef.current ? "刷新次数：" + counterRef.current : "下拉试试"}
      </View>
    </PullRefresh>
  )
}
```

### 自定义提示

通过插槽可以自定义下拉刷新过程中的提示内容。

```tsx
function CustomPullRefresh() {
  const [loading, setLoading] = useState(false)
  const counterRef = useRef(0)
  return (
    <PullRefresh
      loading={loading}
      headHeight={80}
      onRefresh={() => {
        setLoading(true)
        setTimeout(() => {
          counterRef.current += 1
          setLoading(false)
        }, 1000)
      }}
    >
      <PullRefresh.Pulling>
        {({ distance = 0 }) => (
          <Image
            className="doge"
            style={{ transform: `scale(${distance / 80})` }}
            src="https://img.yzcdn.cn/vant/doge.png"
          />
        )}
      </PullRefresh.Pulling>
      <PullRefresh.Loosing>
        <Image className="doge" src="https://img.yzcdn.cn/vant/doge.png" />
      </PullRefresh.Loosing>
      <PullRefresh.Loading>
        <Image className="doge" src="https://img.yzcdn.cn/vant/doge-fire.jpg" />
      </PullRefresh.Loading>
      <View className="pull-text">
        {counterRef.current ? "刷新次数：" + counterRef.current : "下拉试试"}
      </View>
    </PullRefresh>
  )
}
```

```scss
  .doge {
  width: 140px * 2;
  height: 72px * 2;
  margin-top: 8px * 2;
  border-radius: 4px * 2;
}
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| loading | 是否处于加载中状态 | _boolean_ | - |
| duration | 动画时长 | _number \| string_ | `300` |
| headHeight | 顶部内容高度 | _number \| string_ | `50` |
| pullDistance | 触发下拉刷新的距离 | _number \| string_ | 与 `headHeight` 一致 |
| disabled | 是否禁用下拉刷新 | _boolean_ | `false` |

### Events

| 事件名  | 说明           | 回调参数 |
| ------- | -------------- | -------- |
| onRefresh | 下拉刷新时触发 | -        |

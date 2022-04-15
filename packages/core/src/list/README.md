# List 列表

### 介绍

瀑布流滚动加载，用于展示长列表，当列表即将滚动到底部时，会触发事件并加载更多列表项。

### 引入

```tsx
import { List } from '@taroify/core';
```

## 代码演示

### 基础用法

List 组件通过 `loading` 和 `hasMore` 两个变量控制加载状态，当组件滚动到底部时，会触发 `load` 事件并将 `loading` 设置成 `true`
。此时可以发起异步操作并更新数据，数据更新完毕后，将 `loading` 设置成 `false` 即可。若数据已全部加载完毕，则直接将 `hasMore` 设置成 `false` 即可。

```tsx
function BasicList() {
  const [hasMore, setHasMore] = useState(true)
  const [list, setList] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [scrollTop, setScrollTop] = useState(0)

  usePageScroll(({ scrollTop: aScrollTop }) => setScrollTop(aScrollTop))

  return (
    <List
      loading={loading}
      hasMore={hasMore}
      scrollTop={scrollTop}
      onLoad={() => {
        setLoading(true)
        setTimeout(() => {
          for (let i = 0; i < 10; i++) {
            const text = list.length + 1
            list.push(text < 10 ? "0" + text : String(text))
          }
          setList([...list])
          setHasMore(list.length < 40)
          setLoading(false)
        }, 1000)
      }}
    >
      {
        list.map((item) => (
          <Cell key={item}>{item}</Cell>
        ))
      }
      <List.Placeholder>
        {loading && <Loading>加载中...</Loading>}
        {!hasMore && "没有更多了"}
      </List.Placeholder>
    </List>
  )
}
```

### 错误提示

若列表数据加载失败，将 `error` 设置成 `true` 即可显示错误提示，用户点击错误提示后会重新触发 load 事件。

```tsx
function ErrorList() {
  const [hasMore, setHasMore] = useState(true)
  const [list, setList] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [scrollTop, setScrollTop] = useState(0)

  usePageScroll(({ scrollTop: aScrollTop }) => setScrollTop(aScrollTop))

  return (
    <List
      loading={loading}
      hasMore={hasMore}
      scrollTop={scrollTop}
      onLoad={() => {
        setLoading(true)
        setTimeout(() => {
          for (let i = 0; i < 10; i++) {
            const text = list.length + 1
            list.push(text < 10 ? "0" + text : String(text))
          }
          const newList = [...list]

          setHasMore(!(newList.length <= 10 || newList.length >= 40))
          setError(newList.length <= 10)
          setList(newList)
          setLoading(false)
        }, 1000)
      }}
    >
      {
        list.map((item) => (
          <Cell key={item}>{item}</Cell>
        ))
      }
      <List.Placeholder
        onClick={() => {
          if (error) {
            setHasMore(true)
            setError(false)
          }
        }}
      >
        {loading && <Loading>加载中...</Loading>}
        {error && "请求失败，点击重新加载"}
        {!hasMore && "没有更多了"}
      </List.Placeholder>
    </List>
  )
}
```

### 下拉刷新

List 组件可以与 [PullRefresh](/components/pull-refresh/) 组件结合使用，实现下拉刷新的效果。

```tsx
function PullRefreshList() {
  const [hasMore, setHasMore] = useState(true)
  const [list, setList] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const refreshingRef = useRef(false)
  const [scrollTop, setScrollTop] = useState(0)
  const [reachTop, setReachTop] = useState(true)

  usePageScroll(({ scrollTop: aScrollTop }) => {
    setScrollTop(aScrollTop)
    setReachTop(aScrollTop === 0)
  })

  const onLoad = () => {
    setLoading(true)
    const newList = refreshingRef.current ? [] : list
    setTimeout(() => {
      refreshingRef.current = false
      for (let i = 0; i < 10; i++) {
        const text = newList.length + 1
        newList.push(text < 10 ? "0" + text : String(text))
      }
      setList(newList)
      setLoading(false)
      setHasMore(newList.length < 40)
    }, 1000)
  }

  function onRefresh() {
    refreshingRef.current = true
    setLoading(false)
    onLoad()
  }

  return (
    <PullRefresh loading={refreshingRef.current} reachTop={reachTop} onRefresh={onRefresh}>
      <List loading={loading} hasMore={hasMore} scrollTop={scrollTop} onLoad={onLoad}>
        {
          list.map((item) => (
            <Cell key={item}>{item}</Cell>
          ))
        }
        {!refreshingRef.current && (
          <List.Placeholder>
            {loading && <Loading>加载中...</Loading>}
            {!hasMore && "没有更多了"}
          </List.Placeholder>
        )}
      </List>
    </PullRefresh>
  )
}
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| scrollTop | 距离顶部的滚动距离 | _number_ | `0` |
| loading | 是否处于加载状态，加载过程中不触发 `onLoad` 事件 | _boolean \| ()=> boolean_ | `false` |
| hasMore | 是否已加载完成，加载完成后不再触发 `onLoad` 事件 | _boolean \| ()=> boolean_ | `false` |
| offset | 滚动条与底部距离小于 offset 时触发 `onLoad` 事件 | _number_ | `300` |
| direction | 滚动触发加载的方向，可选值为 `up` | _string_ | `down` |

### Events

| 事件名       | 说明                    | 回调参数 |
|-----------|-----------------------|------|
| onLoad    | 滚动条与底部距离小于 offset 时触发 | -    |
| onLoading | 内部 loading 改变时触发      | -    |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider](/components/config-provider/) 组件。

| 名称                         | 默认值                             | 描述  |
|----------------------------|---------------------------------|-----|
| --list-text-color          | _var(--gray-6)_                 | -   |
| --list-text-font-size      | _var(--font-size-md)_           | -   |
| --list-text-line-height    | _50px * $hd_                    | -   |
| --list-loading-icon-size   | _16px * $hd_                    | -   |
| --list-loading-icon-width  | _var(--list-loading-icon-size)_ | -   |
| --list-loading-icon-height | _var(--list-loading-icon-size)_ | -   |

## 常见问题

### List 的运行机制是什么？

List 会监听浏览器的滚动事件并计算列表的位置，当列表底部与可视区域的距离小于 `offset` 时，List 会触发一次 load 事件。

### 为什么 List 初始化后会立即触发 load 事件？

List 初始化后会触发一次 load 事件，用于加载第一屏的数据，这个特性可以通过 `hasMore={false}` 属性关闭。

### 为什么会连续触发 load 事件？

如果一次请求加载的数据条数较少，导致列表内容无法铺满当前屏幕，List 会继续触发 load 事件，直到内容铺满屏幕或数据全部加载完成。因此你需要调整每次获取的数据条数，理想情况下每次请求获取的数据条数应能够填满一屏高度。

### loading 和 hasMore 分别是什么含义？

`List` 有以下三种状态，理解这些状态有助于你正确地使用 `List` 组件：

- 非加载中，`loading` 为 `false`，此时会根据列表滚动位置判断是否触发 `onLoad` 事件（列表内容不足一屏幕时，会直接触发）
- 加载中，`loading` 为 `true`，表示正在发送异步请求，此时不会触发 `onLoad` 事件
- 加载完成，`hasMore` 为 `false`，此时不会触发 `onLoad` 事件

在每次请求完毕后，需要手动将 `loading` 设置为 `false`，表示加载结束

### 使用 float 布局后一直触发加载？

若 List 的内容使用了 float 布局，可以在容器上添加 `taroify-clearfix` 类名来清除浮动，使得 List 能正确判断元素位置

```tsx
<List>
  <View class="taroify-clearfix">
    <View class="float-item" />
    <View class="float-item" />
    <View class="float-item" />
  </View>
</List>
```

### 在 html、body 上设置 overflow 后一直触发加载？

如果在 html 和 body 标签上设置了 `overflow-x: hidden` 样式，会导致 List 一直触发加载。

```css
html,
body {
    overflow-x: hidden;
}
```

这个问题的原因是当元素设置了 `overflow-x: hidden` 样式时，该元素的 `overflow-y` 会被浏览器设置为 `auto`，而不是默认值 `visible`，导致 List
无法正确地判断滚动容器。解决方法是去除该样式，或者在 html 和 body 标签上添加 `height: 100%` 样式。

### direction 属性设置为 up 后一直触发加载？

设置 `direction` 属性为 up 后，当滚动条处于页面顶部时，就会触发 List 组件的加载。

因此在使用该属性时，建议在每次数据加载完成后，将滚动条滚动至页面底部或非顶部的位置。

import { Cell, List, Loading, PullRefresh, Tabs } from "@taroify/core"
import { usePageScroll } from "@tarojs/taro"
import { useRef, useState } from "react"
import Page from "../../../components/page"
import "./index.scss"

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
        //
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
      {list.map((item) => (
        <Cell key={item}>{item}</Cell>
      ))}
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
          //
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

export default function ListDemo() {
  const [tab, setTab] = useState(0)

  return (
    <Page title="List 列表" className="list-demo">
      <Tabs value={tab} onChange={setTab}>
        <Tabs.TabPane title="基础用法">
          <BasicList />
        </Tabs.TabPane>
        <Tabs.TabPane title="错误提示">
          <ErrorList />
        </Tabs.TabPane>
        <Tabs.TabPane title="下拉刷新">
          <PullRefreshList />
        </Tabs.TabPane>
      </Tabs>
    </Page>
  )
}

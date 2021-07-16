import { Cell, List, Loading, PullRefresh, Tabs } from "@taroify/core"
import { nextTick } from "@tarojs/taro"
import * as React from "react"
import { useRef, useState } from "react"
import Page from "../../../components/page"
import "./index.scss"

function BasicList() {
  const hasMoreRef = useRef(true)
  const listRef = useRef<string[]>([])
  const [loading, setLoading] = useState(false)
  return (
    <List
      loading={loading}
      hasMore={hasMoreRef.current}
      onLoad={() => {
        nextTick(() => {
          setLoading(true)
          setTimeout(() => {
            for (let i = 0; i < 10; i++) {
              const text = listRef.current.length + 1
              listRef.current.push(text < 10 ? "0" + text : String(text))
            }
            listRef.current = [...listRef.current]
            hasMoreRef.current = listRef.current.length < 40
            setLoading(false)
          }, 1000)
        })
      }}
    >
      {listRef.current.map((item) => (
        <Cell key={item}>{item}</Cell>
      ))}
      <List.Placeholder>
        {loading && <Loading>加载中...</Loading>}
        {!hasMoreRef.current && "没有更多了"}
      </List.Placeholder>
    </List>
  )
}

function ErrorList() {
  const [hasMore, setHasMore] = useState(true)
  const [list, setList] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  return (
    <List
      loading={loading}
      hasMore={hasMore}
      onLoad={() => {
        nextTick(() => {
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
        })
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
  const listRef = useRef<string[]>([])
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const onLoad = () => {
    nextTick(() => {
      setLoading(true)
      setTimeout(() => {
        setRefreshing(false)
        for (let i = 0; i < 10; i++) {
          const text = listRef.current.length + 1
          listRef.current.push(text < 10 ? "0" + text : String(text))
        }
        setLoading(false)
        setHasMore(listRef.current.length < 40)
      }, 1000)
    })
  }

  function onRefresh() {
    setRefreshing(true)
    setLoading(false)
    listRef.current = []
    onLoad()
  }

  return (
    <PullRefresh loading={refreshing} onRefresh={onRefresh}>
      <List loading={loading} hasMore={hasMore} onLoad={onLoad}>
        {listRef.current.map((item) => (
          <Cell key={item}>{item}</Cell>
        ))}
        <List.Placeholder>
          {loading && <Loading>加载中...</Loading>}
          {!hasMore && "没有更多了"}
        </List.Placeholder>
      </List>
    </PullRefresh>
  )
}

export default function ListDemo() {
  const [activeKey, setActiveKey] = useState<Tabs.TabKey>(0)

  return (
    <Page title="List 列表" className="list-demo">
      <Tabs activeKey={activeKey} onChange={({ key }) => setActiveKey(key)}>
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

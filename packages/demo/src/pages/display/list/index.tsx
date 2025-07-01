import { Cell, List, ListInstance, Loading, PullRefresh, Tabs, Button, Flex } from "@taroify/core"
import { usePageScroll } from "@tarojs/taro"
import { useRef, useState } from "react"
import Page from "../../../components/page"
import "./index.scss"

function BasicList({ disabled }) {
  const [hasMore, setHasMore] = useState(true)
  const [list, setList] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  return (
    <List
      loading={loading}
      hasMore={hasMore}
      disabled={disabled}
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

function FixedHeightList({ disabled }) {
  const [hasMore, setHasMore] = useState(true)
  const [list, setList] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const ref = useRef<ListInstance>(null)

  return (
    <>
      <List
        ref={ref}
        loading={loading}
        hasMore={hasMore}
        fixedHeight
        style={{ height: "300px" }}
        disabled={disabled}
        immediateCheck={false}
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
      <Flex align="center" direction="column">
        <Flex.Item>immediateCheck设为false,调用check，触发onLoad</Flex.Item>
        <Flex.Item>
          <Button
            onClick={() => {
              ref.current?.check()
            }}
          >
            check
          </Button>
        </Flex.Item>
      </Flex>
    </>
  )
}

function ErrorList({ disabled }) {
  const [hasMore, setHasMore] = useState(true)
  const [list, setList] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  return (
    <List
      loading={loading}
      hasMore={hasMore}
      disabled={disabled}
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
        {!error && !hasMore && "没有更多了"}
      </List.Placeholder>
    </List>
  )
}

function PullRefreshList({ disabled }) {
  const [hasMore, setHasMore] = useState(true)
  const [list, setList] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const refreshingRef = useRef(false)
  const [reachTop, setReachTop] = useState(true)

  usePageScroll(({ scrollTop: aScrollTop }) => {
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
    <List loading={loading} hasMore={hasMore} onLoad={onLoad} disabled={disabled}>
      <PullRefresh loading={refreshingRef.current} reachTop={reachTop} onRefresh={onRefresh}>
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
      </PullRefresh>
    </List>
  )
}

export default function ListDemo() {
  const [tab, setTab] = useState(0)

  return (
    <Page title="List 列表" className="list-demo">
      <Tabs value={tab} onChange={setTab}>
        <Tabs.TabPane title="基础用法">
          <BasicList disabled={tab !== 0} />
        </Tabs.TabPane>
        <Tabs.TabPane title="固定高度">
          <FixedHeightList disabled={tab !== 1} />
        </Tabs.TabPane>
        <Tabs.TabPane title="错误提示">
          <ErrorList disabled={tab !== 2} />
        </Tabs.TabPane>
        <Tabs.TabPane title="下拉刷新">
          <PullRefreshList disabled={tab !== 3} />
        </Tabs.TabPane>
      </Tabs>
    </Page>
  )
}

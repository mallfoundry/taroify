import { ITouchEvent, View } from "@tarojs/components"
import { nextTick, useReady } from "@tarojs/taro"
import classNames from "classnames"
import * as React from "react"
import {
  Children,
  CSSProperties,
  isValidElement,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import Loading from "../loading"
import { prefixClassname } from "../styles"
import { preventDefault } from "../utils/dom/event"
import { getScrollParent, getScrollTop } from "../utils/dom/scroll"
import { addUnitPx } from "../utils/format/unit"
import { TouchDirection, useTouch } from "../utils/touch"
import {
  PullRefreshCompleted,
  PullRefreshCompletedProps,
  PullRefreshLoading,
  PullRefreshLoosing,
  PullRefreshPulling,
} from "./pull-refresh-children"
import PullRefreshContext from "./pull-refresh.context"

enum PullRefreshStatus {
  Awaiting = "awaiting",
  Pulling = "pulling",
  Loosing = "loosing",
  Loading = "loading",
  Completed = "completed",
}

const TEXT_STATUS = ["pulling", "loosing", "success"]

interface PullRefreshChildren {
  pulling?: ReactNode
  loosing?: ReactNode
  loading?: ReactNode
  completed?: ReactNode
  content?: ReactNode[]
}

function usePullRefreshChildren(children?: ReactNode): PullRefreshChildren {
  return useMemo(() => {
    const __children__: PullRefreshChildren = {
      content: [],
    }

    Children.forEach(children, (child: ReactNode) => {
      if (isValidElement(child)) {
        const element = child as ReactElement

        const elementType = element.type
        if (elementType === PullRefreshPulling) {
          __children__.pulling = element
        } else if (elementType === PullRefreshLoosing) {
          __children__.loosing = element
        } else if (elementType === PullRefreshLoading) {
          __children__.loading = element
        } else if (elementType === PullRefreshCompleted) {
          __children__.completed = element
        } else {
          __children__.content?.push(child)
        }
      } else {
        __children__.content?.push(child)
      }
    })
    return __children__
  }, [children])
}

function getCompletedProps(node?: ReactNode): PullRefreshCompletedProps {
  if (isValidElement(node)) {
    const element = node as ReactElement
    return element.props
  }
  return {}
}

export interface PullRefreshProps {
  className?: string
  style?: CSSProperties
  loading?: boolean
  disabled?: boolean
  duration?: number
  headHeight?: number
  pullDistance?: number
  children?: ReactNode
  onRefresh?: () => void
}

function PullRefresh(props: PullRefreshProps) {
  const {
    className,
    style,
    loading,
    disabled = false,
    headHeight = 50,
    pullDistance: pullDistanceProp,
    duration: durationProp = 300,
    onRefresh,
  } = props

  const children = usePullRefreshChildren(props.children)
  const { completed: completedElement, content } = children
  const { duration: completedDuration = 500 } = getCompletedProps(completedElement)
  const rootRef = useRef<HTMLElement>()

  const scrollParentRef = useRef<HTMLElement>()

  useReady(async () => {
    scrollParentRef.current = await getScrollParent(rootRef.current)
  })

  const reachTopRef = useRef<boolean>()
  const [status, setStatus] = useState(PullRefreshStatus.Awaiting)
  const [distance, setDistance] = useState(0)
  const durationRef = useRef(0)

  const touch = useTouch()

  const isTouchable = useCallback(
    () =>
      PullRefreshStatus.Loading !== status && PullRefreshStatus.Completed !== status && !disabled,
    [disabled, status],
  )

  const easeDistance = useCallback(
    (distance: number) => {
      const pullDistance = +(pullDistanceProp || headHeight)

      if (distance > pullDistance) {
        if (distance < pullDistance * 2) {
          distance = pullDistance + (distance - pullDistance) / 2
        } else {
          distance = pullDistance * 1.5 + (distance - pullDistance * 2) / 4
        }
      }

      return Math.round(distance)
    },
    [headHeight, pullDistanceProp],
  )

  const checkPosition = useCallback(
    async (event: ITouchEvent) => {
      reachTopRef.current = (await getScrollTop(scrollParentRef.current)) === 0
      if (reachTopRef.current) {
        durationRef.current = 0
        touch.start(event)
      }
    },
    [touch],
  )

  const onTouchStart = useCallback(
    async (event: ITouchEvent) => {
      if (isTouchable()) {
        await checkPosition(event)
      }
    },
    [checkPosition, isTouchable],
  )

  const updateStatus = useCallback(
    (distance: number, isLoading?: boolean) => {
      const pullDistance = +(pullDistanceProp || headHeight)
      if (isLoading) {
        setStatus(PullRefreshStatus.Loading)
      } else if (distance === 0) {
        setStatus(PullRefreshStatus.Awaiting)
      } else if (distance < pullDistance) {
        setStatus(PullRefreshStatus.Pulling)
      } else {
        setStatus(PullRefreshStatus.Loosing)
      }
      setDistance(distance)
    },
    [headHeight, pullDistanceProp],
  )

  const onTouchMove = useCallback(
    async (event: ITouchEvent) => {
      if (isTouchable()) {
        if (!reachTopRef.current) {
          await checkPosition(event)
        }

        const { deltaY } = touch
        touch.move(event)

        if (reachTopRef.current && deltaY >= 0 && touch.direction === TouchDirection.Vertical) {
          preventDefault(event)
          updateStatus(easeDistance(deltaY))
        }
      }
    },
    [checkPosition, easeDistance, isTouchable, touch, updateStatus],
  )

  const onTouchEnd = useCallback(() => {
    if (reachTopRef.current && touch.deltaY && isTouchable()) {
      durationRef.current = durationProp
      if (status === PullRefreshStatus.Loosing) {
        updateStatus(headHeight, true)

        // ensure value change can be watched
        nextTick(() => onRefresh?.())
      } else {
        updateStatus(0)
      }
    }
  }, [durationProp, headHeight, isTouchable, onRefresh, status, touch.deltaY, updateStatus])

  const showCompleted = useCallback(() => {
    setStatus(PullRefreshStatus.Completed)
    setTimeout(() => updateStatus(0), +completedDuration)
  }, [completedDuration, updateStatus])

  useEffect(() => {
    if (loading) {
      updateStatus(headHeight, true)
    }
  }, [headHeight, loading, updateStatus])

  useEffect(() => {
    if (!loading && !isTouchable() && !completedElement) {
      durationRef.current = durationProp
      updateStatus(0, false)
    }
  }, [completedElement, durationProp, isTouchable, loading, updateStatus])

  useEffect(() => {
    if (!loading && completedElement) {
      showCompleted()
    }
  }, [completedElement, loading, showCompleted])

  const getStatusText = useCallback(() => {
    if (status === PullRefreshStatus.Pulling) {
      return "下拉即可刷新..."
    }
    if (status === PullRefreshStatus.Loosing) {
      return "释放即可刷新..."
    }
    if (status === PullRefreshStatus.Loading) {
      return "加载中..."
    }
    return ""
  }, [status])

  const renderStatus = useCallback(() => {
    // @ts-ignore
    const statusSlot = children[status as string]
    if (statusSlot) {
      return statusSlot
    }

    const nodes = []

    if (TEXT_STATUS.includes(status)) {
      nodes.push(
        <View
          key="text"
          className={prefixClassname("pull-refresh__text")}
          children={getStatusText()}
        />,
      )
    }

    if (status === PullRefreshStatus.Loading) {
      nodes.push(
        <Loading
          key="loading"
          className={prefixClassname("pull-refresh__loading")}
          children={getStatusText()}
        />,
      )
    }

    return nodes
  }, [children, getStatusText, status])

  const trackStyle = {
    transitionDuration: `${durationRef.current}ms`,
    transform: distance ? `translate3d(0,${addUnitPx(distance)}, 0)` : "",
  }

  const headStyle = useMemo(() => {
    if (headHeight !== 50) {
      return {
        height: addUnitPx(headHeight),
      }
    }
  }, [headHeight])

  return (
    <PullRefreshContext.Provider
      value={{
        distance,
      }}
    >
      <View
        ref={rootRef}
        className={classNames(prefixClassname("pull-refresh"), className)}
        style={style}
      >
        <View
          className={prefixClassname("pull-refresh__track")}
          style={trackStyle}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onTouchCancel={onTouchEnd}
        >
          <View
            className={prefixClassname("pull-refresh__head")}
            style={headStyle}
            children={renderStatus()}
          />
          {content}
        </View>
      </View>
    </PullRefreshContext.Provider>
  )
}

export default PullRefresh

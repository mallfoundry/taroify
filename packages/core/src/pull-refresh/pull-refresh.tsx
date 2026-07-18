import { View } from "@tarojs/components"
import type { ViewProps } from "@tarojs/components/types/View"
import { getEnv, getSystemInfoSync, nextTick } from "@tarojs/taro"
import classNames from "classnames"
import * as React from "react"
import {
  Children,
  type CSSProperties,
  isValidElement,
  type ReactElement,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import Loading from "../loading"
import { prefixClassname } from "../styles"
import { preventDefault } from "../utils/dom/event"
import { addUnitPx } from "../utils/format/unit"
import { useToRef } from "../utils/state"
import { useTouch } from "../utils/touch"
import { throttle } from "../utils/lodash-polyfill"
import {
  PullRefreshCompleted,
  type PullRefreshCompletedProps,
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
const ANDROID_WEAPP_PULLING_DURATION = 300

function getPullingDuration() {
  try {
    if (
      typeof getEnv === "function" &&
      getEnv() === "WEAPP" &&
      typeof getSystemInfoSync === "function" &&
      getSystemInfoSync().platform === "android"
    ) {
      return ANDROID_WEAPP_PULLING_DURATION
    }
  } catch {
    // Ignore unavailable platform APIs, for example during SSR.
  }
  return 0
}

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

export interface PullRefreshProps extends ViewProps {
  style?: CSSProperties
  loading?: boolean
  disabled?: boolean
  duration?: number
  headHeight?: number

  reachTop?: boolean
  pullDistance?: number
  children?: ReactNode

  onRefresh?(): void
}

function PullRefresh(props: PullRefreshProps) {
  const {
    className,
    loading,
    disabled = false,
    headHeight = 50,
    reachTop: reachTopProp,
    pullDistance: pullDistanceProp,
    duration: durationProp = 300,
    children: childrenProp,
    onRefresh,
    ...restProps
  } = props

  const children = usePullRefreshChildren(childrenProp)
  const { completed: completedElement, content } = children
  const { duration: completedDuration = 500 } = getCompletedProps(completedElement)

  const statusRef = useRef(PullRefreshStatus.Awaiting)
  const [distance, setDistance] = useState(0)
  const reachTopPropRef = useToRef(reachTopProp)
  const internalReachTopRef = useRef(true)
  const touchStartedRef = useRef(false)
  const durationRef = useRef(0)

  const touch = useTouch()

  const isReachTop = useCallback(
    () =>
      reachTopPropRef.current === undefined ? internalReachTopRef.current : reachTopPropRef.current,
    [reachTopPropRef],
  )

  const updateReachTop = useCallback((reachTop: boolean) => {
    internalReachTopRef.current = reachTop
  }, [])

  function resetDuration() {
    durationRef.current = 0
  }

  function setPullingDuration() {
    durationRef.current = getPullingDuration()
  }

  const isTouchable = useCallback(
    () =>
      PullRefreshStatus.Loading !== statusRef.current &&
      PullRefreshStatus.Completed !== statusRef.current &&
      !disabled,
    [disabled],
  )

  const easeDistance = useCallback(
    (distance: number) => {
      const pullDistance = +(pullDistanceProp || headHeight)
      let easedDistance = distance

      if (easedDistance > pullDistance) {
        if (easedDistance < pullDistance * 2) {
          easedDistance = pullDistance + (easedDistance - pullDistance) / 2
        } else {
          easedDistance = pullDistance * 1.5 + (easedDistance - pullDistance * 2) / 4
        }
      }

      return Math.round(easedDistance)
    },
    [headHeight, pullDistanceProp],
  )

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const checkPosition = useCallback(
    (event: any) => {
      if (isReachTop()) {
        setPullingDuration()
        touch.start(event)
        touchStartedRef.current = true
      }
    },
    [isReachTop, touch],
  )

  const onTouchStart = useCallback(
    (event: any) => {
      touchStartedRef.current = false
      if (isTouchable()) {
        checkPosition(event)
      }
    },
    [checkPosition, isTouchable],
  )

  const updateStatus = useCallback(
    (distance: number, isLoading?: boolean) => {
      const pullDistance = +(pullDistanceProp || headHeight)
      if (isLoading) {
        statusRef.current = PullRefreshStatus.Loading
      } else if (distance === 0) {
        statusRef.current = PullRefreshStatus.Awaiting
      } else if (distance < pullDistance) {
        statusRef.current = PullRefreshStatus.Pulling
      } else {
        statusRef.current = PullRefreshStatus.Loosing
      }
      setDistance(distance)
    },
    [headHeight, pullDistanceProp],
  )

  const onTouchMove = useMemo(
    () =>
      throttle((event: any) => {
        if (isTouchable()) {
          if (!touchStartedRef.current) {
            checkPosition(event)
          }

          touch.move(event)
          const { deltaY } = touch

          if (isReachTop() && deltaY >= 0 && touch.isVertical()) {
            preventDefault(event)
            updateStatus(easeDistance(deltaY))
          }
        }
      }, 16.7),
    [checkPosition, easeDistance, isReachTop, isTouchable, touch, updateStatus],
  )

  const onTouchEnd = useCallback(() => {
    onTouchMove.flush()
    onTouchMove.cancel()

    const touchStarted = touchStartedRef.current
    touchStartedRef.current = false
    touch.reset()

    if (touchStarted && isTouchable()) {
      durationRef.current = durationProp
      if (isReachTop() && statusRef.current === PullRefreshStatus.Loosing) {
        updateStatus(headHeight, true)
        // TODO Nested in CustomWrapper does not call.
        // ensure value change can be watched
        // nextTick(() => onRefresh?.())
        onRefresh?.()
      } else {
        updateStatus(0)
      }
    }
  }, [
    durationProp,
    headHeight,
    isReachTop,
    isTouchable,
    onRefresh,
    onTouchMove,
    touch,
    updateStatus,
  ])

  const onTouchCancel = useCallback(() => {
    onTouchMove.cancel()

    const touchStarted = touchStartedRef.current
    touchStartedRef.current = false
    touch.reset()

    if (touchStarted && isTouchable()) {
      durationRef.current = durationProp
      updateStatus(0)
    }
  }, [durationProp, isTouchable, onTouchMove, touch, updateStatus])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const showCompleted = useCallback(() => {
    statusRef.current = PullRefreshStatus.Completed
    resetDuration()
    setTimeout(() => nextTick(() => updateStatus(0)), +completedDuration)
  }, [completedDuration, updateStatus])

  const contextValue = useMemo(
    () => ({ distance, updateReachTop, onTouchStart, onTouchMove, onTouchEnd }),
    [distance, onTouchStart, onTouchMove, onTouchEnd, updateReachTop],
  )

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

  useEffect(() => () => onTouchMove.cancel(), [onTouchMove])

  const getStatusText = useCallback(() => {
    if (statusRef.current === PullRefreshStatus.Pulling) {
      return "下拉即可刷新..."
    }
    if (statusRef.current === PullRefreshStatus.Loosing) {
      return "释放即可刷新..."
    }
    if (statusRef.current === PullRefreshStatus.Loading) {
      return "加载中..."
    }
    return ""
  }, [])

  const renderStatus = useCallback(() => {
    const statusSlot = children[statusRef.current as keyof PullRefreshChildren]
    if (statusSlot) {
      return statusSlot
    }

    const nodes: ReactElement[] = []

    if (TEXT_STATUS.includes(statusRef.current)) {
      nodes.push(
        <View
          key="text"
          className={prefixClassname("pull-refresh__text")}
          children={getStatusText()}
        />,
      )
    }

    if (statusRef.current === PullRefreshStatus.Loading) {
      nodes.push(
        <Loading
          key="loading"
          className={prefixClassname("pull-refresh__loading")}
          children={getStatusText()}
        />,
      )
    }

    return nodes
  }, [children, getStatusText])

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
    <PullRefreshContext.Provider value={contextValue}>
      <View className={classNames(prefixClassname("pull-refresh"), className)} {...restProps}>
        <View
          className={prefixClassname("pull-refresh__track")}
          style={trackStyle}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onTouchCancel={onTouchCancel}
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

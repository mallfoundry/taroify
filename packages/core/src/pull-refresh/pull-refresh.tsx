import { ITouchEvent, View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import { nextTick } from "@tarojs/taro"
import classNames from "classnames"
import * as _ from "lodash"
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
import { addUnitPx } from "../utils/format/unit"
import { usePreviousRef, useToRef } from "../utils/state"
import { useTouch } from "../utils/touch"
import {
  PullRefreshCompleted,
  PullRefreshCompletedProps,
  PullRefreshLoading,
  PullRefreshLoosing,
  PullRefreshPulling,
} from "./pull-refresh-children"
import PullRefreshContext from "./pull-refresh.context"

const lodashRoot = require("lodash/_root")

if (typeof lodashRoot.Date === "undefined") {
  lodashRoot.Date = Date
}

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
    reachTop: reachTopProp = true,
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
  const reachTopPreviousRef = usePreviousRef(reachTopProp)
  const reachTopRef = useToRef(reachTopProp)
  const durationRef = useRef(0)

  const touch = useTouch()

  function resetDuration() {
    durationRef.current = 0
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
    (event: ITouchEvent) => {
      if (reachTopRef.current) {
        resetDuration()
        touch.start(event)
      }
    },
    [reachTopRef, touch],
  )

  const onTouchStart = useCallback(
    (event: ITouchEvent) => {
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
      _.throttle((event: ITouchEvent) => {
        if (isTouchable()) {
          if (!reachTopPreviousRef.current) {
            checkPosition(event)
          }

          const { deltaY } = touch
          touch.move(event)

          if (reachTopRef.current && deltaY >= 0 && touch.isVertical()) {
            preventDefault(event)
            updateStatus(easeDistance(deltaY))
          }
        }
      }, 16.7),
    [
      checkPosition,
      easeDistance,
      isTouchable,
      reachTopPreviousRef,
      reachTopRef,
      touch,
      updateStatus,
    ],
  )

  const onTouchEnd = useCallback(() => {
    if (reachTopRef.current && isTouchable()) {
      durationRef.current = durationProp
      if (statusRef.current === PullRefreshStatus.Loosing) {
        updateStatus(headHeight, true)
        // TODO Nested in CustomWrapper does not call.
        // ensure value change can be watched
        // nextTick(() => onRefresh?.())
        onRefresh?.()
      } else {
        updateStatus(0)
      }
    }
  }, [durationProp, headHeight, isTouchable, onRefresh, reachTopRef, updateStatus])

  const showCompleted = useCallback(() => {
    statusRef.current = PullRefreshStatus.Completed
    resetDuration()
    setTimeout(() => nextTick(() => updateStatus(0)), +completedDuration)
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
    // @ts-ignore
    const statusSlot = children[statusRef.current as string]
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
    <PullRefreshContext.Provider
      value={{
        distance,
      }}
    >
      <View className={classNames(prefixClassname("pull-refresh"), className)} {...restProps}>
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

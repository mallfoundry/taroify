import { useUncontrolled } from "@taroify/hooks"
import { ITouchEvent, View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import {
  Children,
  cloneElement,
  CSSProperties,
  isValidElement,
  LegacyRef,
  ReactElement,
  ReactNode,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react"
import { useRenderedEffect } from "../hooks"
import { prefixClassname } from "../styles"
import { inBrowser } from "../utils/base"
import { preventDefault } from "../utils/dom/event"
import { getRect } from "../utils/dom/rect"
import { addUnitPx } from "../utils/format/unit"
import { fulfillPromise } from "../utils/promisify"
import { useTouch } from "../utils/touch"
import SwipeCellActions from "./swipe-cell-actions"

type SwipeCellPosition = "left" | "right" | "cell" | "outside"

interface SwipeCellChildren {
  left?: ReactNode
  content?: ReactNode[]
  right?: ReactNode
}

function useSwipeCellChildren(
  children?: ReactNode,
  leftRef?: LegacyRef<typeof View | undefined>,
  rightRef?: LegacyRef<typeof View | undefined>,
  handleClick?: (position: SwipeCellPosition, stop?: boolean) => void,
): SwipeCellChildren {
  return useMemo(() => {
    const __children__: SwipeCellChildren = {
      left: undefined,
      content: [],
      right: undefined,
    }
    Children.forEach(children, (child: ReactNode) => {
      if (isValidElement(child)) {
        const element = child as ReactElement
        const elementType = element.type
        if (elementType === SwipeCellActions) {
          const { props } = element
          const { side, onClick } = props
          if (side === "left") {
            __children__.left = cloneElement(element, {
              ...props,
              ref: leftRef,
              onClick: (event: ITouchEvent) => {
                onClick?.(event)
                handleClick?.("left", true)
              },
            })
          } else if (side === "right") {
            __children__.right = cloneElement(element, {
              ...props,
              ref: rightRef,
              onClick: (event: ITouchEvent) => {
                onClick?.(event)
                handleClick?.("right", true)
              },
            })
          }
        } else {
          __children__.content?.push(element)
        }
      } else {
        __children__.content?.push(child)
      }
    })

    return __children__
  }, [children, handleClick, leftRef, rightRef])
}

export interface SwipeCellProps extends ViewProps {
  className?: string
  style?: CSSProperties
  defaultOpen?: SwipeCellPosition
  open?: SwipeCellPosition
  disabled?: boolean
  stopPropagation?: boolean
  children?: ReactNode

  onOpen?(position: SwipeCellPosition): void

  onClose?(position: SwipeCellPosition): void
}

function SwipeCell(props: SwipeCellProps) {
  const {
    className,
    defaultOpen,
    open: openProp,
    disabled,
    stopPropagation,
    onOpen,
    onClose,
    onClick: onClickProp,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onTouchCancel,
    children: childrenProp,
    ...restProps
  } = props

  const { value } = useUncontrolled<SwipeCellPosition>({
    defaultValue: defaultOpen,
    value: openProp,
  })

  const openedRef = useRef(false)
  const lockClickRef = useRef(false)
  const startOffsetRef = useRef(0)

  const rootRef = useRef<typeof View>()
  const leftRef = useRef<typeof View>()
  const rightRef = useRef<typeof View>()

  const leftWidthRef = useRef(0)

  const rightWidthRef = useRef(0)

  const positionRef = useRef<SwipeCellPosition>("outside")

  const draggingRef = useRef(false)

  const [offset, setOffset] = useState(0)

  const touch = useTouch()

  const updateLeftWidth = () =>
    getRect(leftRef)
      .then(({ width }) => width ?? 0)
      .then((leftWidth) => (leftWidthRef.current = leftWidth))

  const updateRightWidth = () =>
    getRect(rightRef)
      .then(({ width }) => width ?? 0)
      .then((rightWidth) => (rightWidthRef.current = rightWidth))

  const open = useCallback(
    (side: SwipeCellPosition, emitOpen: boolean = true) => {
      openedRef.current = true
      setOffset(side === "left" ? leftWidthRef.current : -rightWidthRef.current)
      if (emitOpen) {
        onOpen?.(side)
      }
    },
    [onOpen],
  )

  const close = useCallback(
    (position: SwipeCellPosition, emitClose: boolean = true) => {
      openedRef.current = false
      setOffset(0)
      if (emitClose) {
        onClose?.(position)
      }
    },
    [onClose],
  )

  const toggle = useCallback(
    (side: SwipeCellPosition) => {
      const THRESHOLD = 0.15
      const threshold = openedRef.current ? 1 - THRESHOLD : THRESHOLD
      const width = side === "left" ? leftWidthRef.current : rightWidthRef.current
      const offsetAbs = Math.abs(offset)
      if (width && offsetAbs > width * threshold) {
        open(side)
      } else {
        close(side)
      }
    },
    [close, offset, open],
  )

  const handleTouchStart = (event: ITouchEvent) => {
    if (disabled) {
      return
    }

    fulfillPromise(Promise.all([updateLeftWidth(), updateRightWidth()]))

    startOffsetRef.current = offset
    touch.start(event)
  }

  const handleTouchMove = useCallback(
    async (event: ITouchEvent) => {
      if (disabled) {
        return
      }

      const { deltaX } = touch

      touch.move(event)

      if (touch.isHorizontal()) {
        const offset = _.clamp(
          deltaX + startOffsetRef.current,
          -rightWidthRef.current,
          leftWidthRef.current,
        )

        if (!draggingRef.current) {
          draggingRef.current = true
        }

        lockClickRef.current = true

        const isEdge = !openedRef.current || deltaX * startOffsetRef.current < 0

        if (isEdge) {
          preventDefault(event, stopPropagation)
        }

        positionRef.current = offset > 0 ? "left" : "right"

        setOffset(offset)
      }
    },
    [disabled, stopPropagation, touch],
  )

  const handleTouchEnd = () => {
    if (disabled) {
      return
    }
    draggingRef.current = false
    toggle(positionRef.current)
    // compatible with desktop scenario
    setTimeout(() => {
      lockClickRef.current = false
    }, 0)
  }

  const onClick = useCallback(
    (position: SwipeCellPosition = "outside") => {
      if (openedRef.current && !lockClickRef.current) {
        close(position)
      }
    },
    [close],
  )

  const handleClick = useCallback(
    (position: SwipeCellPosition, stop?: boolean) => (event: ITouchEvent) => {
      if (stop) {
        event.stopPropagation()
      }
      onClick(position)
    },
    [onClick],
  )

  const { left, content, right } = useSwipeCellChildren(
    childrenProp,
    leftRef,
    rightRef,
    handleClick,
  )

  const valueChange = (side?: SwipeCellPosition) => {
    if (side === "left" || side === "right") {
      new Promise((resolve) => {
        if (inBrowser) {
          setTimeout(() => {
            if (side === "left") {
              updateLeftWidth().then(resolve)
            } else {
              updateRightWidth().then(resolve)
            }
          }, 150)
        } else {
          resolve(true)
        }
      }).then(() => {
        draggingRef.current = false
        open(side, false)
      })
    } else {
      close("outside", false)
    }
  }

  useRenderedEffect(() => {
    if (!inBrowser) {
      fulfillPromise(updateLeftWidth())
    }
  }, [left])

  useRenderedEffect(() => {
    if (!inBrowser) {
      fulfillPromise(updateRightWidth())
    }
  }, [right])

  useRenderedEffect(() => valueChange(value), [value])

  return (
    <View
      ref={rootRef}
      className={classNames(prefixClassname("swipe-cell"), className)}
      onTouchStart={(event) => {
        onTouchStart?.(event)
        handleTouchStart(event)
      }}
      onTouchMove={(event) => {
        onTouchMove?.(event)
        handleTouchMove?.(event)
      }}
      onTouchEnd={(event) => {
        onTouchEnd?.(event)
        handleTouchEnd()
      }}
      onTouchCancel={(event) => {
        onTouchCancel?.(event)
        handleTouchEnd()
      }}
      onClick={(event) => {
        onClickProp?.(event)
        handleClick("cell")
      }}
      {...restProps}
    >
      <View
        className={prefixClassname("swipe-cell__wrapper")}
        style={{
          transform: `translate3d(${addUnitPx(offset)}, 0, 0)`,
          ...(inBrowser ? { transitionDuration: draggingRef.current ? "0s" : ".3s" } : {}),
        }}
      >
        {left}
        {content}
        {right}
      </View>
    </View>
  )
}

export default SwipeCell

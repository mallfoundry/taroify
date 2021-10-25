import { ITouchEvent, View } from "@tarojs/components"
import { nextTick } from "@tarojs/taro"
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
  useEffect,
  useRef,
  useState,
} from "react"
import { prefixClassname } from "../styles"
import { preventDefault } from "../utils/dom/event"
import { addUnitPx } from "../utils/format/unit"
import { getRect } from "../utils/dom/rect"
import { useTouch } from "../utils/touch"
import SwipeCellActions from "./swipe-cell-actions"

enum SwipeCellPosition {
  Left = "left",
  Right = "right",
  Cell = "cell",
  Outside = "outside",
}

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
        if (side === SwipeCellPosition.Left) {
          __children__.left = cloneElement(element, {
            ...props,
            ref: leftRef,
            onClick: (event: ITouchEvent) => {
              onClick?.(event)
              handleClick?.(SwipeCellPosition.Left, true)
            },
          })
        } else if (side === SwipeCellPosition.Right) {
          __children__.right = cloneElement(element, {
            ...props,
            ref: rightRef,
            onClick: (event: ITouchEvent) => {
              onClick?.(event)
              handleClick?.(SwipeCellPosition.Right, true)
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
}

export interface SwipeCellProps {
  className?: string
  style?: CSSProperties
  // open?: boolean
  disabled?: boolean
  stopPropagation?: boolean
  children?: ReactNode
  onOpen?: (position: SwipeCellPosition) => void
  onClose?: (position: SwipeCellPosition) => void
}

function SwipeCell(props: SwipeCellProps) {
  const {
    className,
    style,
    // open: openProp = undefined,
    disabled,
    stopPropagation,
    onOpen,
    onClose,
  } = props

  const openedRef = useRef(false)
  const lockClickRef = useRef(false)
  const startOffsetRef = useRef(0)

  const rootRef = useRef<typeof View>()
  const leftRef = useRef<typeof View>()
  const rightRef = useRef<typeof View>()

  const leftWidthRef = useRef(0)
  const rightWidthRef = useRef(0)

  const [dragging, setDragging] = useState(false)
  const [offset, setOffset] = useState(0)
  const [position, setPosition] = useState<SwipeCellPosition>(SwipeCellPosition.Outside)

  const touch = useTouch()

  const open = useCallback(
    (side: SwipeCellPosition) => {
      openedRef.current = true
      setOffset(side === SwipeCellPosition.Left ? leftWidthRef.current : -rightWidthRef.current)
      onOpen?.(side)
    },
    [onOpen],
  )

  const close = useCallback(
    (position: SwipeCellPosition) => {
      openedRef.current = false
      setOffset(0)
      onClose?.(position)
    },
    [onClose],
  )

  const toggle = useCallback(
    (side: SwipeCellPosition) => {
      const THRESHOLD = 0.15
      const threshold = openedRef.current ? 1 - THRESHOLD : THRESHOLD
      const width = side === SwipeCellPosition.Left ? leftWidthRef.current : rightWidthRef.current
      const offsetAbs = Math.abs(offset)
      if (width && offsetAbs > width * threshold) {
        open(side)
      } else {
        close(side)
      }
    },
    [close, offset, open],
  )

  const onTouchStart = (event: ITouchEvent) => {
    if (disabled) {
      return
    }
    startOffsetRef.current = offset
    touch.start(event)
  }

  const onTouchMove = useCallback(
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

        const position = offset > 0 ? SwipeCellPosition.Left : SwipeCellPosition.Right

        lockClickRef.current = true
        setDragging(true)

        const isEdge = !openedRef.current || deltaX * startOffsetRef.current < 0
        if (isEdge) {
          preventDefault(event, stopPropagation)
        }

        setOffset(offset)
        setPosition(position)
      }
    },
    [disabled, stopPropagation, touch],
  )

  const onTouchEnd = () => {
    if (disabled) {
      return
    }
    setDragging(false)
  }

  useEffect(() => {
    if (!dragging) {
      toggle(position)
      // compatible with desktop scenario
      setTimeout(() => {
        lockClickRef.current = false
      }, 0)
    }
  }, [dragging, position, toggle])

  const onClick = (position: SwipeCellPosition = SwipeCellPosition.Outside) => {
    if (openedRef.current && !lockClickRef.current) {
      close(position)
    }
  }

  const handleClick = (position: SwipeCellPosition, stop?: boolean) => (event: ITouchEvent) => {
    if (stop) {
      event.stopPropagation()
    }
    onClick(position)
  }

  const { left, content, right } = useSwipeCellChildren(
    props.children,
    leftRef,
    rightRef,
    handleClick,
  )

  const getLeftWidth = async () => (await getRect(leftRef))?.width ?? 0

  const getRightWidth = async () => (await getRect(rightRef))?.width ?? 0

  useEffect(() => {
    nextTick(() => {
      getLeftWidth().then((width) => (leftWidthRef.current = width))
    })
  }, [left])

  useEffect(() => {
    nextTick(() => {
      getRightWidth().then((width) => (rightWidthRef.current = width))
    })
  }, [right])

  return (
    <View
      ref={rootRef}
      className={classNames(prefixClassname("swipe-cell"), className)}
      style={style}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchEnd}
      onClick={handleClick(SwipeCellPosition.Cell)}
    >
      <View
        className={prefixClassname("swipe-cell__wrapper")}
        style={{
          transform: `translate3d(${addUnitPx(offset)}, 0, 0)`,
          transitionDuration: dragging ? "0s" : ".6s",
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

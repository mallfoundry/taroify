import { Star, StarOutlined } from "@taroify/icons"
import { ITouchEvent, View } from "@tarojs/components"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { CSSProperties, ReactNode, useCallback, useRef } from "react"
import { prefixClassname } from "../styles"
import { getClientCoordinates, preventDefault } from "../utils/dom/event"
import { getBoundingClientRects } from "../utils/rect"
import { useTouch } from "../utils/touch"
import RateItem from "./rate-item"
import RateContext from "./rate.context"
import { RateStatus } from "./rate.shared"

type RateListItem = {
  value: number
  status: RateStatus
}

function getRateStatus(
  value: number,
  index: number,
  allowHalf: boolean,
  readonly: boolean,
): RateListItem {
  if (value >= index) {
    return { status: RateStatus.Full, value: 1 }
  }

  if (value + 0.5 >= index && allowHalf && !readonly) {
    return { status: RateStatus.Half, value: 0.5 }
  }

  if (value + 1 >= index && allowHalf && readonly) {
    const cardinal = 10 ** 10
    return {
      status: RateStatus.Half,
      value: Math.round((value - index + 1) * cardinal) / cardinal,
    }
  }

  return { status: RateStatus.Void, value: 0 }
}

interface RateProps {
  className?: string
  style?: CSSProperties
  value?: number
  count?: number
  size?: number
  gutter?: number
  allowHalf?: boolean
  readonly?: boolean
  disabled?: boolean
  touchable?: boolean

  voidIcon?: ReactNode
  fullIcon?: ReactNode
  halfIcon?: ReactNode

  onChange?(value: number): void
}

function Rate(props: RateProps) {
  const {
    className,
    value = 0,
    count = 5,
    // gutter,
    allowHalf = false,
    readonly = false,
    disabled = false,
    touchable = true,
    voidIcon = <StarOutlined />,
    fullIcon = <Star />,
    halfIcon = <Star />,
    onChange,
  } = props
  console.log("value", value)
  const rootRef = useRef<HTMLElement>()

  const untouchable = readonly || disabled || !touchable

  const list = Array(count)
    .fill("")
    .map((__, i) => getRateStatus(value, i + 1, allowHalf, readonly))

  const touch = useTouch()

  const getRanges = useCallback(
    () =>
      getBoundingClientRects(rootRef, ` .${prefixClassname("rate__item")}`).then((rects) =>
        rects.flatMap((rect, index) =>
          allowHalf
            ? [
                { score: index + 0.5, left: rect.left },
                { score: index + 1, left: rect.left + rect.width / 2 },
              ]
            : [{ score: index + 1, left: rect.left }],
        ),
      ),
    [allowHalf],
  )

  const getScoreByPosition = useCallback(
    (x: number) =>
      getRanges().then((ranges) => {
        for (let i = ranges.length - 1; i > 0; i--) {
          if (x > ranges[i].left) {
            return ranges[i].score
          }
        }
        return allowHalf ? 0.5 : 1
      }),
    [allowHalf, getRanges],
  )

  const emitChange = useCallback(
    (aValue: number) => {
      // nextTick(() => onChange?.(aValue))
      onChange?.(aValue)
    },
    [onChange],
  )

  const onTouchStart = useCallback(
    (event: ITouchEvent) => {
      if (untouchable) {
        return
      }
      touch.start(event)
    },
    [touch, untouchable],
  )

  const onTouchMove = useCallback(
    (event: ITouchEvent) => {
      if (untouchable) {
        return
      }
      // touch.move(event)
      //
      // if (touch.isHorizontal()) {
      //   const { clientX } = getClientCoordinates(event)
      //   preventDefault(event)
      //   getScoreByPosition(clientX).then(emitChange)
      // }
      const { clientX } = getClientCoordinates(event)
      preventDefault(event)
      getScoreByPosition(clientX).then(emitChange)
    },
    [emitChange, getScoreByPosition, untouchable],
  )

  const onItemClick = useCallback(
    (event: ITouchEvent) => {
      const { clientX } = getClientCoordinates(event)
      getScoreByPosition(clientX).then(emitChange)
    },
    [emitChange, getScoreByPosition],
  )

  const renderStar = useCallback(
    (item: RateListItem, index: number) => {
      const score = index + 1
      const renderHalf = allowHalf && item.value > 0 && item.value < 1

      return (
        <RateItem
          key={index}
          value={item.value}
          half={renderHalf}
          status={item.status}
          onClick={onItemClick}
        />
      )
    },
    [allowHalf, onItemClick],
  )

  return (
    <View
      ref={rootRef}
      className={classNames(prefixClassname("rate"), className)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
    >
      <RateContext.Provider
        value={{
          voidIcon,
          fullIcon,
          halfIcon,
        }}
      >
        {_.map(list, renderStar)}
      </RateContext.Provider>
    </View>
  )
}

export default Rate

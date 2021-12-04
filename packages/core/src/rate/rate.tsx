import { Star, StarOutlined } from "@taroify/icons"
import { ITouchEvent, View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { CSSProperties, ReactNode, useCallback, useMemo, useRef } from "react"
import { prefixClassname } from "../styles"
import { getClientCoordinates, preventDefault } from "../utils/dom/event"
import { getRects } from "../utils/dom/rect"
import { useValue } from "../utils/state"
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

interface RateProps extends ViewProps {
  className?: string
  style?: CSSProperties
  defaultValue?: number
  value?: number
  count?: number
  size?: number
  gutter?: number
  allowHalf?: boolean
  readonly?: boolean
  disabled?: boolean
  touchable?: boolean
  icon?: ReactNode
  emptyIcon?: ReactNode

  onChange?(value: number): void
}

function Rate(props: RateProps) {
  const {
    className,
    defaultValue,
    value: valueProp,
    count = 5,
    size,
    gutter,
    allowHalf = false,
    readonly = false,
    disabled = false,
    touchable = true,
    icon = <Star />,
    emptyIcon = <StarOutlined />,
    onClick,
    onTouchStart,
    onTouchMove,
    onChange,
    ...restProps
  } = props

  const [value = 0, setValue] = useValue(valueProp, {
    defaultValue,
    onChange,
  })

  const rootRef = useRef<HTMLElement>()

  const untouchable = readonly || disabled || !touchable

  const touch = useTouch()

  const getRanges = useCallback(
    () =>
      getRects(rootRef, ` .${prefixClassname("rate__item")}`).then((rects) =>
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

  const onItemClick = useCallback(
    (event: ITouchEvent) => {
      onClick?.(event)
      if (untouchable) {
        return
      }
      const { clientX } = getClientCoordinates(event)
      getScoreByPosition(clientX).then(setValue)
    },
    [onClick, untouchable, getScoreByPosition, setValue],
  )

  const handleTouchStart = useCallback(
    (event: ITouchEvent) => {
      if (untouchable) {
        return
      }
      touch.start(event)
    },
    [touch, untouchable],
  )

  const handleTouchMove = useCallback(
    (event: ITouchEvent) => {
      if (untouchable) {
        return
      }
      touch.move(event)
      if (touch.isHorizontal()) {
        preventDefault(event)
        onItemClick(event)
      }
    },
    [untouchable, touch, onItemClick],
  )

  const renderStar = useCallback(
    (item: RateListItem, index: number) => {
      const renderHalf = allowHalf && item.value > 0 && item.value < 1

      return (
        <RateItem
          key={index}
          score={index + 1}
          disabled={disabled}
          size={size}
          half={renderHalf}
          value={item.value}
          status={item.status}
        />
      )
    },
    [allowHalf, disabled, size],
  )

  const stars = useMemo(
    () =>
      Array(count)
        .fill("")
        .map((__, i) => getRateStatus(value, i + 1, allowHalf, readonly)),
    [allowHalf, count, readonly, value],
  )

  return (
    <View
      ref={rootRef}
      className={classNames(
        prefixClassname("rate"),
        {
          [prefixClassname("rate--disabled")]: disabled,
          [prefixClassname("rate--readonly")]: readonly,
        },
        className,
      )}
      catchMove
      onClick={onItemClick}
      onTouchStart={(event) => {
        onTouchStart?.(event)
        handleTouchStart(event)
      }}
      onTouchMove={(event) => {
        onTouchMove?.(event)
        handleTouchMove(event)
      }}
      {...restProps}
    >
      <RateContext.Provider
        value={{
          gutter,
          count,
          icon,
          emptyIcon,
        }}
      >
        {
          //
          _.map(stars, renderStar)
        }
      </RateContext.Provider>
    </View>
  )
}

export default Rate

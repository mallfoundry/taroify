import * as React from "react"
import { forwardRef, type CSSProperties, useMemo, useState, useRef, useEffect } from "react"
import { getSystemInfoSync, getEnv } from "@tarojs/taro"
import { View, ScrollView } from "@tarojs/components"
import type { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import SafeArea from "../safe-area"
import { prefixClassname } from "../styles"
import { useTouch } from "../utils/touch"
import { addUnitPx } from "../utils/format/unit"
import { preventDefault } from "../utils/dom/event"
import { closest } from "../utils/closest"

const DAMP = 0.2

export interface FloatingPanelProps extends ViewProps {
  style?: CSSProperties
  height?: number // 当前面板的显示高度
  anchors?: number[] // 设置自定义锚点, 单位 px
  duration?: number // 动画时长，单位秒，设置为 0 可以禁用动画
  contentDraggable?: boolean // 允许拖拽内容容器
  safeAreaInsetBottom?: boolean // 是否开启底部安全区适配
  handleChange?: (height: number) => void
}

const FloatingPanel = forwardRef<any, FloatingPanelProps>((props, ref) => {
  const {
    className,
    style: styleProp,
    anchors: anchorsProp = [],
    height: heightProp = 0,
    duration = 0.3,
    contentDraggable = true,
    safeAreaInsetBottom = true,
    children,
    handleChange,
  } = props

  const contentRef = useRef<Element>()
  const headerRef = useRef<Element>()
  const startY = useRef(0)
  const [height, setHeight] = useState(heightProp)
  const [dragging, setDragging] = useState(false)
  const [scrollContentTop, setScrollContentTop] = useState(0)
  const touch = useTouch()

  const windowHeight = useMemo(() => getSystemInfoSync().windowHeight, [])

  const ease = (moveY: number): number => {
    const absDistance = Math.abs(moveY)
    const { min, max } = boundary

    if (absDistance > max) {
      return -(max + (absDistance - max) * DAMP)
    }

    if (absDistance < min) {
      return -(min - (min - absDistance) * DAMP)
    }

    return moveY
  }

  const boundary = useMemo(
    () => ({
      min: anchorsProp[0] ?? 100,
      max: anchorsProp[anchorsProp.length - 1] ?? Math.round(windowHeight * 0.6),
    }),
    [anchorsProp, windowHeight],
  )

  const anchors = useMemo(
    () => (anchorsProp.length >= 2 ? anchorsProp : [boundary.min, boundary.max]),
    [anchorsProp, boundary.min, boundary.max],
  )

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setHeight(closest(anchors, height))
  }, [boundary.max, boundary.min])

  const rootStyle = useMemo(
    () => ({
      height: addUnitPx(boundary.max),
      transform: `translateY(calc(100% + ${addUnitPx(-height)}))`,
      transition: !dragging
        ? `transform ${duration}s cubic-bezier(0.18, 0.89, 0.32, 1.28)`
        : "none",
    }),
    [boundary.max, height, dragging, duration],
  )

  const onTouchStart = (event): void => {
    touch.start(event)
    setDragging(true)
    startY.current = -height
  }

  const onTouchMove = async (event) => {
    touch.move(event)
    const target = event.target

    let isHeader = false
    if (getEnv() === "WEB") {
      isHeader = target.dataset.id === "floating-panel__header"
    } else {
      isHeader = target.dataset.id === "floating-panel__header"
    }

    if (!isHeader) {
      if (!contentDraggable) return
      let scrollTop = 0
      if (getEnv() === "WEB") {
        scrollTop = (contentRef.current as Element).scrollTop
      } else {
        scrollTop = scrollContentTop
      }
      if (-startY.current < boundary.max) {
        preventDefault(event, true)
      } else if (!(scrollTop <= 0 && touch.deltaY > 0)) {
        return
      }
    }

    const moveY = touch.deltaY + startY.current
    setHeight(-ease(moveY))
  }

  const onTouchEnd = (): void => {
    setDragging(false)
    setHeight(closest(anchors, height))
    if (height !== -startY.current) {
      handleChange?.(height)
    }
  }

  const onContentScroll = (e) => {
    setScrollContentTop(e.detail.scrollTop)
  }

  return (
    <View
      ref={ref}
      className={classNames(prefixClassname("floating-panel"), className)}
      style={{
        ...rootStyle,
        ...styleProp,
      }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchEnd}
    >
      <View
        className={classNames(prefixClassname("floating-panel__header"))}
        ref={headerRef}
        data-id="floating-panel__header"
      >
        <View className={classNames(prefixClassname("floating-panel__header-bar"))} />
      </View>
      {getEnv() === "WEB" ? (
        <View className={classNames(prefixClassname("floating-panel__content"))} ref={contentRef}>
          {children}
          {safeAreaInsetBottom && <SafeArea position="bottom" />}
        </View>
      ) : (
        <ScrollView
          scrollY
          className={classNames(prefixClassname("floating-panel__content"))}
          ref={contentRef}
          onScroll={onContentScroll}
        >
          {children}
          {safeAreaInsetBottom && <SafeArea position="bottom" />}
        </ScrollView>
      )}
    </View>
  )
})

export default FloatingPanel

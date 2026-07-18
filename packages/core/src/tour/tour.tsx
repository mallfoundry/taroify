import { Cross } from "@taroify/icons"
import { useUncontrolled } from "@taroify/hooks"
import { View } from "@tarojs/components"
import type { ITouchEvent } from "@tarojs/components/types/common"
import type { ViewProps } from "@tarojs/components/types/View"
import { createSelectorQuery, getWindowInfo, nextTick, usePageScroll } from "@tarojs/taro"
import classNames from "classnames"
import * as React from "react"
import {
  type CSSProperties,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { prefixClassname } from "../styles"
import { inBrowser } from "../utils/base"
import { preventDefault } from "../utils/dom/event"
import { getRect, type Rect } from "../utils/dom/rect"
import { useLockScrollTaro } from "../utils/dom/use-lock-scroll-taro"
import { addUnitPx } from "../utils/format/unit"
import type { TourPlacement, TourStep, TourType } from "./tour.shared"

type TourSide = "top" | "bottom" | "left" | "right"
type TourAlign = "start" | "center" | "end"

interface TourRect {
  top: number
  right: number
  bottom: number
  left: number
  width: number
  height: number
}

interface TourSize {
  width: number
  height: number
}

interface TourPopoverLayout {
  side: TourSide
  style: CSSProperties
  arrowStyle: CSSProperties
}

export interface TourProps extends Omit<ViewProps, "title" | "onChange"> {
  defaultOpen?: boolean
  open?: boolean
  type?: TourType
  list?: TourStep[]
  placement?: TourPlacement
  mask?: boolean
  maskWidth?: number | string
  maskHeight?: number | string
  offset?: [number, number]
  title?: ReactNode
  next?: ReactNode
  prev?: ReactNode
  complete?: ReactNode
  showPrev?: boolean
  closeOnOverlayClick?: boolean
  lock?: boolean
  children?: ReactNode

  onClose?(opened: false, event?: ITouchEvent): void

  onChange?(current: number): void
}

const VIEWPORT_GAP = 8
const ARROW_GAP = 12
const DEFAULT_MASK_OFFSET: [number, number] = [8, 10]
const DEFAULT_POPOVER_OFFSET: [number, number] = [0, 12]

function normalizeSelector(target: string) {
  return "#.[>+~:*".includes(target.charAt(0)) ? target : `#${target}`
}

async function getTargetRect(target: TourStep["target"]): Promise<TourRect | undefined> {
  if (typeof target !== "string") {
    const rect = await getRect(target)
    return rect as TourRect
  }

  const selector = normalizeSelector(target)
  if (inBrowser) {
    try {
      const element = document.querySelector(selector)
      return element?.getBoundingClientRect() as unknown as TourRect | undefined
    } catch {
      return undefined
    }
  }

  return new Promise<TourRect | undefined>((resolve) => {
    createSelectorQuery()
      .select(selector)
      .boundingClientRect((rect) => resolve(rect as unknown as TourRect | undefined))
      .exec()
  })
}

function toNumber(value: number | string | undefined, fallback: number) {
  const result = typeof value === "number" ? value : Number.parseFloat(value || "")
  return Number.isFinite(result) ? result : fallback
}

function getHighlightRect(
  rect: TourRect,
  maskWidth: number | string | undefined,
  maskHeight: number | string | undefined,
  offset: [number, number],
): TourRect {
  const [verticalOffset = 0, horizontalOffset = 0] = offset
  const width = Math.max(0, toNumber(maskWidth, rect.width) + horizontalOffset * 2)
  const height = Math.max(0, toNumber(maskHeight, rect.height) + verticalOffset * 2)
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  const left = centerX - width / 2
  const top = centerY - height / 2

  return {
    top,
    left,
    right: left + width,
    bottom: top + height,
    width,
    height,
  }
}

function getPlacementParts(placement: TourPlacement): [TourSide, TourAlign] {
  const [side, align = "center"] = placement.split("-")
  return [side as TourSide, align as TourAlign]
}

function getOppositeSide(side: TourSide): TourSide {
  if (side === "top") return "bottom"
  if (side === "bottom") return "top"
  if (side === "left") return "right"
  return "left"
}

function canFit(
  side: TourSide,
  target: TourRect,
  popover: TourSize,
  viewport: TourSize,
  distance: number,
) {
  if (side === "top") return target.top - distance - popover.height >= VIEWPORT_GAP
  if (side === "bottom") {
    return target.bottom + distance + popover.height <= viewport.height - VIEWPORT_GAP
  }
  if (side === "left") return target.left - distance - popover.width >= VIEWPORT_GAP
  return target.right + distance + popover.width <= viewport.width - VIEWPORT_GAP
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(value, Math.max(min, max)))
}

function getPopoverLayout(
  placement: TourPlacement,
  target: TourRect,
  popover: TourSize,
  viewport: TourSize,
  popoverOffset: [number, number],
  arrowOffset: number,
): TourPopoverLayout {
  const [requestedSide, align] = getPlacementParts(placement)
  const [crossOffset = 0, distance = 0] = popoverOffset
  const oppositeSide = getOppositeSide(requestedSide)
  const side =
    !canFit(requestedSide, target, popover, viewport, distance) &&
    canFit(oppositeSide, target, popover, viewport, distance)
      ? oppositeSide
      : requestedSide

  let left = target.left + (target.width - popover.width) / 2
  let top = target.top + (target.height - popover.height) / 2

  if (side === "top" || side === "bottom") {
    if (align === "start") left = target.left
    if (align === "end") left = target.right - popover.width
    left += crossOffset
    top = side === "top" ? target.top - popover.height - distance : target.bottom + distance
  } else {
    if (align === "start") top = target.top
    if (align === "end") top = target.bottom - popover.height
    top += crossOffset
    left = side === "left" ? target.left - popover.width - distance : target.right + distance
  }

  left = clamp(left, VIEWPORT_GAP, viewport.width - popover.width - VIEWPORT_GAP)
  top = clamp(top, VIEWPORT_GAP, viewport.height - popover.height - VIEWPORT_GAP)

  const arrowStyle: CSSProperties = {}
  if (side === "top" || side === "bottom") {
    arrowStyle.left = addUnitPx(
      clamp(
        target.left + target.width / 2 + arrowOffset - left,
        ARROW_GAP,
        popover.width - ARROW_GAP,
      ),
    )
  } else {
    arrowStyle.top = addUnitPx(
      clamp(
        target.top + target.height / 2 + arrowOffset - top,
        ARROW_GAP,
        popover.height - ARROW_GAP,
      ),
    )
  }

  return {
    side,
    style: {
      top: addUnitPx(top),
      left: addUnitPx(left),
    },
    arrowStyle,
  }
}

function getViewportSize(): TourSize {
  const { windowWidth, windowHeight } = getWindowInfo()
  return {
    width: windowWidth || (inBrowser ? window.innerWidth : 0),
    height: windowHeight || (inBrowser ? window.innerHeight : 0),
  }
}

export default function Tour(props: TourProps) {
  const {
    className,
    style: styleProp,
    defaultOpen,
    open: openProp,
    type = "step",
    list = [],
    placement: placementProp,
    mask = true,
    maskWidth,
    maskHeight,
    offset = DEFAULT_MASK_OFFSET,
    title,
    next = "下一步",
    prev = "上一步",
    complete = "完成",
    showPrev = true,
    closeOnOverlayClick = true,
    lock = true,
    children,
    onClick,
    onClose,
    onChange,
    ...restProps
  } = props

  const { value: open = false, setValue: setOpen } = useUncontrolled<boolean>({
    defaultValue: defaultOpen,
    value: openProp,
  })
  const [current, setCurrent] = useState(0)
  const [targetRect, setTargetRect] = useState<TourRect>()
  const [popoverSize, setPopoverSize] = useState<TourSize>()
  const [viewport, setViewport] = useState<TourSize>(getViewportSize)
  const popoverRef = useRef<Element>()
  const measurementIdRef = useRef(0)

  const activeStep = list[current]
  const activePlacement = activeStep?.placement ?? placementProp ?? "bottom"
  const activePopoverOffset = activeStep?.popoverOffset ?? DEFAULT_POPOVER_OFFSET
  const activeArrowOffset = activeStep?.arrowOffset ?? 0

  const highlightRect = useMemo(
    () => targetRect && getHighlightRect(targetRect, maskWidth, maskHeight, offset),
    [maskHeight, maskWidth, offset, targetRect],
  )

  const popoverLayout = useMemo(
    () =>
      highlightRect && popoverSize
        ? getPopoverLayout(
            activePlacement,
            highlightRect,
            popoverSize,
            viewport,
            activePopoverOffset,
            activeArrowOffset,
          )
        : undefined,
    [activeArrowOffset, activePlacement, activePopoverOffset, highlightRect, popoverSize, viewport],
  )

  const updateTargetRect = useCallback(async () => {
    const measurementId = ++measurementIdRef.current
    if (!open || !activeStep) {
      setTargetRect(undefined)
      return
    }

    const rect = await getTargetRect(activeStep.target)
    if (measurementId === measurementIdRef.current) {
      setTargetRect(rect)
    }
  }, [activeStep, open])

  useLockScrollTaro(!!open && !!activeStep && lock)
  usePageScroll(updateTargetRect)

  useEffect(() => {
    if (!open) {
      setCurrent(0)
      measurementIdRef.current++
      setTargetRect(undefined)
      setPopoverSize(undefined)
    }
  }, [open])

  useEffect(() => {
    if (list.length > 0 && current >= list.length) {
      setCurrent(list.length - 1)
    }
  }, [current, list.length])

  useEffect(() => {
    updateTargetRect()
  }, [updateTargetRect])

  // biome-ignore lint/correctness/useExhaustiveDependencies: remeasure when popover content changes
  useEffect(() => {
    if (!open || !highlightRect) {
      setPopoverSize(undefined)
      return
    }

    let disposed = false
    nextTick(async () => {
      const rect = (await getRect(popoverRef)) as Rect
      if (!disposed && rect.width && rect.height) {
        setPopoverSize({ width: rect.width, height: rect.height })
      }
    })

    return () => {
      disposed = true
    }
  }, [children, current, highlightRect, open, title, type])

  useEffect(() => {
    if (!inBrowser) return
    const handleResize = () => {
      setViewport(getViewportSize())
      updateTargetRect()
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [updateTargetRect])

  const handleClose = useCallback(
    (event?: ITouchEvent) => {
      setOpen(false)
      onClose?.(false, event)
    },
    [onClose, setOpen],
  )

  const handleOverlayClick = (event: ITouchEvent) => {
    onClick?.(event)
    if (closeOnOverlayClick) {
      handleClose(event)
    }
  }

  const changeStep = (nextCurrent: number) => {
    if (nextCurrent < 0 || nextCurrent >= list.length) return
    setPopoverSize(undefined)
    setCurrent(nextCurrent)
    onChange?.(nextCurrent)
  }

  if (!open || !activeStep) return null

  const highlightStyle: CSSProperties | undefined = highlightRect
    ? {
        top: addUnitPx(highlightRect.top),
        left: addUnitPx(highlightRect.left),
        width: addUnitPx(highlightRect.width),
        height: addUnitPx(highlightRect.height),
      }
    : undefined

  return (
    <View
      {...restProps}
      className={classNames(prefixClassname("tour"), className)}
      style={styleProp}
      catchMove={lock}
      onTouchMove={lock ? preventDefault : undefined}
    >
      <View
        className={classNames(prefixClassname("tour__overlay"), {
          [prefixClassname("tour__overlay--loading")]: mask && !highlightRect,
        })}
        onClick={handleOverlayClick}
      />
      {highlightRect && (
        <View
          className={classNames(prefixClassname("tour__highlight"), {
            [prefixClassname("tour__highlight--unmasked")]: !mask,
          })}
          style={highlightStyle}
        />
      )}
      <View
        ref={popoverRef}
        className={classNames(prefixClassname("tour__popover"), {
          [prefixClassname("tour__popover--ready")]: popoverLayout,
        })}
        style={popoverLayout?.style}
      >
        <View
          className={classNames(
            prefixClassname("tour__arrow"),
            prefixClassname(`tour__arrow--${popoverLayout?.side ?? "bottom"}`),
          )}
          style={popoverLayout?.arrowStyle}
        />
        {children ?? (
          <View
            className={classNames(prefixClassname("tour__content"), {
              [prefixClassname("tour__content--tile")]: type === "tile",
            })}
          >
            {type === "step" && title && (
              <View className={prefixClassname("tour__header")}>
                <View className={prefixClassname("tour__title")}>{title}</View>
                <View
                  className={prefixClassname("tour__close")}
                  onClick={(event) => handleClose(event)}
                >
                  <Cross />
                </View>
              </View>
            )}
            <View className={prefixClassname("tour__body")}>{activeStep.content}</View>
            {type === "step" && (
              <View className={prefixClassname("tour__footer")}>
                <View className={prefixClassname("tour__counter")}>
                  {current + 1}/{list.length}
                </View>
                <View className={prefixClassname("tour__actions")}>
                  {current > 0 && showPrev && (
                    <View
                      className={classNames(
                        prefixClassname("tour__button"),
                        prefixClassname("tour__button--prev"),
                      )}
                      onClick={() => changeStep(current - 1)}
                    >
                      {prev}
                    </View>
                  )}
                  {current < list.length - 1 ? (
                    <View
                      className={classNames(
                        prefixClassname("tour__button"),
                        prefixClassname("tour__button--primary"),
                      )}
                      onClick={() => changeStep(current + 1)}
                    >
                      {next}
                    </View>
                  ) : (
                    <View
                      className={classNames(
                        prefixClassname("tour__button"),
                        prefixClassname("tour__button--primary"),
                      )}
                      onClick={(event) => handleClose(event)}
                    >
                      {complete}
                    </View>
                  )}
                </View>
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  )
}

Tour.displayName = "Tour"

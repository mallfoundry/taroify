import { ITouchEvent } from "@tarojs/components"
import { useCallback, useEffect, useRef } from "react"

const MIN_DISTANCE = 10

export enum TouchDirection {
  Horizontal = "horizontal",
  Vertical = "vertical",
}

function getDirection(x: number, y: number): TouchDirection | undefined {
  if (x > y && x > MIN_DISTANCE) {
    return TouchDirection.Horizontal
  }
  if (y > x && y > MIN_DISTANCE) {
    return TouchDirection.Vertical
  }
}

function emptyFunction() {}

export interface TouchRef {
  startX: number
  startY: number
  deltaX: number
  deltaY: number
  offsetX: number
  offsetY: number
  isTap: boolean
  direction?: TouchDirection

  isVertical(): boolean

  isHorizontal(): boolean

  start(event: ITouchEvent): void

  move(event: ITouchEvent): void

  reset(): void
}

const TAP_OFFSET = 5

export function useTouch() {
  const touchRef = useRef<TouchRef>({
    startX: 0,
    startY: 0,
    deltaX: 0,
    deltaY: 0,
    offsetX: 0,
    offsetY: 0,
    isTap: true,
    isVertical: () => false,
    isHorizontal: () => false,
    start: emptyFunction,
    move: emptyFunction,
    reset: emptyFunction,
  })

  const isVertical = useCallback(() => touchRef.current.direction === TouchDirection.Vertical, [])

  const isHorizontal = useCallback(
    () => touchRef.current.direction === TouchDirection.Horizontal,
    [],
  )

  const reset = useCallback(function () {
    touchRef.current.deltaX = 0
    touchRef.current.deltaY = 0
    touchRef.current.offsetX = 0
    touchRef.current.offsetY = 0
    touchRef.current.direction = undefined
    touchRef.current.isTap = true
  }, [])

  const start = useCallback(
    function (event: ITouchEvent) {
      reset()
      touchRef.current.startX = event.touches[0].clientX
      touchRef.current.startY = event.touches[0].clientY
    },
    [reset],
  )

  const move = useCallback(function (event: ITouchEvent) {
    const touch = event.touches[0]
    // Fix: Safari back will set clientX to negative number
    touchRef.current.deltaX = touch.clientX < 0 ? 0 : touch.clientX - touchRef.current.startX
    touchRef.current.deltaY = touch.clientY - touchRef.current.startY
    touchRef.current.offsetX = Math.abs(touchRef.current.deltaX)
    touchRef.current.offsetY = Math.abs(touchRef.current.deltaY)

    if (!touchRef.current.direction) {
      touchRef.current.direction = getDirection(touchRef.current.offsetX, touchRef.current.offsetY)
    }

    if (
      touchRef.current.isTap &&
      (touchRef.current.offsetX > TAP_OFFSET || touchRef.current.offsetY > TAP_OFFSET)
    ) {
      touchRef.current.isTap = false
    }
  }, [])

  useEffect(() => {
    if (touchRef.current.isHorizontal !== isHorizontal) {
      touchRef.current.isHorizontal = isHorizontal
    }
  }, [touchRef, isHorizontal])

  useEffect(() => {
    if (touchRef.current.isVertical !== isVertical) {
      touchRef.current.isVertical = isVertical
    }
  }, [touchRef, isVertical])

  useEffect(() => {
    if (touchRef.current.reset !== reset) {
      touchRef.current.reset = reset
    }
  }, [touchRef, reset])

  useEffect(() => {
    if (touchRef.current.start !== start) {
      touchRef.current.start = start
    }
  }, [touchRef, start])

  useEffect(() => {
    if (touchRef.current.move !== move) {
      touchRef.current.move = move
    }
  }, [touchRef, move])

  return touchRef.current
}

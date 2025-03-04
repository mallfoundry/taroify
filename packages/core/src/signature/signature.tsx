import { useRef, useMemo, forwardRef, type ForwardedRef, useImperativeHandle } from "react"
import * as React from "react"
import { getEnv } from "@tarojs/taro"
import { View, Canvas, type CanvasTouchEvent } from "@tarojs/components"
import cls from "classnames"
import { prefixClassname } from "../styles"
import { type Rect, getRect } from "../utils/dom/rect"
import { preventDefault } from "../utils/dom/event"
import { useCanvas } from "../hooks"
import type { SignatureProps, SignatureInstance } from "./signature.shared"

export type { SignatureInstance }

let _canvasIdx = 0
const Signature = forwardRef(function Signature(
  props: SignatureProps,
  ref: ForwardedRef<SignatureInstance>,
): JSX.Element {
  const {
    type = "png",
    lineWidth = 3,
    penColor = "#000",
    backgroundColor,
    className,
    canvasId: canvasIdProp,
    onStart,
    onSigning,
    onEnd,
    ...rest
  } = props
  const wrapRef = useRef<HTMLElement>(null)
  const canvasRectRef = useRef<Rect>()

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const canvasId = useMemo(
    () => (canvasIdProp ? canvasIdProp : `taroify-canvas${_canvasIdx++}`),
    [],
  )
  const [canvas, ctx] = useCanvas(canvasId, wrapRef, {
    async onLoaded(_, _ctx) {
      canvasRectRef.current = await getRect(wrapRef)
      setCanvasBgColor(_ctx)
    },
  })
  const emptyRef = useRef(true)

  const touchStartHandler = async () => {
    if (ctx) {
      ctx.beginPath()
      ctx.lineWidth = lineWidth
      ctx.strokeStyle = penColor
      // recalculate after scrolling
      canvasRectRef.current = await getRect(wrapRef)
      onStart?.()
    }
  }

  const touchMoveHandler = (event: CanvasTouchEvent) => {
    if (ctx) {
      // H5 disable scroll
      preventDefault(event)
      emptyRef.current = false
      const touch = event.touches[0]
      const env = getEnv()
      let mouseX = touch.x
      let mouseY = touch.y
      if (env === "WEB") {
        // @ts-ignore
        mouseX = touch.clientX - (canvasRectRef.current?.left || 0)
        // @ts-ignore
        mouseY = touch.clientY - (canvasRectRef.current?.top || 0)
      }
      ctx.lineCap = "round"
      ctx.lineJoin = "round"
      ctx.lineTo(mouseX, mouseY)
      ctx.stroke()
      onSigning?.()
    }
  }

  const touchEndHandler = (event: CanvasTouchEvent) => {
    if (ctx) {
      event.preventDefault()
      onEnd?.()
    }
  }

  const setCanvasBgColor = (ctxParam: CanvasRenderingContext2D | null | undefined) => {
    if (ctxParam) {
      ctxParam.clearRect(0, 0, canvasRectRef.current?.width!, canvasRectRef.current?.height!)
      if (backgroundColor) {
        ctxParam.fillStyle = backgroundColor
        ctxParam.fillRect(0, 0, canvasRectRef.current?.width!, canvasRectRef.current?.height!)
      }
    }
  }

  const getImage: SignatureInstance["getImage"] = () => {
    if (canvas) {
      return {
        image: emptyRef.current
          ? ""
          : (
              {
                jpg: (): string => canvas.toDataURL("image/jpeg", 0.8),
                jpeg: (): string => canvas.toDataURL("image/jpeg", 0.8),
              }[type] as () => string
            )?.() || canvas.toDataURL(`image/${type}`),
        canvas,
      }
    }
    return {
      image: "",
      canvas: null,
    }
  }

  const clearHandler = () => {
    if (ctx) {
      emptyRef.current = true
      setCanvasBgColor(ctx)
    }
  }

  useImperativeHandle(ref, () => {
    return {
      getImage,
      clear: clearHandler,
    }
  })

  return (
    <View className={cls(prefixClassname("signature"), className)} {...rest}>
      <View className={prefixClassname("signature__content")}>
        <Canvas
          id={canvasId}
          canvasId={canvasId}
          ref={wrapRef}
          disableScroll
          type="2d"
          onTouchStart={touchStartHandler}
          onTouchMove={touchMoveHandler}
          onTouchEnd={touchEndHandler}
        />
      </View>
    </View>
  )
})

export default Signature

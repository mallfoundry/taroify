import {
  useEffect,
  useRef,
  useState,
  useMemo,
  forwardRef,
  ForwardedRef,
  useImperativeHandle,
} from "react"
import * as React from "react"
import { getWindowInfo, nextTick, createSelectorQuery, getEnv } from "@tarojs/taro"
import { View, Canvas, CanvasTouchEvent } from "@tarojs/components"
import cls from "classnames"
import { prefixClassname } from "../styles"
import { Rect, getRect } from "../utils/dom/rect"
import { preventDefault } from "../utils/dom/event"
import { SignatureProps, SignatureInstance } from "./signature.shared"

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
    canvasId: _canvasId,
    onStart, onSigning, onEnd, ...rest
  } = props
  const wrapRef = useRef<HTMLElement>(null)
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null | undefined>(null)
  const canvasRectRef = useRef<Rect>()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const canvasId = useMemo(() => _canvasId ? _canvasId : `taroify-canvas${_canvasIdx++}`, [])
  const ratio = useMemo(() => getWindowInfo().pixelRatio || 1, [])
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
      const touch = event.touches[0];
      const env = getEnv()
      let mouseX = touch.x
      let mouseY = touch.y
      if (env === "WEB") {
        // @ts-ignore
        mouseX = (touch.clientX - (canvasRectRef.current?.left || 0));
        // @ts-ignore
        mouseY = (touch.clientY - (canvasRectRef.current?.top || 0));
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
          canvas
      }
    }
    return {
      image: "",
      canvas: null
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
  useEffect(() => {
    const env = getEnv()
    let retry = 0
    const init = () => {
      if (env === "WEB") {
        setCanvasData((wrapRef.current?.children as unknown as HTMLCanvasElement[] || [])[0])
      } else {
        nextTick(() => {
          createSelectorQuery()
            .select(`#${canvasId}`)
            .fields({ node: true, size: true })
            .exec((res) => {
              setCanvasData(res[0]?.node)
            })
        })
      }
    }

    const setCanvasData = async (_canvas: HTMLCanvasElement) => {
      if (_canvas) {
        canvasRectRef.current = await getRect(wrapRef)
        _canvas.width = Math.floor((canvasRectRef.current.width || _canvas.width) * ratio)
        _canvas.height = Math.floor((canvasRectRef.current.height || _canvas.height) * ratio)
      }
      const _ctx = _canvas?.getContext("2d");
      if (_ctx) {
        _ctx.scale(ratio, ratio)
        setCanvas(_canvas)
        setCtx(_ctx)
        nextTick(() => {
          setCanvasBgColor(_ctx)
        })
      } else {
        setTimeout(() => {
          if (retry++ < 5) {
            init()
            // eslint-disable-next-line
            console.log('[Taroify] Signature: init again')
          } else {
            // eslint-disable-next-line
            console.error('[Taroify] Signature: init fail')
          }
        }, 100 * (2 ** retry))
      }
    }

    init()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
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

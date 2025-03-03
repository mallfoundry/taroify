import { useEffect, useState, useMemo, type RefObject } from "react"
import { getEnv, nextTick, createSelectorQuery, getSystemInfoSync } from "@tarojs/taro"
import { getRect } from "../utils/dom/rect"
import useMemoizedFn from "./use-memoized-fn"

type UseCanvasOptions = {
  onLoaded?: (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => void
}

function useCanvas(canvasId: string, canvasRef: RefObject<any>, options: UseCanvasOptions = {}) {
  const [loaded, setLoaded] = useState(false)
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const ratio = useMemo(() => getSystemInfoSync().pixelRatio || 1, [])
  const { onLoaded: onLoadedProp } = options
  const onLoaded = useMemoizedFn((a: HTMLCanvasElement, b: CanvasRenderingContext2D) =>
    onLoadedProp?.(a, b),
  )

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const env = getEnv()
    let retry = 0
    const setData = async (_canvas: HTMLCanvasElement | null) => {
      if (_canvas) {
        const canvasRectRef = await getRect(canvasRef)
        _canvas.width = Math.floor((canvasRectRef.width || _canvas.width) * ratio)
        _canvas.height = Math.floor((canvasRectRef.height || _canvas.height) * ratio)
      }
      const _ctx = _canvas?.getContext("2d")
      if (_ctx) {
        _ctx.scale(ratio, ratio)
        setCanvas(_canvas)
        setCtx(_ctx)
        setLoaded(true)
        onLoaded(_canvas!, _ctx)
      } else {
        setTimeout(
          () => {
            if (retry++ < 5) {
              init()
              console.log("[Taroify] canvas: init again")
            } else {
              console.error("[Taroify] canvas: init fail")
            }
          },
          100 * 2 ** retry,
        )
      }
    }

    const init = () => {
      if (env === "WEB") {
        setData(((canvasRef.current?.children as unknown as HTMLCanvasElement[]) || [])[0])
      } else {
        nextTick(() => {
          createSelectorQuery()
            .select(`#${canvasId}`)
            .fields({ node: true })
            .exec((res) => {
              setData(res[0]?.node)
            })
        })
      }
    }

    init()
  }, [canvasId, canvasRef])
  return [canvas, ctx, loaded] as const
}

export default useCanvas

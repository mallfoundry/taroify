import { Canvas } from "@tarojs/components"
import { TaroElement } from "@tarojs/runtime"
import { CanvasContext, createCanvasContext, getSystemInfoSync } from "@tarojs/taro"
import * as _ from "lodash"
import * as React from "react"
import { MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useMounted, useUniqueId } from "../hooks"
import { BLUE, WHITE } from "../styles/variables"
import { queryNodesRef } from "../utils/dom/element"
import { addUnitPx } from "../utils/format/unit"
import { canIUseCanvas2d } from "../utils/version"
import { canvasContextAdaptor } from "./canvas"
import { useAnimatePercent } from "./circle.hooks"
import { CircleProps } from "./circle.shared"

function clampFormat(rate: number) {
  return _.clamp(rate, 0, 100)
}

const PERIMETER = 2 * Math.PI

const BEGIN_ANGLE = -Math.PI / 2

function useCanvasContext(canvasRef: MutableRefObject<TaroElement | undefined>, size: number) {
  const [canvasContext, setCanvasContext] = useState<CanvasContext>()
  useMounted(() => {
    if (!canIUseCanvas2d()) {
      if (canvasRef.current) {
        setCanvasContext(createCanvasContext(canvasRef.current.id))
      }
    } else {
      if (canvasRef.current) {
        queryNodesRef(canvasRef.current)
          .fields(
            {
              node: true,
            },
            ({ node: canvas }) => {
              const { pixelRatio: dpr } = getSystemInfoSync()
              canvas.width = size * dpr
              canvas.height = size * dpr
              const newCanvasContext = canvasContextAdaptor(canvas.getContext("2d"))
              newCanvasContext.scale(dpr, dpr)
              setCanvasContext(newCanvasContext)
            },
          )
          .exec()
      }
    }
  })

  return canvasContext
}

function CircleCanvas(props: CircleProps) {
  const {
    percent: percentProp = 0,
    speed = 0,
    color = BLUE,
    layerColor = WHITE,
    fill,
    clockwise,
    strokeWidth: strokeWidthProp = 0,
    strokeLinecap,
    size = 100,
    onChange,
  } = props

  const canvasId = useUniqueId()
  const canvasRef = useRef<TaroElement>()

  const strokeWidth = useMemo(() => strokeWidthProp / 10, [strokeWidthProp])

  const percent = useAnimatePercent(percentProp, speed)
  const canvasContext = useCanvasContext(canvasRef, size)
  const [hoverColor, setHoverColor] = useState<any>()

  const presetCanvas = useCallback(
    (
      context: Record<string, any>,
      strokeStyle: any,
      beginAngle: any,
      endAngle: any,
      fill?: any,
    ) => {
      const position = size / 2
      const radius = position - strokeWidth / 2

      context.setStrokeStyle(strokeStyle)
      context.setLineWidth(strokeWidth)
      context.setLineCap(strokeLinecap)

      context.beginPath()
      context.arc(position, position, radius, beginAngle, endAngle, !clockwise)
      context.stroke()

      if (fill) {
        context.setFillStyle(fill)
        context.fill()
      }
    },
    [clockwise, size, strokeLinecap, strokeWidth],
  )

  const renderLayerCircle = useCallback(
    (context: Record<string, any>) => {
      presetCanvas(context, layerColor, 0, PERIMETER, fill)
    },
    [fill, layerColor, presetCanvas],
  )

  const renderHoverCircle = useCallback(
    (context: Record<string, any>, formatValue: number) => {
      // 结束角度
      const progress = PERIMETER * (formatValue / 100)
      const endAngle = clockwise ? BEGIN_ANGLE + progress : 3 * Math.PI - (BEGIN_ANGLE + progress)
      presetCanvas(context, hoverColor, BEGIN_ANGLE, endAngle)
    },
    [clockwise, hoverColor, presetCanvas],
  )

  const drawCircle = useCallback(
    (currentValue: number) => {
      if (canvasContext) {
        canvasContext.clearRect(0, 0, size, size)
        renderLayerCircle(canvasContext)

        const formatValue = clampFormat(currentValue)
        if (formatValue !== 0) {
          renderHoverCircle(canvasContext, formatValue)
        }

        canvasContext.draw()
      }
    },
    [canvasContext, renderHoverCircle, renderLayerCircle, size],
  )

  useEffect(() => drawCircle(percent), [drawCircle, percent])

  useEffect(
    () => onChange?.(percent),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [percent],
  )

  useEffect(() => {
    if (_.isObject(color)) {
      const LinearColor = canvasContext?.createLinearGradient(size, 0, 0, 0)
      if (LinearColor) {
        Object.keys(color)
          .sort((a, b) => parseFloat(a) - parseFloat(b))
          .forEach((key) =>
            // @ts-ignore
            LinearColor.addColorStop(parseFloat(key) / 100, color[key]),
          )
        setHoverColor(LinearColor)
      }
    } else {
      setHoverColor(color)
    }
  }, [canvasContext, color, size])

  return (
    <Canvas
      ref={canvasRef}
      id={canvasId}
      canvasId={canvasId}
      type="2d"
      style={{
        width: addUnitPx(size),
        height: addUnitPx(size),
      }}
    />
  )
}

export default CircleCanvas

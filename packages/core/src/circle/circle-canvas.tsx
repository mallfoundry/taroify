import { Canvas } from "@tarojs/components"
import { CanvasContext, createCanvasContext, getSystemInfoSync } from "@tarojs/taro"
import * as _ from "lodash"
import * as React from "react"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useRenderedEffect, useUniqueId } from "../hooks"
import { BLUE, WHITE } from "../styles/variables"
import { createNodesRef } from "../utils/dom/element"
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

function useCanvasContext(canvasId: string | undefined, size: number) {
  const [canvasContext, setCanvasContext] = useState<CanvasContext>()

  useRenderedEffect(() => {
    if (!canIUseCanvas2d()) {
      if (canvasId) {
        setCanvasContext(createCanvasContext(canvasId))
      }
    } else {
      if (canvasId) {
        createNodesRef(canvasId)
          .fields(
            {
              node: true,
            },
            ({ node: canvas }) => {
              const { pixelRatio: dpr } = getSystemInfoSync()
              canvas.width = size * dpr
              canvas.height = size * dpr
              const canvasContext = canvasContextAdaptor(canvas.getContext("2d"))
              canvasContext.scale(dpr, dpr)
              setCanvasContext(canvasContext)
            },
          )
          .exec()
      }
    }
  }, [canvasId])

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

  const strokeWidth = useMemo(() => strokeWidthProp / 10, [strokeWidthProp])

  const percent = useAnimatePercent(percentProp, speed)
  const canvasContext = useCanvasContext(canvasId, size)
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

  useEffect(() => drawCircle(percent), [canvasContext, percent, hoverColor, drawCircle])

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

import { Canvas } from "@tarojs/components"
import { getSystemInfoSync, useReady } from "@tarojs/taro"
import * as _ from "lodash"
import * as React from "react"
import { MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { BLUE, WHITE } from "../styles/variables"
import { createNodesRef, TaroElement } from "../utils/dom/element"
import { addUnitPx } from "../utils/format/unit"
import { canvasContextAdaptor } from "./canvas"
import { useAnimatePercent } from "./circle.hooks"
import { CircleProps } from "./circle.shared"

function format(rate: number) {
  return Math.min(Math.max(rate, 0), 100)
}

const PERIMETER = 2 * Math.PI

const BEGIN_ANGLE = -Math.PI / 2

function useCanvasNode(canvasRef: MutableRefObject<TaroElement | undefined>) {
  const [node, setNode] = useState<Record<string, any>>()
  useReady(() => {
    if (canvasRef.current) {
      createNodesRef(canvasRef.current)
        .node(({ node: canvas }) => setNode(canvas))
        .exec()
    }
  })

  return node
}

function getCanvasContext(node?: Record<string, any>) {
  if (node) {
    return canvasContextAdaptor(node.getContext("2d"))
  }
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

  const strokeWidth = useMemo(() => strokeWidthProp / 10, [strokeWidthProp])

  const percent = useAnimatePercent(percentProp, speed)
  const canvasRef = useRef<TaroElement>()
  const canvasNode = useCanvasNode(canvasRef)
  const canvasContext = getCanvasContext(canvasNode)
  const [hoverColor, setHoverColor] = useState<any>()

  useEffect(() => onChange?.(percent), [onChange, percent])

  useEffect(() => {
    if (canvasContext && canvasNode) {
      const { pixelRatio: dpr } = getSystemInfoSync()
      canvasNode.width = size * dpr
      canvasNode.height = size * dpr
      canvasContext.scale(dpr, dpr)
    }
  }, [canvasContext, canvasNode, size])

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

        const formatValue = format(currentValue)
        if (formatValue !== 0) {
          renderHoverCircle(canvasContext, formatValue)
        }

        canvasContext.draw()
      }
    },
    [canvasContext, renderHoverCircle, renderLayerCircle, size],
  )

  useEffect(() => drawCircle(percent), [canvasContext, percent, hoverColor, drawCircle])

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
    <>
      <Canvas
        ref={canvasRef}
        type="2d"
        style={{
          width: addUnitPx(size),
          height: addUnitPx(size),
        }}
      />
    </>
  )
}

export default CircleCanvas

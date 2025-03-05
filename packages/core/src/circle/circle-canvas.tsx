import { Canvas } from "@tarojs/components"
import type { TaroElement } from "@tarojs/runtime"
import * as _ from "lodash"
import * as React from "react"
import { useEffect, useMemo, useRef } from "react"
import { useCanvas, useUniqueId } from "../hooks"
import { BLUE, WHITE } from "../styles/variables"
import { addUnitPx } from "../utils/format/unit"
import { useAnimatePercent } from "./circle.hooks"
import type { CircleProps } from "./circle.shared"

function clampFormat(rate: number) {
  return _.clamp(rate, 0, 100)
}

const PERIMETER = 2 * Math.PI

const BEGIN_ANGLE_MAP = {
  top: 1.5 * Math.PI,
  right: 0,
  bottom: 0.5 * Math.PI,
  left: Math.PI,
}

function CircleCanvas(props: CircleProps) {
  const {
    percent: percentProp = 0,
    speed = 100,
    color = BLUE,
    layerColor = WHITE,
    fill,
    clockwise = true,
    strokeWidth: strokeWidthProp = 40,
    strokeLinecap = "round",
    size = 100,
    startPosition = "top",
    onChange,
  } = props

  const canvasId = useUniqueId()
  const canvasRef = useRef<TaroElement>()
  const [__, canvasContext] = useCanvas(canvasId, canvasRef)

  const strokeWidth = useMemo(() => strokeWidthProp / 10, [strokeWidthProp])

  const percent = useAnimatePercent(percentProp, speed)
  const hoverColor = useMemo(() => {
    if (_.isObject(color) && canvasContext) {
      const LinearColor = canvasContext.createLinearGradient(size, 0, 0, 0)
      if (LinearColor) {
        // biome-ignore lint/complexity/noForEach: <explanation>
        Object.keys(color)
          .sort((a, b) => Number.parseFloat(a) - Number.parseFloat(b))
          .forEach((key) => LinearColor.addColorStop(Number.parseFloat(key) / 100, color[key]))
        return LinearColor
      }
    } else {
      return color as string
    }
  }, [canvasContext, color, size])

  useEffect(() => {
    if (canvasContext) {
      canvasContext.clearRect(0, 0, size, size)
      const position = size / 2
      const radius = position - strokeWidth / 2

      canvasContext.lineWidth = strokeWidth
      canvasContext.lineCap = strokeLinecap

      canvasContext.strokeStyle = layerColor
      canvasContext.beginPath()
      canvasContext.arc(position, position, radius, 0, PERIMETER, !clockwise)
      canvasContext.stroke()

      const formatValue = clampFormat(percent)
      if (formatValue !== 0) {
        const progressAngle = PERIMETER * (formatValue / 100)
        const beginAngle = BEGIN_ANGLE_MAP[startPosition]
        const endAngle = clockwise
          ? beginAngle + progressAngle
          : beginAngle - progressAngle + 2 * Math.PI
        canvasContext.strokeStyle = hoverColor!
        canvasContext.beginPath()
        canvasContext.arc(
          position,
          position,
          radius,
          beginAngle,
          beginAngle === endAngle ? endAngle + 0.0001 : endAngle,
          !clockwise,
        )
        canvasContext.stroke()
      }

      if (fill) {
        canvasContext.fillStyle = fill
        canvasContext.fill()
      }
    }
  }, [
    canvasContext,
    clockwise,
    fill,
    hoverColor,
    layerColor,
    percent,
    size,
    startPosition,
    strokeLinecap,
    strokeWidth,
  ])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => onChange?.(percent), [percent])

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

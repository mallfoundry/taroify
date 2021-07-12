import * as _ from "lodash"
import * as React from "react"
import { CSSProperties, useCallback, useEffect, useMemo } from "react"
import { prefixClassname } from "../styles"
import { useAnimatePercent } from "./circle.hooks"
import { CircleProps } from "./circle.shared"

let uid = 0

function getPath(clockwise: boolean, viewBoxSize: number) {
  const sweepFlag = clockwise ? 1 : 0
  return `M ${viewBoxSize / 2} ${
    viewBoxSize / 2
  } m 0, -500 a 500, 500 0 1, ${sweepFlag} 0, 1000 a 500, 500 0 1, ${sweepFlag} 0, -1000`
}

function CircleCanvasH5(props: CircleProps) {
  const {
    percent: percentProp = 0,
    speed = 0,
    color,
    layerColor,
    fill = "none",
    clockwise = true,
    strokeWidth = 0,
    strokeLinecap,
    onChange,
  } = props

  const percent = useAnimatePercent(percentProp, speed)

  useEffect(() => onChange?.(percent), [onChange, percent])

  const id = useMemo(() => prefixClassname(`circle-${uid++}`), [])

  const viewBoxSize = useMemo(() => +strokeWidth + 1000, [strokeWidth])

  const path = useMemo(() => getPath(clockwise, viewBoxSize), [clockwise, viewBoxSize])

  const renderHover = useCallback(() => {
    const PERIMETER = 3140
    const offset = (PERIMETER * percent) / 100
    const stroke = _.isObject(color) ? `url(#${id})` : color
    const style: CSSProperties = {
      stroke,
      strokeWidth: `${+strokeWidth + 1}px`,
      // @ts-ignore
      strokeLinecap: strokeLinecap,
      strokeDasharray: `${offset}px ${PERIMETER}px`,
    }

    return (
      <path d={path} style={style} className={prefixClassname("circle__hover")} stroke={stroke} />
    )
  }, [percent, color, id, strokeWidth, strokeLinecap, path])

  const renderLayer = useCallback(() => {
    const style = {
      fill: fill,
      stroke: layerColor,
      strokeWidth: `${strokeWidth}px`,
    }

    return <path className={prefixClassname("circle__layer")} style={style} d={path} />
  }, [fill, layerColor, path, strokeWidth])

  const renderGradient = useCallback(() => {
    if (!_.isObject(color)) {
      return
    }

    const Stops = Object.keys(color)
      .sort((a, b) => parseFloat(a) - parseFloat(b))
      .map((key, index) => (
        <stop
          key={index}
          offset={key}
          stopColor={
            // @ts-ignore
            color[key]
          }
        />
      ))

    return (
      <defs>
        <linearGradient id={id} x1="100%" y1="0%" x2="0%" y2="0%">
          {Stops}
        </linearGradient>
      </defs>
    )
  }, [color, id])

  return (
    <svg viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}>
      {renderGradient()}
      {renderLayer()}
      {renderHover()}
    </svg>
  )
}

export default CircleCanvasH5

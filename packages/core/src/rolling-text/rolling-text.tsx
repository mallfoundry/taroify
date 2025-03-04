import * as React from "react"
import { useMemo, useState, useEffect, forwardRef, useImperativeHandle } from "react"
import { View } from "@tarojs/components"
import type { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import RollingTextItem from "./rolling-text-item"
import { prefixClassname } from "../styles"
import type { RollingTextDirection, RollingTextStopOrder } from "./rolling-text.shared"
import { padZero } from "../utils/format/number"

const CIRCLE_NUM = 2

export interface RollingTextProps extends ViewProps {
  startNum?: number
  targetNum?: number
  textList?: string[]
  duration?: number
  autoStart?: boolean
  direction?: RollingTextDirection
  stopOrder?: RollingTextStopOrder
  height?: number
}

export interface RollingTextRef {
  start: () => void
  reset: () => void
}

const RollingText = forwardRef<any, RollingTextProps>((props, ref) => {
  const {
    className,
    startNum = 0,
    targetNum,
    textList = [],
    duration = 2,
    autoStart = true,
    direction = "down",
    stopOrder = "ltr",
    height = 40,
  } = props

  const [rolling, setRolling] = useState(autoStart)

  const isCustomType = useMemo(() => Array.isArray(textList) && textList.length, [textList])

  const itemLength = useMemo(() => {
    if (isCustomType) return textList[0].length
    return `${Math.max(startNum, targetNum!)}`.length
  }, [isCustomType, textList, startNum, targetNum])

  const startNumArr = useMemo(() => padZero(startNum, itemLength).split(""), [startNum, itemLength])

  const targetNumArr = useMemo(() => {
    if (isCustomType) return new Array(itemLength).fill("")
    return padZero(targetNum!, itemLength).split("")
  }, [isCustomType, itemLength, targetNum])

  const getTextArrByIdx = (idx: number) => {
    const result: string[] = []
    for (let i = 0; i < textList.length; i++) {
      result.push(textList[i][idx])
    }
    return result
  }

  const getFigureArr = (i: number) => {
    const start = +startNumArr[i]
    const target = +targetNumArr[i]
    const result: number[] = []
    for (let i = start; i <= 9; i++) {
      result.push(i)
    }
    for (let i = 0; i <= CIRCLE_NUM; i++) {
      for (let j = 0; j <= 9; j++) {
        result.push(j)
      }
    }
    for (let i = 0; i <= target; i++) {
      result.push(i)
    }
    return result
  }

  const getDelay = (i: number, len: number) => {
    if (stopOrder === "ltr") return 0.2 * i
    return 0.2 * (len - 1 - i)
  }

  const start = () => {
    setRolling(true)
  }

  const reset = () => {
    setRolling(false)

    if (autoStart) {
      start()
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (autoStart) {
      start()
    }
  }, [autoStart])

  useImperativeHandle(ref, () => {
    return {
      start() {
        start()
      },
      reset() {
        reset()
      },
    }
  })

  return (
    <View className={classNames(prefixClassname("rolling-text"), className)}>
      {targetNumArr.map((_, i) => (
        <RollingTextItem
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          key={i}
          figureArr={isCustomType ? getTextArrByIdx(i) : getFigureArr(i)}
          duration={duration}
          direction={direction}
          isStart={rolling}
          height={height}
          delay={getDelay(i, itemLength)}
        />
      ))}
    </View>
  )
})

export default RollingText

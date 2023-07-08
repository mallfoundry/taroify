import * as React from "react"
import {FC, useMemo} from "react"
import {View} from "@tarojs/components"
import classNames from "classnames";
import {prefixClassname} from "../styles";
import {RollingTextDirection} from './rolling-text.shared'
import {addUnitPx} from "../utils/format/unit"

export interface RollingTextItemProps {
  figureArr: string[] | number[]
  delay: number
  duration: number
  isStart: boolean
  direction: RollingTextDirection
  height: number
}

const RollingTextItem: FC<RollingTextItemProps> = (props) => {
  const {
    figureArr = [],
    delay,
    duration = 2,
    isStart,
    direction = 'down',
    height = 40,
  } = props

  const newFigureArr = useMemo(() =>
      direction === 'down'
        ? figureArr.slice().reverse()
        : figureArr
    , [direction, figureArr])

  const translatePx = useMemo(() => {
    const totalHeight = height * (figureArr.length - 1)
    return `-${totalHeight}px`
  }, [height, figureArr])

  const itemStyle = useMemo(() => ({
    lineHeight: addUnitPx(height),
  }), [height])

  const rootStyle = useMemo(() => ({
    height: addUnitPx(height),
    '--rolling-text-translate': translatePx,
    '--rolling-text-duration': duration + 's',
    '--rolling-text-delay': delay + 's',
  }), [height, translatePx, duration, delay])

  return (
    <View
      className={
        classNames(
          prefixClassname('rolling-text-item'),
          prefixClassname(`rolling-text-item--${direction}`)
        )
      }
      style={rootStyle}
    >
      <View
        className={classNames(prefixClassname('rolling-text-item__box'), {
          animate: isStart
        })}
      >
        {Array.isArray(newFigureArr) && newFigureArr.map((v, i) => (
          <View className={classNames(prefixClassname('rolling-text-item__item'))} style={itemStyle} key={i}>
            {v}
          </View>
        ))}
      </View>
    </View>
  )
}

export default RollingTextItem

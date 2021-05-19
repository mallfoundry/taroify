import { View } from "@tarojs/components"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { CSSProperties, useMemo } from "react"
import { prefixClassname } from "../styles"
import { addUnit } from "../utils/format/unit"

const SpinIcon = _.range(0, 12).map((key) => (
  <View key={key} className={prefixClassname("loading__spinner__item")} />
))

function LoadingSpinner(props: LoadingProps) {
  const { size } = props
  const rootStyle = useMemo(() => {
    const style: CSSProperties = {}
    style.width = addUnit(size) ?? ""
    style.height = addUnit(size) ?? ""
    return style
  }, [size])
  return (
    <View className={prefixClassname("loading__spinner")} style={rootStyle}>
      {SpinIcon}
    </View>
  )
}

function LoadingCircular(props: LoadingProps) {
  const { size } = props
  const rootStyle = useMemo(() => {
    const style: CSSProperties = {}
    style.width = addUnit(size) ?? ""
    style.height = addUnit(size) ?? ""
    return style
  }, [size])
  return (
    <View className={prefixClassname("loading__circular")} style={rootStyle}>
      <View className={prefixClassname("loading__circular__item")} />
      <View className={prefixClassname("loading__circular__item")} />
      <View className={prefixClassname("loading__circular__item")} />
    </View>
  )
}

export enum LoadingType {
  Circular = "circular",
  Spinner = "spinner",
}

type LoadingTypeString = "circular" | "spinner"

interface LoadingProps {
  type?: LoadingType | LoadingTypeString
  color?: string
  size?: string | number
}

export default function Loading(props: LoadingProps) {
  const { type = LoadingType.Circular, color, size } = props

  const rootStyle = useMemo(() => {
    const style: CSSProperties = {}
    style.color = color ?? ""
    return style
  }, [color])

  return (
    <View
      className={classNames(prefixClassname("loading"), {
        [prefixClassname("loading--spinner")]: type === LoadingType.Spinner,
        [prefixClassname("loading--circular")]: type === LoadingType.Circular,
      })}
      style={rootStyle}
    >
      {type === LoadingType.Spinner && <LoadingSpinner size={size} />}
      {type === LoadingType.Circular && <LoadingCircular size={size} />}
    </View>
  )
}

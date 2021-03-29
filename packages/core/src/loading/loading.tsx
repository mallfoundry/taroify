import { View } from "@tarojs/components"
import * as _ from "lodash"
import * as React from "react"
import { prefixClassname } from "../styles"

const SpinIcon = _.range(0, 12)
  .map(key => (
    <View key={key} className={prefixClassname("loading-spinner-item")} />
  ))

function LoadingSpinner() {
  return (
    <View className="vant-loading-spinner">
      {SpinIcon}
    </View>
  )
}

function LoadingCircular() {
  return (
    <View className={prefixClassname("loading-circular")}>
      <View className={prefixClassname("loading-circular-item")} />
      <View className={prefixClassname("loading-circular-item")} />
      <View className={prefixClassname("loading-circular-item")} />
    </View>
  )
}

export enum LoadingType {
  Circular = "circular",
  Spinner = "spinner"
}

type LoadingTypeString = "circular" | "spinner"

interface LoadingProps {
  type?: LoadingType | LoadingTypeString
  color?: string
}

export default function Loading(props: LoadingProps) {
  const { type = LoadingType.Circular } = props

  return (
    <View className={prefixClassname("loading")}>
      {type === LoadingType.Spinner && <LoadingSpinner />}
      {type === LoadingType.Circular && <LoadingCircular />}
    </View>
  )
}

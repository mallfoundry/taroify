import { View } from "@tarojs/components"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { prefixClassname } from "../styles"

const SpinIcon = _.range(0, 12).map((key) => (
  <View key={key} className={prefixClassname("loading__spinner__item")} />
))

function LoadingSpinner() {
  return <View className={prefixClassname("loading__spinner")}>{SpinIcon}</View>
}

function LoadingCircular() {
  return (
    <View className={prefixClassname("loading__circular")}>
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
  const { type = LoadingType.Circular } = props

  return (
    <View
      className={classNames(prefixClassname("loading"), {
        [prefixClassname("loading--spinner")]: type === LoadingType.Spinner,
        [prefixClassname("loading--circular")]: type === LoadingType.Circular,
      })}
    >
      {type === LoadingType.Spinner && <LoadingSpinner />}
      {type === LoadingType.Circular && <LoadingCircular />}
    </View>
  )
}

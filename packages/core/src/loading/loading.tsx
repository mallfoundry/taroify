import { View } from "@tarojs/components"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { ReactNode, useMemo } from "react"
import { prefixClassname } from "../styles"
import { addUnitPx } from "../utils/format/unit"

const SpinIcon = _.range(0, 12).map((key) => (
  <View key={key} className={prefixClassname("loading__spinner__item")} />
))

function LoadingSpinner(props: LoadingProps) {
  const { size } = props
  const rootStyle = useMemo(
    () => ({
      width: addUnitPx(size) ?? "",
      height: addUnitPx(size) ?? "",
    }),
    [size],
  )
  return (
    <View className={prefixClassname("loading__spinner")} style={rootStyle}>
      {SpinIcon}
    </View>
  )
}

function LoadingCircular(props: LoadingProps) {
  const { size } = props
  const rootStyle = useMemo(
    () => ({
      width: addUnitPx(size) ?? "",
      height: addUnitPx(size) ?? "",
    }),
    [size],
  )
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

export type LoadingTypeString = "circular" | "spinner"

export enum LoadingDirection {
  Horizontal = "horizontal",
  Vertical = "vertical",
}

type LoadingDirectionString = "horizontal" | "vertical"

interface LoadingProps {
  className?: string
  color?: string
  textColor?: string
  size?: number | string
  type?: LoadingType | LoadingTypeString
  direction?: LoadingDirection | LoadingDirectionString
  children?: ReactNode
}

export default function Loading(props: LoadingProps) {
  const {
    className,
    color,
    textColor,
    size,
    type = LoadingType.Circular,
    direction = LoadingDirection.Horizontal,
    children,
  } = props

  return (
    <View
      className={classNames(
        prefixClassname("loading"),
        prefixClassname(`loading--${direction}`),
        prefixClassname(`loading--${type}`),
        className,
      )}
      style={{
        color: color ?? "",
      }}
    >
      {type === LoadingType.Spinner && <LoadingSpinner size={size} />}
      {type === LoadingType.Circular && <LoadingCircular size={size} />}
      {children && (
        <View
          className={prefixClassname("loading__text")}
          style={{
            color: textColor ?? "",
          }}
          children={children}
        />
      )}
    </View>
  )
}

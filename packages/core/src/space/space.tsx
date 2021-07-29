import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"

interface SpaceItemProps {
  children?: ReactNode
}

function SpaceItem(props: SpaceItemProps) {
  const { children } = props

  return <View className={classNames(prefixClassname("space-item"))}>{children}</View>
}

export enum SpaceDirection {
  Horizontal = "horizontal",
  Vertical = "vertical",
}

type SpaceDirectionString = "horizontal" | "vertical"

export enum SpaceSize {
  Small = "small",
  Medium = "medium",
  Large = "large",
}

type SpaceSizeString = "small" | "medium" | "large"

interface SpaceProps {
  direction?: SpaceDirection | SpaceDirectionString
  size?: SpaceSize | SpaceSizeString | number
  children?: ReactNode
}

export default function Space(props: SpaceProps) {
  const { direction = SpaceDirection.Horizontal, children } = props
  return (
    <View
      className={classNames(prefixClassname("space"), {
        [prefixClassname(`space--${direction}`)]:
          direction === SpaceDirection.Horizontal || direction === SpaceDirection.Vertical,
      })}
      style={{ gap: "8px" }}
    >
      {React.Children.map(children, (item, index) => (
        <SpaceItem key={index} children={item} />
      ))}
    </View>
  )
}

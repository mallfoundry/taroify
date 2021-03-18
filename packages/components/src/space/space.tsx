import { View } from "@tarojs/components"
import * as React from "react"
import { ReactNode } from "react"
import classNames from "classnames"
import { prefixClassname } from "../styles"

interface SpaceItemProps {
  children?: ReactNode
}

function SpaceItem(props: SpaceItemProps) {
  const { children } = props

  return (
    <View className={classNames(prefixClassname("space-item"))}>
      {children}
    </View>
  )
}

interface SpaceProps {
  children?: ReactNode
}

export default function Space(props: SpaceProps) {
  const { children } = props
  return (
    <View className={classNames(prefixClassname("space"))}>
      {React.Children.map(children, (item, index) => <SpaceItem key={index} children={item} />)}
    </View>
  )
}

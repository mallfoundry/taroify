import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import { demoPrefixClassname } from "../styles/prefix"
import "./block.scss"

interface BlockProps {
  className?: string
  title?: ReactNode
  children?: ReactNode
}

export default function Block(props: BlockProps) {
  const { className, title, children } = props
  return (
    <View className={classNames(demoPrefixClassname("block"), className)}>
      {title && <View className={demoPrefixClassname("block__title")} children={title} />}
      <View className={demoPrefixClassname("block__content")}>{children}</View>
    </View>
  )
}

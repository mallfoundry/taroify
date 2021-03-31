import * as React from "react"
import { ReactNode } from "react"
import { View } from "@tarojs/components"
import classes from "./block.module.scss"
import classNames from "classnames"

interface BlockProps {
  className?: string
  title?: ReactNode
  children?: ReactNode
}

export default function Block(props: BlockProps) {
  const { className, title, children } = props
  return (
    <View className={classNames(classes.Block, className)}>
      <View className={classes.BlockTitle} children={title} />
      <View children={children} />
    </View>
  )
}

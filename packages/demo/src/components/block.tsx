import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import classes from "./block.module.scss"

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

import { ReactNode } from "react"
import { View } from "@tarojs/components"

import classes from "./block.module.scss"

interface DemoBlockProps {
  title?: ReactNode
  children?: ReactNode
}

export default function Block(props: DemoBlockProps) {
  const { title, children } = props
  const whitespace = 1
  const wingblank = 1
  console.log(whitespace, wingblank)
  return (
    <View className={classes.Block}>
      <View className={classes.BlockTitle} children={title} />
      <View children={children} />
    </View>
  )
}

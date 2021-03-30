import { ReactNode } from "react"
import { View } from "@tarojs/components"
import classes from "./block.module.scss"

interface BlockProps {
  title?: ReactNode
  children?: ReactNode
}

export default function Block(props: BlockProps) {
  const { title, children } = props
  return (
    <View className={classes.Block}>
      <View className={classes.BlockTitle} children={title} />
      <View children={children} />
    </View>
  )
}

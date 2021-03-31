import * as React from "react"
import { ReactNode } from "react"
import { Navigator, View } from "@tarojs/components"
import ArrowRight from "@taroify/icons/ArrowRight"
import classes from "./nav.module.scss"

interface NavBlockProps {
  title?: ReactNode
  href?: string
}

export function NavBlock(props: NavBlockProps) {
  const { title, href } = props
  return (
    <Navigator
      className={classes.NavBlock}
      url={href}>
      {title}
      <ArrowRight size="small" />
    </Navigator>
  )
}

interface NavProps {
  title?: string
  children?: ReactNode
}

export default function Nav(props: NavProps) {
  const { title, children } = props
  return (
    <View className={classes.Nav}>
      <View className={classes.NavTitle} children={title} />
      <View className={classes.NavBlocks}>
        {children}
      </View>
    </View>
  )
}

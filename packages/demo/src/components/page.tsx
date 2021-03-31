import * as React from "react"
import { ReactNode } from "react"
import { View } from "@tarojs/components"
import { navigateBack } from "@tarojs/taro"
import ArrowLeft from "@taroify/icons/ArrowLeft"
import classNames from "classnames"
import classes from "./page.module.scss"

interface PageProps {
  className?: string
  title?: string
  children: ReactNode
}

export default function Page(props: PageProps) {
  const { className, title, children } = props

  return (
    <View className={classNames(classes.Page, className)}>
      <View className={classes.Nav}>
        <ArrowLeft className={classes.NavBack} onClick={() => navigateBack()} />
        <View className={classes.NavTitle}>{title} </View>
      </View>
      <View
        className={classes.PageContent}
        children={children} />
    </View>
  )
}

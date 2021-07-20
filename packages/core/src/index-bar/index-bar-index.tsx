import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { useContext } from "react"
import { prefixClassname } from "../styles"
import IndexBarContext from "./index-bar.context"

interface IndexBarIndexProps {
  index?: number | string
}

export default function IndexBarIndex(props: IndexBarIndexProps) {
  const { index } = props
  const { activeIndex } = useContext(IndexBarContext)
  return (
    <View
      className={classNames(prefixClassname("index-bar__index"), {
        [prefixClassname("index-bar__index--active")]: activeIndex === index,
      })}
      children={index}
    />
  )
}

import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { useContext } from "react"
import { prefixClassname } from "../styles"
import IndexListContext from "./index-list.context"

interface IndexListIndexProps {
  index?: number | string
}

export default function IndexListIndex(props: IndexListIndexProps) {
  const { index } = props
  const { activeIndex } = useContext(IndexListContext)
  return (
    <View
      className={classNames(prefixClassname("index-list__index"), {
        [prefixClassname("index-list__index--active")]: activeIndex === index,
      })}
      children={index}
    />
  )
}

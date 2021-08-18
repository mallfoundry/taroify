import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { CSSProperties, ReactNode, useContext, useEffect, useState } from "react"
import { prefixClassname } from "../styles"
import { useComputed } from "../utils/computed"
import { addUnitPx } from "../utils/format/unit"
import SwiperContext from "./swiper.context"
import { SwiperDirection } from "./swiper.shared"

export interface SwiperItemProps {
  __dataIndex__?: number
  className?: string
  children?: ReactNode
}

export default function SwiperItem(props: SwiperItemProps) {
  const { __dataIndex__ = 0, className } = props
  const { size, direction, children } = useContext(SwiperContext)
  const vertical = direction === SwiperDirection.Vertical

  const [offset, setOffset] = useState(0)

  const rootStyle = useComputed(() => {
    const style: CSSProperties = {}
    if (size?.value) {
      const mainAxis = vertical ? "height" : "width"
      style[mainAxis] = addUnitPx(size?.value)
    }
    style.transform = offset ? `translate${vertical ? "Y" : "X"}(${addUnitPx(offset)})` : ""
    return style
  }, [offset, size, vertical])

  useEffect(() => {
    if (!children[__dataIndex__]) {
      children[__dataIndex__] = { setOffset }
    }
  }, [children, __dataIndex__])

  return (
    <View
      className={classNames(prefixClassname("swiper-item"), className)}
      style={rootStyle.value}
      children={props.children}
    />
  )
}

import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { CSSProperties, ReactNode, useContext, useEffect, useMemo, useState } from "react"
import { prefixClassname } from "../styles"
import { addUnitPx } from "../utils/format/unit"
import SwiperContext from "./swiper.context"
import { SwiperDirection } from "./swiper.shared"

export interface SwiperItemProps {
  className?: string
  index?: number
  children?: ReactNode
}

export default function SwiperItem(props: SwiperItemProps) {
  const { className, index = 0 } = props
  const { size, direction, children } = useContext(SwiperContext)
  const vertical = direction === SwiperDirection.Vertical

  const [offset, setOffset] = useState(0)

  const rootStyle = useMemo(() => {
    const style: CSSProperties = {}
    if (size) {
      const mainAxis = vertical ? "height" : "width"
      style[mainAxis] = addUnitPx(size)
    }
    if (offset) {
      style.transform = `translate${vertical ? "Y" : "X"}(${addUnitPx(offset)})`
    } else {
      style.transform = ""
    }
    return style
  }, [offset, size, vertical])

  useEffect(() => {
    if (!children[index]) {
      children[index] = { setOffset }
    }
  }, [children, index])

  return (
    <View
      className={classNames(prefixClassname("swiper-item"), className)}
      style={rootStyle}
      children={props.children}
    />
  )
}

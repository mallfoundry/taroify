import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { CSSProperties, ReactNode, useContext, useEffect, useMemo, useRef, useState } from "react"
import { useMounted } from "../hooks"
import { prefixClassname } from "../styles"
import { addUnitPx } from "../utils/format/unit"
import { useRendered } from "../utils/state"
import SwiperContext from "./swiper.context"

export interface SwiperItemProps extends ViewProps {
  __dataIndex__?: number
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

export default function SwiperItem(props: SwiperItemProps) {
  const {
    __dataIndex__ = 0,
    className,
    style: styleProp,
    children: childrenProp,
    ...restProps
  } = props

  const { lazyRender, getSize, direction, loop, indicator = 0, count = 0, itemInstances } = useContext(
    SwiperContext,
  )
  const vertical = direction === "vertical"

  const initializedRef = useRef(false)
  const mountedRef = useRef(false)

  const [offset, setOffset] = useState(0)

  const shouldRender = useMemo(() => {
    if (!lazyRender || initializedRef.current) {
      return true
    }

    // wait for all item to mount, so we can get the exact count
    if (!mountedRef.current && indicator !== 0) {
      return false
    }

    const active = indicator
    const maxActive = count - 1
    const prevActive = active === 0 && loop ? maxActive : active - 1
    const nextActive = active === maxActive && loop ? 0 : active + 1
    initializedRef.current =
      __dataIndex__ === active || __dataIndex__ === prevActive || __dataIndex__ === nextActive
    return initializedRef.current
  }, [__dataIndex__, count, indicator, lazyRender, loop])

  useMounted(() => {
    mountedRef.current = true
  })

  useEffect(() => {
    if (!itemInstances[__dataIndex__]) {
      itemInstances[__dataIndex__] = { setOffset }
    }
  }, [itemInstances, __dataIndex__])

  const rootStyle = useRendered(() => {
    const style: CSSProperties = {}
    const size= getSize?.()
    if (size) {
      const mainAxis = vertical ? "height" : "width"
      style[mainAxis] = addUnitPx(size)
    }
    style.transform = offset ? `translate${vertical ? "Y" : "X"}(${addUnitPx(offset)})` : ""
    return style
  })

  return (
    <View
      className={classNames(prefixClassname("swiper-item"), className)}
      style={{
        ...styleProp,
        ...rootStyle,
      }}
      children={shouldRender ? childrenProp : undefined}
      {...restProps}
    />
  )
}

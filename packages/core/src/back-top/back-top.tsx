import * as React from "react"
import { type CSSProperties, type FC, useMemo, useState, useRef, useEffect } from "react"
import { usePageScroll, nextTick } from "@tarojs/taro"
import { type ITouchEvent, View } from "@tarojs/components"
import type { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import { BackTop as BackTopIcon } from "@taroify/icons"
import { prefixClassname } from "../styles"
import { inBrowser } from "../utils/base"
import { addUnitPx } from "../utils/format/unit"
import { getScrollParent, getScrollTop } from "../utils/dom/scroll"

export interface BackTopProps extends ViewProps {
  style?: CSSProperties
  right?: number | string
  bottom?: number | string
  zIndex?: number
  offset?: number
  immediate?: boolean
  onClick?: (event: ITouchEvent) => void
}

const BackTop: FC<BackTopProps> = (props) => {
  const {
    className,
    style: styleProp,
    right = 30,
    bottom = 40,
    offset = 100,
    zIndex = 100,
    immediate = false,
    children,
    onClick: onClickProp,
  } = props

  const [visible, setVisible] = useState(false)
  const rootRef = useRef()
  const scrollParent = useRef<HTMLElement>()

  useEffect(() => {
    nextTick(async () => {
      scrollParent.current = await getScrollParent(rootRef.current)
    })
  }, [])

  usePageScroll(async () => {
    const top = await getScrollTop(scrollParent.current)
    setVisible(scrollParent.current ? top >= offset : false)
  })

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const rootStyle = useMemo(
    () => ({
      zIndex,
      right: addUnitPx(right),
      bottom: addUnitPx(bottom),
    }),
    [right, bottom, offset, zIndex],
  )

  const onClick = (event: ITouchEvent) => {
    onClickProp?.(event)
    if (inBrowser) {
      scrollParent.current?.scrollTo({
        top: 0,
        behavior: immediate ? "auto" : "smooth",
      })
    }
  }

  return (
    <View
      ref={rootRef}
      className={classNames(prefixClassname("back-top"), className, {
        active: visible,
      })}
      style={{
        ...styleProp,
        ...rootStyle,
      }}
      onClick={onClick}
    >
      {children ? children : <BackTopIcon />}
    </View>
  )
}

export default BackTop

import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import { usePageScroll, useReady } from "@tarojs/taro"
import classNames from "classnames"
import * as React from "react"
import { CSSProperties, MutableRefObject, ReactNode, useMemo, useRef, useState } from "react"
import { prefixClassname } from "../styles"
import { getBoundingClientRect } from "../utils/dom"
import { unitToPx } from "../utils/format/unit"
import { getSystemRect } from "../utils/system"

interface RootReact {
  height?: number
  width?: number
}

enum StickyPosition {
  Top = "top",
  Bottom = "bottom",
}

type StickyPositionString = "top" | "bottom"

interface StickyOffset {
  top?: number | string
  bottom?: number | string
}

interface StickyProps {
  zIndex?: number
  position?: StickyPosition | StickyPositionString
  offset?: StickyOffset
  container?: MutableRefObject<Element | undefined>
  children?: ReactNode
}

export default function Sticky(props: StickyProps) {
  const { position = StickyPosition.Top, offset, container: containerRef, children } = props
  const rootRef = useRef<ViewProps>()

  const [rootRect, setRootRect] = useState<RootReact>({})

  const [fixed, setFixed] = useState(false)
  const [transform, setTransform] = useState(0)

  const offsetValue = useMemo(
    () => unitToPx((position === StickyPosition.Top ? offset?.top : offset?.bottom) ?? 0),
    [offset?.bottom, offset?.top, position],
  )

  const rootStyle: CSSProperties | undefined = useMemo(() => {
    if (!fixed) {
      return {
        height: "",
        width: "",
      }
    }
    const style: CSSProperties = {}
    if (rootRect.height) {
      style.height = `${rootRect.height}px`
    }
    if (rootRect.width) {
      style.width = `${rootRect.width}px`
    }
    return style
  }, [fixed, rootRect.height, rootRect.width])

  const stickyStyle: CSSProperties | undefined = useMemo(() => {
    if (!fixed) {
      return {
        height: "",
        width: "",
        [position]: "",
      }
    }
    const style: CSSProperties = {}
    if (rootRect.height) {
      style.height = `${rootRect.height}px`
    }
    if (rootRect.width) {
      style.width = `${rootRect.width}px`
    }
    style.transform = transform ? `translate3d(0, ${transform}px, 0)` : ""
    style[position] = `${offsetValue}px`
    return style
  }, [fixed, rootRect.height, rootRect.width, transform, position, offsetValue])

  async function onScroll() {
    const __rootRect__ = await getBoundingClientRect(rootRef)
    setRootRect(__rootRect__)

    if (position === StickyPosition.Top) {
      if (containerRef) {
        const containerRect = await getBoundingClientRect(containerRef)
        const difference = containerRect.bottom - offsetValue - __rootRect__.height
        setTransform(difference < 0 ? difference : 0)
        setFixed(offsetValue > __rootRect__.top && containerRect.bottom > 0)
      } else {
        setFixed(offsetValue > __rootRect__.top)
      }
    } else {
      const { windowHeight } = await getSystemRect()
      if (containerRef) {
        const containerRect = await getBoundingClientRect(containerRef)
        const difference = windowHeight - containerRect.top - offsetValue - __rootRect__.height
        setTransform(difference < 0 ? difference : 0)
        setFixed(
          windowHeight - offsetValue < __rootRect__.bottom && windowHeight > containerRect.top,
        )
      } else {
        setFixed(windowHeight - offsetValue < __rootRect__.bottom)
      }
    }
  }

  usePageScroll(onScroll)
  useReady(onScroll)

  return (
    <View ref={rootRef} style={rootStyle}>
      <View
        style={stickyStyle}
        className={classNames(prefixClassname("sticky"), {
          [prefixClassname("sticky--fixed")]: fixed,
        })}
        children={children}
      />
    </View>
  )
}

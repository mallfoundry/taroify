import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import { PageScrollObject, usePageScroll } from "@tarojs/taro"
import classNames from "classnames"
import * as React from "react"
import {
  CSSProperties,
  MutableRefObject,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { useMounted } from "../hooks"
import { prefixClassname } from "../styles"
import { getRect } from "../utils/dom/rect"
import { addUnitPx, unitToPx } from "../utils/format/unit"
import { getSystemRect } from "../utils/system"

interface RootReact {
  height?: number
  width?: number
}

type StickyPosition = "top" | "bottom"

interface StickyOffset {
  top?: number | string
  bottom?: number | string
}

interface StickyProps extends ViewProps {
  className?: string
  style?: CSSProperties
  position?: StickyPosition
  offset?: StickyOffset
  offsetTop?: number | string
  offsetBottom?: number | string
  container?: MutableRefObject<Element | undefined>
  children?: ReactNode

  onChange?(fixed: boolean): void

  onScroll?(scroll: PageScrollObject): void
}

export default function Sticky(props: StickyProps) {
  const {
    className,
    style: styleProp,
    position = "top",
    offsetTop: offsetTopProp,
    offsetBottom: offsetBottomProp,
    offset: offsetProp,
    container: containerRef,
    children,
    onChange,
    onScroll,
    ...restProps
  } = props

  if (offsetProp) {
    const { top, bottom } = offsetProp
    if (top) {
      // eslint-disable-next-line no-console
      console.warn("[Deprecated] Use the 'offsetTop' prop instead of the 'offset.top' prop.")
    }
    if (bottom) {
      // eslint-disable-next-line no-console
      console.warn("[Deprecated] Use the 'offsetBottom' prop instead of the 'offset.bottom' prop.")
    }
  }

  const offsetTop = offsetTopProp ?? offsetProp?.top
  const offsetBottom = offsetBottomProp ?? offsetProp?.bottom

  const rootRef = useRef<ViewProps>()
  const counterRef = useRef(0)

  const [rootRect, setRootRect] = useState<RootReact>({})

  const [fixed, setFixed] = useState(false)
  const [transform, setTransform] = useState(0)

  const offsetValue = useMemo(
    () => unitToPx((position === "top" ? offsetTop : offsetBottom) ?? 0),
    [offsetBottom, offsetTop, position],
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
      style.height = addUnitPx(rootRect.height)
    }
    if (rootRect.width) {
      style.width = addUnitPx(rootRect.width)
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
      style.height = addUnitPx(rootRect.height)
    }
    if (rootRect.width) {
      style.width = addUnitPx(rootRect.width)
    }
    style.transform = transform ? `translate3d(0, ${addUnitPx(transform)}, 0)` : ""
    style[position] = addUnitPx(offsetValue)
    return style
  }, [fixed, rootRect.height, rootRect.width, transform, position, offsetValue])

  async function invokeScroll({ scrollTop }: PageScrollObject) {
    const __rootRect__ = await getRect(rootRef)
    if (__rootRect__) {
      setRootRect(__rootRect__)
      if (position === "top") {
        if (containerRef) {
          const containerRect = await getRect(containerRef)
          const difference = containerRect.bottom - offsetValue - __rootRect__.height
          setTransform(difference < 0 ? difference : 0)
          setFixed(offsetValue > __rootRect__.top && containerRect.bottom > 0)
        } else {
          setFixed(offsetValue > __rootRect__.top)
        }
      } else {
        const { windowHeight } = await getSystemRect()
        if (containerRef) {
          const containerRect = await getRect(containerRef)
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
    onScroll?.({ scrollTop })
  }

  useEffect(() => {
    if (counterRef.current > 0) {
      onChange?.(fixed)
    }
    counterRef.current++
  }, [fixed, onChange])

  useMounted(() => invokeScroll({ scrollTop: 0 }))

  usePageScroll(({ scrollTop }) => invokeScroll({ scrollTop }))

  return (
    <View
      ref={rootRef}
      style={{
        ...styleProp,
        ...rootStyle,
      }}
      {...restProps}
    >
      <View
        style={stickyStyle}
        className={classNames(
          prefixClassname("sticky"),
          {
            [prefixClassname("sticky--fixed")]: fixed,
          },
          className,
        )}
        children={children}
      />
    </View>
  )
}

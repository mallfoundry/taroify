import { View } from "@tarojs/components"
import { pageScrollTo } from "@tarojs/taro"
import classNames from "classnames"
import * as React from "react"
import {
  CSSProperties,
  ForwardedRef,
  forwardRef,
  ReactNode,
  useCallback,
  useContext,
  useImperativeHandle,
  useRef,
} from "react"
import { prefixClassname } from "../styles"
import { HAIRLINE_BORDER_BOTTOM } from "../styles/hairline"
import { TaroElement } from "../utils/dom/element"
import { addUnitPx } from "../utils/format/unit"
import { getRect } from "../utils/dom/rect"
import IndexListContext from "./index-list.context"

export interface IndexListAnchorInstance {
  scrollIntoView(scrollTop: number): void
}

export interface IndexListAnchorProps {
  index: number | string
  children?: ReactNode
}

interface InternalIndexListAnchorProps extends IndexListAnchorProps {
  arrayedIndex?: number
}

const IndexListAnchor = forwardRef(
  (props: IndexListAnchorProps, ref: ForwardedRef<IndexListAnchorInstance>) => {
    const { arrayedIndex, index, children } = props as InternalIndexListAnchorProps

    const {
      activeArrayedIndex,
      sticky: stickyProp,
      stickyOffsetTop,
      zIndex,
      getAnchorRects,
      getListRect,
    } = useContext(IndexListContext)

    const rootRef = useRef<TaroElement>()

    const scrollIntoView = useCallback(
      (scrollTop: number) =>
        getRect(rootRef).then(({ top }) =>
          pageScrollTo({
            duration: 0,
            scrollTop: Math.ceil(scrollTop + top),
          }),
        ),
      [],
    )

    useImperativeHandle(ref, () => ({
      scrollIntoView,
    }))

    let wrapperStyle: CSSProperties = {}

    let anchorStyle: CSSProperties = {}

    let active: boolean = false

    if (stickyProp) {
      if (arrayedIndex === activeArrayedIndex) {
        const { top, height } = getAnchorRects()[arrayedIndex]

        const activeAnchorSticky = top <= 0

        if (activeAnchorSticky) {
          wrapperStyle = {
            height: addUnitPx(height),
          }
          anchorStyle = {
            position: "fixed",
            top: addUnitPx(stickyOffsetTop),
            zIndex,
          }
        }

        active = true
      } else if (arrayedIndex === activeArrayedIndex - 1) {
        const listRect = getListRect()
        const anchorRects = getAnchorRects()
        const currentAnchor = anchorRects[arrayedIndex]
        const currentOffsetTop = currentAnchor.top
        const targetOffsetTop =
          arrayedIndex === anchorRects.length - 1 ? listRect.top : anchorRects[arrayedIndex + 1].top
        const parentOffsetHeight = targetOffsetTop - currentOffsetTop
        const translateY = parentOffsetHeight - currentAnchor.height
        anchorStyle = {
          position: "relative",
          transform: `translate3d(0, ${addUnitPx(translateY)}, 0)`,
          zIndex,
        }

        active = true
      } else {
        wrapperStyle = {}
        anchorStyle = {}
        active = false
      }
    }

    return (
      <View
        ref={rootRef}
        className={prefixClassname("index-list__anchor-wrapper")}
        style={wrapperStyle}
      >
        <View
          className={classNames(prefixClassname("index-list__anchor"), {
            [prefixClassname("index-list__anchor--sticky")]: active,
            [HAIRLINE_BORDER_BOTTOM]: active,
          })}
          style={anchorStyle}
          children={children ?? index}
        />
      </View>
    )
  },
)

export default IndexListAnchor

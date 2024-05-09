import { ITouchEvent, View, ViewProps } from "@tarojs/components"
import * as React from "react"
import { ForwardedRef, forwardRef, ReactNode } from "react"
import classNames from "classnames"
import { prefixClassname } from "../styles"

interface IndexListSidebarProps {
  inner?: boolean
  children?: ReactNode
  onClick?: (event: ITouchEvent) => void
  onTouchStart?: ViewProps["onTouchStart"]
  onTouchMove?: ViewProps["onTouchStart"]
  onTouchCancel?: ViewProps["onTouchCancel"]
  onTouchEnd?: ViewProps["onTouchEnd"]
}

const IndexListSidebar = forwardRef(
  (props: IndexListSidebarProps, ref: ForwardedRef<HTMLElement | undefined>) => {
    const { inner, children, onClick, onTouchStart, onTouchMove, onTouchCancel, onTouchEnd } = props
    return (
      <View
        ref={ref}
        catchMove
        className={classNames(prefixClassname("index-list__sidebar"), {
          inner: inner,
        })}
        children={children}
        onClick={onClick}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchCancel={onTouchCancel}
        onTouchEnd={onTouchEnd}
      />
    )
  },
)

export default IndexListSidebar

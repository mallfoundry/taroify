import { ITouchEvent, View, ViewProps } from "@tarojs/components"
import * as React from "react"
import { ForwardedRef, forwardRef, ReactNode } from "react"
import { prefixClassname } from "../styles"

interface IndexListSidebarProps {
  children?: ReactNode
  onClick?: (event: ITouchEvent) => void
  onTouchMove?: ViewProps["onTouchStart"]
  onTouchCancel?: ViewProps["onTouchCancel"]
  onTouchEnd?: ViewProps["onTouchEnd"]
}

const IndexListSidebar = forwardRef(
  (props: IndexListSidebarProps, ref: ForwardedRef<HTMLElement | undefined>) => {
    const { children, onClick, onTouchMove, onTouchCancel, onTouchEnd } = props
    return (
      <View
        ref={ref}
        catchMove
        className={prefixClassname("index-list__sidebar")}
        children={children}
        onClick={onClick}
        onTouchMove={onTouchMove}
        onTouchCancel={onTouchCancel}
        onTouchEnd={onTouchEnd}
      />
    )
  },
)

export default IndexListSidebar

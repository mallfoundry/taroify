import { ITouchEvent, View } from "@tarojs/components"
import * as React from "react"
import { ForwardedRef, forwardRef, ReactNode } from "react"
import { prefixClassname } from "../styles"

interface IndexBarSidebarProps {
  children?: ReactNode
  onClick?: (event: ITouchEvent) => void
  onTouchMove?: (event: ITouchEvent) => void
  onTouchCancel?: (event: ITouchEvent) => void
  onTouchEnd?: (event: ITouchEvent) => void
}

const IndexBarSidebar = forwardRef(
  (props: IndexBarSidebarProps, ref: ForwardedRef<HTMLElement | undefined>) => {
    const { children, onClick, onTouchMove, onTouchCancel, onTouchEnd } = props
    return (
      <View
        ref={ref}
        catchMove
        className={prefixClassname("index-bar__sidebar")}
        children={children}
        onClick={onClick}
        onTouchMove={onTouchMove}
        onTouchCancel={onTouchCancel}
        onTouchEnd={onTouchEnd}
      />
    )
  },
)

export default IndexBarSidebar

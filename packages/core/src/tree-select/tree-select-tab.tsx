import classNames from "classnames"
import * as React from "react"
import { CSSProperties, ReactNode } from "react"
import SidebarTab from "../sidebar/sidebar-tab"
import { SidebarTabKey } from "../sidebar/sidebar-tab.shared"
import { prefixClassname } from "../styles"

interface TreeSelectTabProps {
  __dataKey__?: SidebarTabKey
  __dataIndex__?: number
  className?: string
  style?: CSSProperties
  active?: boolean
  disabled?: boolean
  dot?: boolean
  badge?: ReactNode
  title?: ReactNode
  children?: ReactNode
}

function TreeSelectTab(props: TreeSelectTabProps) {
  const { className, title, children, ...restProps } = props
  return (
    <SidebarTab
      className={classNames(
        prefixClassname("tree-select-tab"), //
        className,
      )}
      children={title}
      {...restProps}
    />
  )
}

export default TreeSelectTab

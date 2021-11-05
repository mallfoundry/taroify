import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { CSSProperties, ReactNode } from "react"
import SidebarTab from "../sidebar/sidebar-tab"
import { prefixClassname } from "../styles"

interface TreeSelectTabProps extends ViewProps {
  className?: string
  style?: CSSProperties
  value?: any
  disabled?: boolean
  badge?: boolean | string | number | ReactNode
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

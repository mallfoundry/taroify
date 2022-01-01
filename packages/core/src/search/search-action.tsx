import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { ReactNode, useContext } from "react"
import { prefixClassname } from "../styles"
import SearchContext from "./search.context"

interface SearchActionProps extends ViewProps {
  children?: ReactNode
}

function SearchAction(props: SearchActionProps) {
  const { className, children = "取消", onClick, ...restProps } = props
  const { onCancel } = useContext(SearchContext)

  return (
    <View
      className={classNames(prefixClassname("search__action"), className)}
      children={children}
      onClick={(e) => {
        onClick?.(e)
        onCancel?.(e)
      }}
      {...restProps}
    />
  )
}

export default SearchAction

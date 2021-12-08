import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classnames from "classnames"
import * as React from "react"
import { Key, ReactNode, useContext, useMemo } from "react"
import { prefixClassname } from "../styles"
import DropdownMenuContext from "./dropdown-menu.context"

interface DropdownMenuTitleProps extends ViewProps {
  __dataKey__?: Key
  disabled?: boolean
  children?: ReactNode
}

function DropdownMenuTitle(props: DropdownMenuTitleProps) {
  const { className, __dataKey__: dataKey, disabled, children, onClick, ...restProps } = props
  const { isItemToggle, toggleItem } = useContext(DropdownMenuContext)
  const active = useMemo(() => isItemToggle?.(dataKey), [dataKey, isItemToggle])

  return (
    <View
      className={classnames(
        prefixClassname("dropdown-menu-title"),
        {
          [prefixClassname("dropdown-menu-title--active")]: active,
          [prefixClassname("dropdown-menu-title--disabled")]: disabled,
          [prefixClassname("dropdown-menu-title--down")]: active,
        },
        className,
      )}
      onClick={(event) => {
        onClick?.(event)
        if (!disabled) {
          toggleItem?.(dataKey)
        }
      }}
      {...restProps}
    >
      <View className={prefixClassname("dropdown-menu-title__content")}>
        <View className={prefixClassname("ellipsis")} children={children} />
      </View>
    </View>
  )
}

export default DropdownMenuTitle

import { View } from "@tarojs/components"
import classnames from "classnames"
import * as React from "react"
import { ReactNode, useContext, useMemo } from "react"
import { prefixClassname } from "../styles"
import DropdownMenuContext from "./dropdown-menu.context"

interface DropdownMenuTitleProps {
  __dataKey__?: React.Key
  disabled?: boolean
  children?: ReactNode
}

function DropdownMenuTitle(props: DropdownMenuTitleProps) {
  const { __dataKey__: dataKey, disabled, children } = props
  const { activeColor, isItemToggle, toggleItem } = useContext(DropdownMenuContext)
  const active = useMemo(() => isItemToggle?.(dataKey), [dataKey, isItemToggle])

  const contentStyle = useMemo(
    () => ({
      color: active ? activeColor ?? "" : "",
    }),
    [active, activeColor],
  )

  return (
    <View
      className={classnames(prefixClassname("dropdown-menu-title"), {
        [prefixClassname("dropdown-menu-title--active")]: active,
        [prefixClassname("dropdown-menu-title--disabled")]: disabled,
        [prefixClassname("dropdown-menu-title--down")]: active,
      })}
      onClick={() => toggleItem?.({ dataKey, disabled })}
    >
      <View className={prefixClassname("dropdown-menu-title__content")} style={contentStyle}>
        <View className={prefixClassname("ellipsis")} children={children} />
      </View>
    </View>
  )
}

export default DropdownMenuTitle

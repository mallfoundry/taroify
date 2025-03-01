import { Success } from "@taroify/icons"
import type { ITouchEvent } from "@tarojs/components"
import type { ViewProps } from "@tarojs/components/types/View"
import classnames from "classnames"
import * as React from "react"
import { type ReactNode, useCallback, useContext } from "react"
import Cell from "../cell"
import { prefixClassname } from "../styles"
import DropdownMenuItemContext from "./dropdown-menu-item.context"
import type { DropdownMenuItemOption } from "./dropdown-menu.shared"

export type DropdownMenuOptionProps = ViewProps &
  DropdownMenuItemOption & {
    disabled?: boolean
    clickable?: boolean
    children?: ReactNode
  }

function DropdownMenuOption(props: DropdownMenuOptionProps) {
  const {
    className,
    value,
    disabled,
    clickable = true,
    icon,
    children,
    onClick,
    ...restProps
  } = props

  const { isOptionToggle, toggleOption } = useContext(DropdownMenuItemContext)

  const active = isOptionToggle?.(value)

  const handleClick = useCallback(
    (event: ITouchEvent) => {
      onClick?.(event)
      if (!disabled) {
        toggleOption?.({
          active: !active,
          value,
          children,
        })
      }
    },
    [active, children, disabled, onClick, toggleOption, value],
  )

  return (
    <Cell
      className={classnames(
        prefixClassname("dropdown-menu-option"),
        {
          [prefixClassname("dropdown-menu-option--active")]: active,
          [prefixClassname("dropdown-menu-option--disabled")]: disabled,
        },
        className,
      )}
      clickable={clickable}
      icon={icon}
      title={children}
      onClick={handleClick}
      {...restProps}
    >
      {active && <Success className={prefixClassname("dropdown-menu-option__icon")} />}
    </Cell>
  )
}

export default DropdownMenuOption

import { Success } from "@taroify/icons"
import { ViewProps } from "@tarojs/components/types/View"
import classnames from "classnames"
import * as React from "react"
import { ReactNode, useCallback, useContext, useMemo } from "react"
import Cell from "../cell"
import { prefixClassname } from "../styles"
import DropdownMenuItemContext from "./dropdown-menu-item.context"

export interface DropdownMenuOptionProps extends ViewProps {
  value?: any
  disabled?: boolean
  clickable?: boolean
  icon?: ReactNode
  title?: ReactNode
  children?: ReactNode
  onClick?: (event: any) => void
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

  const active = useMemo(() => isOptionToggle?.(value), [isOptionToggle, value])

  const handleClick = useCallback(() => {
    const event = {
      active: !active,
      value,
      children,
    }
    onClick?.(event)
    if (!disabled) {
      toggleOption?.(event)
    }
  }, [active, children, disabled, onClick, toggleOption, value])

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

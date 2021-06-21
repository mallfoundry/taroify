import { cloneIconComponent } from "@taroify/icons/utils"
import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { CSSProperties, ReactNode, useCallback, useContext, useMemo } from "react"
import { prefixClassname } from "../styles"
import TreeSelectContext from "./tree-select.context"
import { TreeSelectOptionEvent, TreeSelectOptionValue } from "./tree-select.shared"

interface TreeSelectOptionProps {
  className?: string
  style?: CSSProperties
  disabled?: boolean
  value?: TreeSelectOptionValue
  children?: ReactNode
  onClick?: (event: TreeSelectOptionEvent) => void
}

function TreeSelectOption(props: TreeSelectOptionProps) {
  const { className, style, disabled = false, value, children, onClick } = props
  const { activeIcon, hasValuesActive, changeValuesActive } = useContext(TreeSelectContext)

  const active = useMemo(() => hasValuesActive?.(value), [hasValuesActive, value])

  const handleClick = useCallback(() => {
    const event = {
      active: !active,
      value,
      children,
    }
    onClick?.(event)
    if (!disabled) {
      changeValuesActive?.(event)
    }
  }, [active, changeValuesActive, children, disabled, onClick, value])

  return (
    <View
      className={classNames(
        prefixClassname("ellipsis"), //
        prefixClassname("tree-select-option"),
        {
          [prefixClassname("tree-select-option--disabled")]: disabled,
          [prefixClassname("tree-select-option--active")]: active,
        },
        className,
      )}
      style={style}
      children={
        <>
          {children}
          {active &&
            cloneIconComponent(activeIcon, {
              className: prefixClassname("tree-select-option__icon"),
            })}
        </>
      }
      onClick={handleClick}
    />
  )
}

export default TreeSelectOption

import { cloneIconElement } from "@taroify/icons/utils"
import { View } from "@tarojs/components"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { CSSProperties, ReactNode, useCallback, useContext, useMemo } from "react"
import { prefixClassname } from "../styles"
import TreeSelectContext from "./tree-select.context"
import { TreeSelectOptionObject } from "./tree-select.shared"

interface TreeSelectOptionProps {
  className?: string
  style?: CSSProperties
  disabled?: boolean
  value?: any
  children?: ReactNode
  onClick?: (event: TreeSelectOptionObject) => void
}

function TreeSelectOption(props: TreeSelectOptionProps) {
  const { className, style, disabled = false, value, children, onClick } = props
  const { activeIcon, value: ctxValue, onOptionClick } = useContext(TreeSelectContext)

  const active = useMemo(
    () => (_.isArray(ctxValue) ? _.includes(ctxValue, value) : value === ctxValue),
    [ctxValue, value],
  )

  const handleClick = useCallback(() => {
    const event = {
      active: !active,
      disabled,
      value,
      children,
    }
    onClick?.(event)
    onOptionClick?.(event)
  }, [active, children, disabled, onClick, onOptionClick, value])

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
      onClick={handleClick}
    >
      {children}
      {
        //
        active &&
          cloneIconElement(activeIcon, {
            className: prefixClassname("tree-select-option__icon"),
          })
      }
    </View>
  )
}

export default TreeSelectOption

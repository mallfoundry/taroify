import { cloneIconElement } from "@taroify/icons/utils"
import { ITouchEvent, View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { CSSProperties, ReactNode, useCallback, useContext, useMemo } from "react"
import { prefixClassname } from "../styles"
import TreeSelectContext from "./tree-select.context"

interface TreeSelectOptionProps extends ViewProps {
  className?: string
  style?: CSSProperties
  disabled?: boolean
  value?: any
  children?: ReactNode
}

function TreeSelectOption(props: TreeSelectOptionProps) {
  const { className, style, disabled = false, value, children, onClick, ...restProps } = props
  const { activeIcon, value: ctxValue, onOptionClick } = useContext(TreeSelectContext)

  const active = useMemo(
    () => (_.isArray(ctxValue) ? _.includes(ctxValue, value) : value === ctxValue),
    [ctxValue, value],
  )

  const handleClick = useCallback(
    (event: ITouchEvent) => {
      onClick?.(event)
      onOptionClick?.({
        active: !active,
        disabled,
        value,
        children,
      })
    },
    [active, children, disabled, onClick, onOptionClick, value],
  )

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
      {...restProps}
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

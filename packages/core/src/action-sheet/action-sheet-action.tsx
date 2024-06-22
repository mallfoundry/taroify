import { ITouchEvent, View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { ReactNode, useContext } from "react"
import ButtonBase, { ButtonBaseProps } from "../button-base"
import Sheet, { SheetItemProps } from "../sheet"
import { prefixClassname } from "../styles"
import ActionSheetContext from "./action-sheet.context"

export interface ActionSheetActionProps
  extends SheetItemProps,
    Omit<
      ButtonBaseProps,
      | "size"
      | "type"
      | "plain"
      | "loading"
      | "formType"
      | "animation"
      | "onTouchEnd"
      | "onTouchCancel"
      | "onTouchMove"
      | "onTouchStart"
    > {
  name?: ReactNode
  value?: any
  onClick?: (event: ITouchEvent) => void
}

export default function ActionSheetAction(props: ActionSheetActionProps) {
  const {
    className,
    style,
    disabled,
    loading,
    name,
    value,
    children,
    onClick, //
    ...restProps
  } = props
  const { onSelect } = useContext(ActionSheetContext)
  return (
    <Sheet.Item
      style={style}
      className={classNames(prefixClassname("action-sheet__action"), className)}
      disabled={disabled}
      loading={loading}
    >
      {name && <View className={prefixClassname("action-sheet__name")} children={name} />}
      {children && (
        <View className={prefixClassname("action-sheet__subname")} children={children} />
      )}
      <ButtonBase
        className={prefixClassname("action-sheet__button")}
        onClick={(event) => {
          if (!disabled && !loading) {
            onClick?.(event)
            onSelect?.({
              disabled,
              loading,
              name,
              value,
              children,
            })
          }
        }}
        {...restProps}
      />
    </Sheet.Item>
  )
}

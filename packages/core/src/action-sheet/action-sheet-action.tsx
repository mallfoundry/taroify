import { ITouchEvent, View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { ReactNode, useContext } from "react"
import ButtonBase, { ButtonBaseProps } from "../button-base"
import Sheet, { SheetItemProps, useSheetProps } from "../sheet"
import { prefixClassname } from "../styles"
import ActionSheetContext from "./action-sheet.context"

export interface ActionSheetActionProps
  extends SheetItemProps,
    Omit<ButtonBaseProps, "size" | "type" | "plain" | "loading" | "formType"> {
  name?: ReactNode
  value?: any
  onClick?: (event: ITouchEvent) => void
}

export default function ActionSheetAction(mixedProps: ActionSheetActionProps) {
  const [
    buttonProps,
    {
      className,
      disabled,
      loading,
      name,
      value,
      children,
      onClick, //
      ...restProps
    },
  ] = useSheetProps<ActionSheetActionProps>(mixedProps)
  const { onSelect } = useContext(ActionSheetContext)
  return (
    <Sheet.Item
      className={classNames(prefixClassname("action-sheet__action"), className)}
      disabled={disabled}
      loading={loading}
      onClick={(event) => {
        onClick?.(event)
        if (!disabled && !loading) {
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
    >
      {name && <View className={prefixClassname("action-sheet__name")} children={name} />}
      {children && (
        <View className={prefixClassname("action-sheet__subname")} children={children} />
      )}
      <ButtonBase className={prefixClassname("action-sheet__button")} {...buttonProps} />
    </Sheet.Item>
  )
}

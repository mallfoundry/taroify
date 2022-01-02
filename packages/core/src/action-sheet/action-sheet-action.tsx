import { ITouchEvent, View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { ReactNode, useContext } from "react"
import Sheet, { SheetItemProps } from "../sheet"
import { prefixClassname } from "../styles"
import ActionSheetContext from "./action-sheet.context"

export interface ActionSheetActionProps extends SheetItemProps {
  name?: ReactNode
  value?:any,
  onClick?: (event: ITouchEvent) => void
}

export default function ActionSheetAction(props: ActionSheetActionProps) {
  const { className, disabled, loading, name,value, children, onClick, ...restProps } = props
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
    </Sheet.Item>
  )
}

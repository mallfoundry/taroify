import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { ReactNode, useContext } from "react"
import Sheet, { SheetProps } from "../sheet"
import { prefixClassname } from "../styles"
import ActionSheetContext from "./action-sheet.context"

interface ActionSheetProps extends SheetProps {
  onSelect?: (event: ActionSheet.ActionEvent) => void
}

function ActionSheet(props: ActionSheetProps) {
  const { className, onSelect, ...restProps } = props
  return (
    <ActionSheetContext.Provider value={{ emitSelect: onSelect }}>
      <Sheet className={classNames(prefixClassname("action-sheet"), className)} {...restProps} />
    </ActionSheetContext.Provider>
  )
}

namespace ActionSheet {
  interface BackdropProps extends Sheet.BackdropProps {}

  export function Backdrop(props: BackdropProps) {
    return <Sheet.Backdrop {...props} />
  }

  interface HeaderProps extends Sheet.HeaderProps {}

  export function Header(props: HeaderProps) {
    const { className, style, title, children } = props
    return (
      <Sheet.Header
        className={classNames(prefixClassname("action-sheet__header"), className)}
        style={style}
        title={title}
        children={children}
      />
    )
  }

  export interface ActionEvent extends Sheet.ItemEvent {
    name?: ReactNode
  }

  interface ActionProps extends Sheet.ItemProps {
    name?: ReactNode
    onClick?: (event: ActionEvent) => void
  }

  export function Action(props: ActionProps) {
    const { className, name, children, onClick, ...restProps } = props
    const { emitSelect } = useContext(ActionSheetContext)
    return (
      <Sheet.Item
        className={classNames(prefixClassname("action-sheet__action"), className)}
        {...restProps}
        onClick={({ disabled, loading }) => {
          const event = {
            disabled,
            loading,
            name,
            children,
          }
          onClick?.(event)
          if (!disabled && !loading) {
            emitSelect?.(event)
          }
        }}
      >
        {name && <View className={prefixClassname("action-sheet__name")} children={name} />}
        {children && (
          <View className={prefixClassname("action-sheet__subname")} children={children} />
        )}
      </Sheet.Item>
    )
  }

  export function Button(props: Sheet.ButtonProps) {
    return <Sheet.Button {...props} />
  }
}

export default ActionSheet

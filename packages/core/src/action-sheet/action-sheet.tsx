import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import Sheet, { SheetProps } from "../sheet"
import { prefixClassname } from "../styles"
import ActionSheetContext from "./action-sheet.context"
import { ActionSheetActionObject } from "./action-sheet.shared"
import ActionSheetHeader from "./action-sheet-header"
import ActionSheetAction from "./action-sheet-action"
import SafeArea from "../safe-area"

export interface ActionSheetProps extends SheetProps {
  // title?: ReactNode
  description?: ReactNode
  cancelText?: ReactNode
  actions?: ActionSheetActionObject[]
  onSelect?: (event: ActionSheetActionObject) => void
}

function ActionSheet({
  // title,
  description,
  cancelText,
  actions,
  className,
  onSelect,
  children: childrenProp,
  ...restProps
}: ActionSheetProps) {
  const renderChildren = () => {
    if (childrenProp) {
      return childrenProp
    }
    return (
      <>
        {description && <ActionSheetHeader children={description} />}
        {(actions || []).map(({ subname, ...rest }, index) => (
          <ActionSheetAction key={index} {...rest} children={subname} />
        ))}
        {cancelText && <Sheet.Button type="cancel" children={cancelText} />}
        <SafeArea position="bottom" />
      </>
    )
  }
  return (
    <ActionSheetContext.Provider value={{ onSelect }}>
      <Sheet className={classNames(prefixClassname("action-sheet"), className)} {...restProps}>
        {renderChildren()}
      </Sheet>
    </ActionSheetContext.Provider>
  )
}

export default ActionSheet

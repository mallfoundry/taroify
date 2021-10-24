import classNames from "classnames"
import * as React from "react"
import Sheet, { SheetProps } from "../sheet"
import { prefixClassname } from "../styles"
import ActionSheetContext from "./action-sheet.context"
import { ActionSheetActionObject } from "./action-sheet.shared"

export interface ActionSheetProps extends SheetProps {
  onSelect?: (event: ActionSheetActionObject) => void
}

function ActionSheet(props: ActionSheetProps) {
  const { className, onSelect, ...restProps } = props
  return (
    <ActionSheetContext.Provider value={{ onSelect }}>
      <Sheet className={classNames(prefixClassname("action-sheet"), className)} {...restProps} />
    </ActionSheetContext.Provider>
  )
}

export default ActionSheet

import classNames from "classnames"
import * as React from "react"
import Sheet, { SheetHeaderProps } from "../sheet"
import { prefixClassname } from "../styles"

export interface ActionSheetHeaderProps extends SheetHeaderProps {}

export default function ActionSheetHeader(props: ActionSheetHeaderProps) {
  const { className, ...restProps } = props
  return (
    <Sheet.Header
      className={classNames(prefixClassname("action-sheet__header"), className)}
      {...restProps}
    />
  )
}

import classNames from "classnames"
import * as React from "react"
import Sheet, { SheetHeaderProps } from "../sheet"
import { prefixClassname } from "../styles"

interface ShareSheetHeaderProps extends SheetHeaderProps {}

export default function ShareSheetHeader(props: ShareSheetHeaderProps) {
  const { className, ...restProps } = props
  return (
    <Sheet.Header
      className={classNames(prefixClassname("share-sheet__header"), className)}
      {...restProps}
    />
  )
}

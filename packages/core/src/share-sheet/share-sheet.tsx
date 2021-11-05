import classNames from "classnames"
import * as React from "react"
import Sheet, { SheetProps } from "../sheet"
import { prefixClassname } from "../styles"
import ShareSheetContext from "./share-sheet.context"
import { ShareSheetOptionObject } from "./share-sheet.shared"

export interface ShareSheetProps extends SheetProps {
  onSelect?(event: ShareSheetOptionObject): void
}

function ShareSheet(props: ShareSheetProps) {
  const { className, onSelect, ...restProps } = props
  return (
    <ShareSheetContext.Provider value={{ onSelect }}>
      <Sheet className={classNames(prefixClassname("share-sheet"), className)} {...restProps} />
    </ShareSheetContext.Provider>
  )
}

export default ShareSheet

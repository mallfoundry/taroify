import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { Children, CSSProperties, isValidElement, ReactElement, ReactNode } from "react"
import Backdrop from "../backdrop"
import Popup, { PopupPlacement } from "../popup"
import { prefixClassname } from "../styles"
import { isElementOf } from "../utils/validate"
import SheetHeader from "./sheet-header"
import SheetContext from "./sheet.context"
import { SheetItemObject } from "./sheet.shared"

interface SheetChildren {
  backdrop?: ReactNode
  header?: ReactNode
  content: ReactNode[]
}

function findSheetChildren(node?: ReactNode): SheetChildren {
  const children: SheetChildren = {
    backdrop: undefined,
    header: undefined,
    content: [],
  }

  Children.forEach(node, (child: ReactNode) => {
    if (isValidElement(child)) {
      const element = child as ReactElement
      if (isElementOf(element, Backdrop)) {
        children.backdrop = element
      } else if (isElementOf(element, SheetHeader)) {
        children.header = element
      } else {
        children.content.push(child)
      }
    } else {
      children.content.push(child)
    }
  })

  return children
}

interface SheetContentProps {
  children?: ReactNode
}

function SheetContent(props: SheetContentProps) {
  const { children } = props
  return <View className={prefixClassname("sheet__content")} children={children} />
}

export interface SheetProps {
  className?: string
  style?: CSSProperties
  open?: boolean
  rounded?: boolean
  children?: ReactNode

  onSelect?(item: SheetItemObject): void

  onCancel?(): void

  onClose?(opened: boolean): void
}

function Sheet(props: SheetProps) {
  const { className, style, open, rounded = true, children, onSelect, onCancel, onClose } = props
  const { backdrop, header, content } = findSheetChildren(children)

  return (
    <SheetContext.Provider value={{ onSelect, onCancel }}>
      <Popup
        className={classNames(prefixClassname("sheet"), className)}
        style={style}
        placement={PopupPlacement.Bottom}
        rounded={rounded}
        open={open}
        onClose={onClose}
      >
        {backdrop}
        {header}
        <SheetContent children={content} />
      </Popup>
    </SheetContext.Provider>
  )
}

export default Sheet

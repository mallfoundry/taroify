import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { Children, CSSProperties, isValidElement, ReactElement, ReactNode, useMemo } from "react"
import Backdrop from "../backdrop"
import Popup from "../popup"
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

function useSheetChildren(children?: ReactNode): SheetChildren {
  return useMemo(() => {
    const __children__: SheetChildren = {
      backdrop: undefined,
      header: undefined,
      content: [],
    }

    Children.forEach(children, (child: ReactNode) => {
      if (isValidElement(child)) {
        const element = child as ReactElement
        if (isElementOf(element, Backdrop)) {
          __children__.backdrop = element
        } else if (isElementOf(element, SheetHeader)) {
          __children__.header = element
        } else {
          __children__.content.push(child)
        }
      } else {
        __children__.content.push(child)
      }
    })

    return __children__
  }, [children])
}

interface SheetContentProps {
  children?: ReactNode
}

function SheetContent(props: SheetContentProps) {
  const { children } = props
  return <View className={prefixClassname("sheet__content")} children={children} />
}

export interface SheetProps extends ViewProps {
  style?: CSSProperties
  defaultOpen?: boolean
  open?: boolean
  rounded?: boolean
  children?: ReactNode

  onSelect?(item: SheetItemObject): void

  onCancel?(): void

  onClose?(opened: boolean): void
}

function Sheet(props: SheetProps) {
  const {
    className,
    defaultOpen,
    open,
    rounded = true,
    children,
    onSelect,
    onCancel,
    onClose,
    ...restProps
  } = props

  const { backdrop, header, content } = useSheetChildren(children)

  return (
    <SheetContext.Provider value={{ onSelect, onCancel }}>
      <Popup
        className={classNames(prefixClassname("sheet"), className)}
        placement="bottom"
        rounded={rounded}
        defaultOpen={defaultOpen}
        open={open}
        onClose={onClose}
        {...restProps}
      >
        {backdrop}
        {header}
        <SheetContent children={content} />
      </Popup>
    </SheetContext.Provider>
  )
}

export default Sheet

import { View } from "@tarojs/components"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { Children, CSSProperties, isValidElement, ReactElement, ReactNode, useContext } from "react"
import Loading from "../loading"
import Popup, { PopupPlacement } from "../popup"
import { prefixClassname } from "../styles"
import SheetContext from "./sheet.context"

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
      if (
        element.type === Sheet.Backdrop ||
        (_.isFunction(element.type) && element.type.name === Sheet.Backdrop.name)
      ) {
        children.backdrop = element
      } else if (
        element.type === Sheet.Header ||
        (_.isFunction(element.type) && element.type.name === Sheet.Header.name)
      ) {
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

function SheetGap() {
  return <View className={prefixClassname("sheet__gap")} />
}

export interface SheetProps {
  className?: string
  style?: CSSProperties
  open?: boolean
  rounded?: boolean
  children?: ReactNode
  onSelect?: (item: Sheet.ItemEvent) => void
  onCancel?: () => void
  onClose?: (opened: boolean) => void
}

function Sheet(props: SheetProps) {
  const { className, style, open, rounded = true, children, onCancel, onClose } = props
  const { backdrop, header, content } = findSheetChildren(children)

  return (
    <Popup
      className={classNames(prefixClassname("sheet"), className)}
      style={style}
      placement={PopupPlacement.Bottom}
      rounded={rounded}
      open={open}
      onClose={onClose}
    >
      <SheetContext.Provider value={{ emitCancel: onCancel }}>
        {backdrop}
        {header}
        <SheetContent children={content} />
      </SheetContext.Provider>
    </Popup>
  )
}

namespace Sheet {
  export interface BackdropProps extends Popup.BackdropProps {}

  export function Backdrop(props: BackdropProps) {
    return <Popup.Backdrop {...props} />
  }

  export interface HeaderProps {
    className?: string
    style?: CSSProperties
    title?: ReactNode
    children?: ReactNode
  }

  export function Header(props: HeaderProps) {
    const { className, style, title, children } = props
    return (
      <View className={classNames(prefixClassname("sheet__header"), className)} style={style}>
        {title && <View className={classNames(prefixClassname("sheet__title"))} children={title} />}
        {children && (
          <View className={classNames(prefixClassname("sheet__description"))} children={children} />
        )}
      </View>
    )
  }

  export interface ItemEvent {
    loading?: boolean
    disabled?: boolean
    children?: ReactNode
  }

  export interface ItemProps {
    className?: string
    style?: CSSProperties
    loading?: boolean
    disabled?: boolean
    children?: ReactNode
    onClick?: (event: ItemEvent) => void
  }

  export function Item(props: ItemProps) {
    const { className, style, loading, disabled, children, onClick } = props
    return (
      <View
        className={classNames(
          prefixClassname("sheet__item"),
          {
            [prefixClassname("sheet__item--loading")]: loading,
            [prefixClassname("sheet__item--disabled")]: disabled,
          },
          className,
        )}
        style={style}
        children={loading ? <Loading /> : children}
        onClick={() =>
          onClick?.({
            loading,
            disabled,
            children,
          })
        }
      />
    )
  }

  export enum ButtonType {
    Button = "button",
    Cancel = "cancel",
  }

  type ButtonTypeString = "button" | "cancel"

  export interface ButtonProps extends ItemProps {
    type?: ButtonType | ButtonTypeString
  }

  export function Button(props: ButtonProps) {
    const { className, type, onClick, ...restProps } = props
    const { emitCancel } = useContext(SheetContext)

    function handleClick(event: ItemEvent) {
      onClick?.(event)
      if (type === ButtonType.Cancel) {
        emitCancel?.()
      }
    }

    return (
      <>
        <SheetGap />
        <Sheet.Item
          className={classNames(
            prefixClassname("sheet__button"),
            {
              [prefixClassname("sheet__button--cancel")]: type === ButtonType.Cancel,
            },
            className,
          )}
          onClick={handleClick}
          {...restProps}
        />
      </>
    )
  }
}

export default Sheet

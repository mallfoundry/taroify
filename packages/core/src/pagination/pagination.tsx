import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { Children, CSSProperties, isValidElement, ReactElement, ReactNode, useContext } from "react"
import { prefixClassname } from "../styles"
import { HAIRLINE_BORDER } from "../styles/hairline"
import PaginationContext from "./pagination.context"
import { ItemType, Page as SharedPage } from "./shared"

interface PaginationChildren {
  previous?: ReactNode
  items?: ReactNode
  next?: ReactNode
}

function findPaginationChildren(children: ReactNode): PaginationChildren {
  const __children__: PaginationChildren = {
    previous: undefined,
    items: [],
    next: undefined,
  }

  const items = __children__.items as ReactNode[]

  Children.forEach(children, (child) => {
    // Skip is not Item of Pagination
    if (!isValidElement(child)) {
      return
    }

    const element = child as ReactElement
    const elementType = element.type

    if (elementType === Pagination.Item) {
      const { type: itemType } = element.props
      if (itemType === ItemType.Previous && __children__.previous === undefined) {
        __children__.previous = element
      } else if (itemType === ItemType.Next && __children__.next === undefined) {
        __children__.next = element
      } else if (itemType === ItemType.Page) {
        items.push(element)
      }
    }
  })
  return __children__
}

interface PaginationProps {
  current?: number
  limit?: number
  count?: number
  total?: number
  children?: ReactNode
  onChange?: (page: Pagination.Page) => void
}

function Pagination(props: PaginationProps) {
  const { current = 0, count = 0, limit = 10, total = 0, children, onChange } = props
  const { previous, items, next } = findPaginationChildren(children)

  function emitClick(page: Pagination.Page) {
    if (page.type === ItemType.Page) {
      onChange?.(page)
    } else if (page.type === ItemType.Previous) {
      onChange?.({
        ...page,
        page: Math.max(current - 1, 1),
      })
    } else if (page.type === ItemType.Next) {
      onChange?.({
        ...page,
        page: Math.min(current + 1, count),
      })
    }
  }

  return (
    <View className={classNames(prefixClassname("pagination"))}>
      <PaginationContext.Provider
        value={{
          current,
          limit,
          totalPage: Math.ceil(total / limit),
          total,
          emitClick,
        }}
      >
        {previous}
        {items}
        {next}
      </PaginationContext.Provider>
    </View>
  )
}

namespace Pagination {
  export type Page = SharedPage

  interface BaseItemProps {
    className?: string
    style?: CSSProperties
    hidden?: boolean
    disabled?: boolean
    children?: ReactNode
    onClick?: () => void
  }

  function BaseItem(props: BaseItemProps) {
    const { className, style, hidden, disabled, children, onClick } = props
    return (
      <View
        className={classNames(
          prefixClassname("pagination__item"),
          HAIRLINE_BORDER,
          {
            [prefixClassname("pagination__item--disabled")]: disabled,
            [prefixClassname("pagination__item--hidden")]: hidden,
          },
          className,
        )}
        style={style}
        children={children}
        onClick={onClick}
      />
    )
  }

  type ItemTypeString =
    | "page"
    | "first"
    | "last"
    | "previous"
    | "next"
    | "start-ellipsis"
    | "end-ellipsis"

  interface ItemProps extends BaseItemProps {
    type?: ItemType | ItemTypeString
    page?: number
  }

  export function Item(props: ItemProps) {
    const {
      className,
      page = 0,
      type = ItemType.Page,
      disabled = false,
      children,
      onClick,
      ...restProps
    } = props
    const { current, limit, emitClick } = useContext(PaginationContext)
    const active = page === current

    return (
      <BaseItem
        className={classNames(
          {
            [prefixClassname("pagination__item--active")]: !disabled && active,
            [prefixClassname("pagination__page")]: type === ItemType.Page,
            [prefixClassname("pagination__button")]: type === ItemType.Previous || ItemType.Next,
          },
          className,
        )}
        disabled={disabled && !active}
        children={children ?? page}
        onClick={() => emitClick?.({ page, limit, type: type as ItemType, disabled })}
        {...restProps}
      />
    )
  }

  // export enum ButtonType {
  //   Previous = "previous",
  //   Next = "next",
  // }
  //
  // type ButtonTypeString = "previous" | "next"
  //
  // interface ButtonProps extends BaseItemProps {
  //   type?: ButtonType | ButtonTypeString
  // }
  //
  // export function Button(props: ButtonProps) {
  //   const { className, type, ...restProps } = props
  //   const { current, limit, totalPage, emitClick } = useContext(PaginationContext)
  //
  //   function hasDisabled() {
  //     if (type === ButtonType.Previous) {
  //       return current <= 1
  //     } else if (type === ButtonType.Next) {
  //       return current >= totalPage
  //     }
  //   }
  //
  //   function handleClick() {
  //     if (type === ButtonType.Previous) {
  //       emitClick?.({ page: Math.max(current - 1, 1), limit })
  //     } else if (type === ButtonType.Next) {
  //       emitClick?.({ page: Math.min(current + 1, totalPage), limit })
  //     }
  //   }
  //
  //   return (
  //     <BaseItem
  //       className={classNames(prefixClassname("pagination__button"), className)}
  //       disabled={hasDisabled()}
  //       onClick={handleClick}
  //       {...restProps}
  //     />
  //   )
  // }
}

export default Pagination
